function notify_sms_received(sms_json){
    var first_two_characters = sms_json.messages[0].message.substr(0,2);
    var judge_sms = {
        BM: function () {
            SignUp.process_sign_up_sms(sms_json);
        },
        JJ:function(){
            Bidding.process_bid_sign_up_sms(sms_json);
        }
    }
    if (judge_sms[first_two_characters]) {
        judge_sms[first_two_characters]();
    }
}
