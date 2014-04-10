function Activity(activity_name){
    this.name = activity_name;
    this.sign_ups = [];
    this.bids = [];
    this.biddings = {};
}
Activity.prototype.create = function(activity_name){
    var activities = JSON.parse(localStorage.activities);
    var activity_ids = JSON.parse(localStorage.activity_ids);
    localStorage.current_activity = Activity.activity_id_generator();
    activities[activity_ids.length] = this;
    activity_ids.push(JSON.stringify(Activity.activity_id_generator()));
    localStorage.activities = JSON.stringify(activities);
    localStorage.activity_ids = JSON.stringify(activity_ids);
    localStorage.activity_id_generator = Activity.activity_id_generator();
}
Activity.activity_id_generator = function(){
    return JSON.parse(localStorage.activity_ids).length;
}