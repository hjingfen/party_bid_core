function Activity(activity_name){
    this.name = activity_name;
    this.sign_ups = [];
    this.bids = [];
}
Activity.prototype.create = function(activity_name){
    var activities = JSON.parse(localStorage.activities);
    activities.push(this);
    localStorage.setItem('activities',JSON.stringify(activities));
}
Activity.prototype.active = function(activity_name){
    localStorage.current_activity = activity_name;
}