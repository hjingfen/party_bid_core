function Bid(){
    this.biddings = [];
}

Bid.prototype.create_new_bid = function(current_activity){
    var activities = JSON.parse(localStorage.activities);
    var current_act = Bid.current_activity(activities,current_activity);
    this['name'] = "竞价"+(current_act.bids.length+1);
    current_act.bids.push(this);
    localStorage.setItem('activities',JSON.stringify(activities));
}

Bid.current_activity = function(activities,current_activity){
    return _.find(activities, function(activity){
        return activity['name'] == current_activity;
    });
}

transform_bids_to_view_model = function(current_activity){
    var activities = JSON.parse(localStorage.activities);
    return Bid.current_activity(activities,current_activity).bids;
}