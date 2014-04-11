function SignUp(name,phone,activity_id){
    this.name = name;
    this.phone = phone;
    this.activity_id = activity_id;
}
SignUp.process_sign_up_sms = function(sms_json){
    var activities = JSON.parse(localStorage.activities);
    var activity_id = SignUp.current_activity_id();
    var sign_ups = [];
    var name = sms_json.messages[0].message.replace(/\s||\S/g,'').toLocaleLowerCase().replace(/^bm/,'');
    var phone = sms_json.messages[0].phone;
    var sign_up = new SignUp(name,phone,activity_id);
    var is_not_sign_up = SignUp.is_not_sign_up(sign_ups,sign_up);
    if(is_not_sign_up && localStorage.is_signing_up == 'true'){
        sign_ups.push(sign_up);
    }
    localStorage.setItem('sign_ups',JSON.stringify(sign_ups));
}
SignUp.is_not_sign_up = function(sign_ups,sign_up){
    return _.find(sign_ups,function(s){return s.phone == sign_up.phone}) == undefined ? true:false;
}
SignUp.current_activity_id = function(){
    return localStorage.current_activity;
}
SignUp.render_sign_ups = function(activity_id){
    var sign_ups = JSON.parse(localStorage.sign_ups);
    return _.filter(sign_ups,function(s){return s.activity_id == activity_id})
}