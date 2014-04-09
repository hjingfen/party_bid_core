function Bidding(){
}
Bidding.process_bidding_sms = function(sms_json){
    if(localStorage.is_bidding == 'true'){
        var activities = JSON.parse(localStorage.activities);
        var current_bid = localStorage.current_bid;
        var current_activity = _.filter(activities, function(activity){
             return activity['name'] == localStorage.current_activity;
        });
        var biddings = [];
        var bidding = {};
        bidding['price'] = sms_json.messages[0].message.replace(/\s||\S/g,'').toLocaleLowerCase().replace(/^jj/,'');
        bidding['phone'] = sms_json.messages[0].phone;
        if(_.find(current_activity[0]['sign_ups'],function(c){return c.phone == bidding.phone}) != undefined){
            var sign_up_applicant = _.find(current_activity[0]['sign_ups'],function(c){return c.phone == bidding.phone});
            bidding['name'] = sign_up_applicant.name;
            if(_.find(biddings,function(bidding){return bidding.phone == bidding.phone}) == undefined){
                biddings.push(bidding);
            }
            current_activity = _.map(current_activity[0].bids, function(c){
                return  c.name == current_bid ? c.biddings = biddings : '';

            });
            localStorage.setItem('activities',JSON.stringify(activities));
        }
    }
}
transform_biddings_to_view_model = function(current_activity,current_bid){
    var activities = JSON.parse(localStorage.activities);
    var current_activity = _.filter(activities, function(activity){
        return activity['name'] == current_activity;
    });
    var biddings = _.filter(current_activity[0].bids, function(c){
        return c.name == current_bid;
    });
    var sort_by_biddings = _.sortBy(biddings[0].biddings,function(bidding){return (bidding.price)});
    var group_price = _.groupBy(sort_by_biddings,function(s){return s.price});
    var un_repeat = _.filter(group_price,function(g){return g.length == 1})
    return _.first(un_repeat);
}