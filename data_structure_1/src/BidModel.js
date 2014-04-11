function Bid(current_activity){
    this.biddings = [];
}

var bid = new Bid(localStorage.current_activity);

Bid.prototype.create_new_bid = function(current_activity){
    var activities = JSON.parse(localStorage.activities);
    var current_activity = _.find(activities, function(activity){
        return activity['name'] == localStorage.current_activity;
    });
    bid['name'] = "竞价"+(current_activity.bids.length+1);
    current_activity.bids.push(bid);
    localStorage.setItem('activities',JSON.stringify(activities));
}

transform_bids_to_view_model = function(current_activity){
    var activities = JSON.parse(localStorage.activities);
    var current_activity = _.find(activities, function(activity){
        return activity['name'] == current_activity;
    });
    return current_activity.bids;
}