function Bidding (price,phone){
    this.price = price;
    this.phone = phone;
}
Bidding.create_new_bid = function (count) {
    var activities = JSON.parse(localStorage.activities);
    var activity_id = SignUp.current_activity_id();
    var activity = activities[activity_id];
    var count = activity.bids.length + 1;
    var bid = '竞价'+count;
    activities[activity_id].bids.push(bid) ;
    activities[activity_id].biddings[bid] = [];
    localStorage.setItem("activities", JSON.stringify(activities));
}
Bidding.process_bidding_sms = function(sms_json){
    if(localStorage.is_bidding == 'true'){
        var activities = JSON.parse(localStorage.activities);
        var current_activity_id = SignUp.current_activity_id();
        var bidddings = [];
        var price = sms_json.messages[0].message.replace(/\s||\S/g,'').toLocaleLowerCase().replace(/^jj/,'');
        var phone = sms_json.messages[0].phone;
        var bidding = new Bidding(price,phone);
        var is_sign_up = Bidding.is_sign_up(current_activity_id,bidding)
        var is_not_bidding = Bidding.is_not_bidding(bidddings);
        var current_bid = localStorage.current_bid;
        if(is_sign_up){
            var sign_up_applicant = _.find(activities[current_activity_id].sign_ups,function(c){return c.phone == bidding.phone});
            bidding['name'] = sign_up_applicant.name;
            if(is_not_bidding){
                bidddings.push(bidding);
            }
            activities[current_activity_id].biddings[current_bid] = bidddings;
        }
        localStorage.setItem('activities',JSON.stringify(activities));
    }
}
Bidding.is_not_bidding = function(biddings,bidding){
    return _.find(biddings,function(b){return b.phone == bidding.phone}) == undefined ? true:false;
}
Bidding.is_sign_up = function(current_activity_id,bidding){
    var activities = JSON.parse(localStorage.activities);
    return _.find(activities[current_activity_id].sign_ups,function(a){return a.phone == bidding.phone}) != undefined ? true:false;
}
