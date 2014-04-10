function Bidding (){
}
Bidding.create_new_bid = function (current_activity_id) {
    var activities = JSON.parse(localStorage.activities);
    var activity_id = SignUp.current_activity_id();
    var activity = activities[activity_id];
    var count = activity.bids.length + 1;
    var bid = "竞价" + count;
    activities[activity_id].bids.push(bid) ;
    activities[activity_id].biddings[bid] = [];
    localStorage.setItem("activities", JSON.stringify(activities));
}
