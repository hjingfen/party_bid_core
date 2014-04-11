function Bidding(price,phone){
    this.price = price;
    this.phone = phone;
}

Bidding.process_bidding_sms = function(sms_json){
    var activities = JSON.parse(localStorage.activities);
    var current_activity = Bidding.current_act(activities);
    var biddings = [];
    var bidding = Bidding.sms(sms_json);
    var Is_bidding = Bidding.is_bidding(biddings,bidding) && Bidding.is_sign_up(current_activity,bidding);
    if(Is_bidding){
        var sign_up_applicant = _.find(current_activity['sign_ups'],function(c){return c.phone == bidding.phone});
        bidding['name'] = sign_up_applicant.name;
        biddings.push(bidding);
        current_activity = _.map(current_activity.bids, function(c){
            return  c.biddings = c.name == localStorage.current_bid ? biddings : '';
        });
        localStorage.setItem('activities',JSON.stringify(activities));
    }
}

Bidding.current_act = function(activities){
    return _.find(activities, function(activity){
        return activity['name'] == localStorage.current_activity;
    });
}

Bidding.sms = function(sms_json){
    var price = sms_json.messages[0].message.replace(/\s||\S/g,'').toLocaleLowerCase().replace(/^jj/,'');
    var phone = sms_json.messages[0].phone;
    var bidding = new Bidding(price,phone);
    return bidding;
}

Bidding.is_sign_up = function(current_activity,bidding){
    return _.find(current_activity['sign_ups'],function(c){return c.phone == bidding.phone}) != undefined;
}

Bidding.is_bidding = function(biddings,bidding){
    return _.find(biddings,function(b){return b.phone == bidding.phone}) == undefined && localStorage.is_bidding == 'true';
}

transform_biddings_to_view_model = function(current_activity,current_bid){
    var biddings = Bidding.biddings(current_activity,current_bid).biddings;
    return _.chain(biddings)
        .sortBy(function(bidding){return bidding.price})
        .groupBy(function(bidding){return bidding.price})
        .filter(function(bidding){return bidding.length == 1})
        .first()
        .value();
}

Bidding.biddings = function(current_activity,current_bid){
    var activities = JSON.parse(localStorage.activities);
    var current_activity = SignUp.current_act(current_activity,activities)
    return _.find(current_activity.bids, function(c){
        return c.name == current_bid;
    });
}
