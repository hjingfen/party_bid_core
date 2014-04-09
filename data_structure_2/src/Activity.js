function Activity(activity_name){
    this.id = localStorage.activities.length;
    this.name = activity_name;
    this.sign_ups = [];
    this.bids = [];
    this.biddings = {};
}
Activity.prototype.create = function(activity_name){
    var activities = JSON.parse(localStorage.activities);
    var activity_ids = JSON.parse(localStorage.activity_ids);
    activities[activity_ids.length] = this;
//    activity_ids.push()
    localStorage.activities = JSON.stringify(activities);
    localStorage.activity_ids = JSON.stringify(activity_ids);
    localStorage.activity_id_generator = activities.length;
}


//localStorage.activity_id_generator = 2;
//var activities = JSON.parse(localStorage.activities);
//var activity_ids = JSON.parse(localStorage.activity_ids);
//var activity_1 = {
//    id: "0",
//    name: "first activity",
//    sign_ups: [],
//    bids: [],
//    biddings: {}
//
//};
//var activity_2 = {
//    id: "1",
//    name: "second activity",
//    sign_ups: [],
//    bids: [],
//    biddings: {}
//}
//activities["0"] = activity_1;
//activities["1"] = activity_2;
//activity_ids.push("0", "1");
//localStorage.activities = JSON.stringify(activities);
//localStorage.activity_ids = JSON.stringify(activity_ids);