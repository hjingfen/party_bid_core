function Bidding (price,phone){
    this.price = price;
    this.phone = phone;
}
Bidding.create_new_bid = function () {
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
    var activities = JSON.parse(localStorage.activities);
    var current_activity_id = SignUp.current_activity_id();
    var bidddings = [];
    var price = sms_json.messages[0].message.replace(/\s||\S/g,'').toLocaleLowerCase().replace(/^jj/,'');
    var phone = sms_json.messages[0].phone;
    var bidding = new Bidding(price,phone);
    var is_sign_up = Bidding.is_sign_up(current_activity_id,bidding)
    var is_not_bidding = Bidding.is_not_bidding(bidddings);
    var current_bid = localStorage.current_bid;
    if(is_sign_up && is_not_bidding && localStorage.is_bidding == 'true'){
        bidddings.push(bidding);
        activities[current_activity_id].biddings[current_bid] = bidddings;
    }
    localStorage.setItem('activities',JSON.stringify(activities));
}
Bidding.is_not_bidding = function(biddings,bidding){
    return _.find(biddings,function(b){return b.phone == bidding.phone}) == undefined ? true:false;
}
Bidding.is_sign_up = function(current_activity_id,bidding){
    var activities = JSON.parse(localStorage.activities);
    return _.find(activities[current_activity_id].sign_ups,function(a){return a.phone == bidding.phone}) != undefined ? true:false;
}
transform_bids_to_view_model = function(current_activity_id){
    var activities = JSON.parse(localStorage.activities);
    return activities[current_activity_id].bids;
}
transform_biddings_to_view_model = function(current_activity_id,current_bid){
    var activities = JSON.parse(localStorage.activities);
    var biddings = activities[current_activity_id].biddings[current_bid];
    var min_not_repeat =  _.chain(biddings)
        .sortBy(function(bidding){return bidding.price})
        .groupBy(function(bidding){return bidding.price})
        .find(function(bidding){return bidding.length == 1})
        .value();
    var sign_up_applicant = _.find(activities[current_activity_id].sign_ups,function(c){return c.phone == min_not_repeat[0].phone});
    min_not_repeat[0]['name'] = sign_up_applicant.name;
    return min_not_repeat;
}