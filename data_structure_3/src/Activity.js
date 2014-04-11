function Activity(activity_name){
    this.name = activity_name;
}
Activity.prototype.create = function(){
    var activities = JSON.parse(localStorage.activities);
    this.id = Activity.act_id();
    localStorage.current_activity = Activity.act_id();
    activities.push(this);
    localStorage.setItem('activities',JSON.stringify(activities));
    localStorage.activity_id_generator = Activity.act_id();
}
Activity.act_id = function(){
    var activities = JSON.parse(localStorage.activities);
    return JSON.stringify(activities.length);
}