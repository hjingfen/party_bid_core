function Bid(first_activity){
    this.name = "竞价1";
    this.biddings = [];
}
var bid = new Bid("first activity");
Bid.prototype.create_new_bid = function(first_activity){
    var activities = JSON.parse(localStorage.activities);
    var current_activity = localStorage.current_activity;
    activities = _.map(activities, function(activity){
        activity.name == current_activity ? activity.bids.push(bid) : '';
        return activity;
    });
    localStorage.setItem('activities',JSON.stringify(activities));
}
