function SignUp(name,phone){
    this.name = name;
    this.phone = phone;
}
SignUp.process_sign_up_sms = function(sms_json){
    if(localStorage.is_signing_up == 'true'){
        var activities = JSON.parse(localStorage.activities);
        var current_activity_id = SignUp.current_activity_id();
        var sign_ups = [];
        var name = sms_json.messages[0].message.replace(/\s||\S/g,'').toLocaleLowerCase().replace(/^bm/,'');
        var phone = sms_json.messages[0].phone;
        var sign_up = new SignUp(name,phone);
        var is_not_sign_up = SignUp.is_not_sign_up(sign_ups);
        if(is_not_sign_up){
            sign_ups.push(sign_up);
        }
        activities[current_activity_id].sign_ups = sign_ups;
        localStorage.setItem('activities',JSON.stringify(activities));
    }
}
SignUp.is_not_sign_up = function(sign_ups,sign_up){
    return _.find(sign_ups,function(s){return s.phone == sign_up.phone}) == undefined ? true:false;
}
SignUp.current_activity_id = function(){
    return localStorage.current_activity;
}