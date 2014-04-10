function Bidding(price,phone){
    this.price = price;
    this.phone = phone;
}
Bidding.process_bidding_sms = function(sms_json){
    if(localStorage.is_bidding == 'true'){
        var activities = JSON.parse(localStorage.activities);
        var current_activity = _.find(activities, function(activity){
            return activity['name'] == localStorage.current_activity;
        });
        var biddings = [];
        var price = sms_json.messages[0].message.replace(/\s||\S/g,'').toLocaleLowerCase().replace(/^jj/,'');
        var phone = sms_json.messages[0].phone;
        var bidding = new Bidding(price,phone);
        var is_sign_up = Bidding.is_sign_up(current_activity,bidding);
        var is_not_bidding = Bidding.is_not_bidding(biddings);
        if(is_sign_up){
            var sign_up_applicant = _.find(current_activity['sign_ups'],function(c){return c.phone == bidding.phone});
            bidding['name'] = sign_up_applicant.name;
            if(is_not_bidding){
                biddings.push(bidding);
            }
            current_activity = _.map(current_activity.bids, function(c){
                return  c.name == localStorage.current_bid ? c.biddings = biddings : '';

            });
            localStorage.setItem('activities',JSON.stringify(activities));
        }
    }
}
Bidding.is_sign_up = function(current_activity,bidding){
    return _.find(current_activity['sign_ups'],function(c){return c.phone == bidding.phone}) != undefined ? true:false;
}
Bidding.is_not_bidding = function(biddings){
    return _.find(biddings,function(bidding){return bidding.phone == bidding.phone}) == undefined ? true:false;
}
transform_biddings_to_view_model = function(current_activity,current_bid){
    var activities = JSON.parse(localStorage.activities);
    var current_act = _.find(activities, function(activity){
        return activity['name'] == current_activity;
    });
    var biddings_info = _.find(current_act.bids, function(c){
        return c.name == current_bid;
    });
    var biddings = biddings_info.biddings;
    return _.chain(biddings)
        .sortBy(function(bidding){return bidding.price})
        .groupBy(function(bidding){return bidding.price})
        .filter(function(bidding){return bidding.length == 1})
        .first()
        .value();
}

