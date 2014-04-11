function SignUp(name,phone){
    this.name = name;
    this.phone = phone;
}

SignUp.process_sign_up_sms = function(sms_json){
    var activities = JSON.parse(localStorage.activities);
    var current_activity = localStorage.current_activity;
    var sign_ups = [];
    var name = sms_json.messages[0].message.replace(/\s||\S/g,'').toLocaleLowerCase().replace(/^bm/,'');
    var phone = sms_json.messages[0].phone;
    var sign_up = new SignUp(name,phone);
    var is_not_sign_up = SignUp.is_not_sign_up(sign_ups);
    if(is_not_sign_up && localStorage.is_signing_up == 'true'){
        sign_ups.push(sign_up);
    }
    activities = _.map(activities, function(activity){
        activity['sign_ups'] = activity['name'] == current_activity ? sign_ups : '';
        return activity;
    });
    localStorage.setItem('activities',JSON.stringify(activities));
}

SignUp.is_not_sign_up = function(sign_ups,sign_up){
    return _.find(sign_ups,function(s){return s.phone == sign_up.phone}) == undefined;
}

SignUp.render_sign_ups = function(current_activity){
    var activities = JSON.parse(localStorage.activities);
    var current_activity = _.find(activities, function(activity){
        return activity['name'] == current_activity;
    });
    return _.filter(current_activity.sign_ups,function(c){return c.name})
}
