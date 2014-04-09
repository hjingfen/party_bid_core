function Bid(current_activity){
    this.name = "竞价1";
    this.biddings = [];
}
var bid = new Bid(localStorage.current_activity);
Bid.prototype.create_new_bid = function(current_activity){
    var activities = JSON.parse(localStorage.activities);
    var current_activity = localStorage.current_activity;
    activities = _.map(activities, function(activity){
        activity.name == current_activity ? activity.bids.push(bid) : '';
        return activity;
    });
    localStorage.setItem('activities',JSON.stringify(activities));
}
transform_bids_to_view_model = function(current_activity){
    var activities = JSON.parse(localStorage.activities);
    var current_activity = _.find(activities, function(activity){
        return activity['name'] == current_activity;
    });
    return current_activity.bids;
}