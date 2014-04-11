function Bidding(price,phone){
    this.price = price;
    this.phone =phone;
}
Bidding.process_bidding_sms = function(sms_json){
    var bids = JSON.parse(localStorage.bids);
    var current_activity_id = SignUp.current_activity_id();
    var biddings = [];
    var price = sms_json.messages[0].message.replace(/\s||\S/g,'').toLocaleLowerCase().replace(/^jj/,'');
    var phone = sms_json.messages[0].phone;
    var bidding = new Bidding(price,phone);
    var is_sign_up = Bidding.is_sign_up(current_activity_id,bidding);
    var is_not_bidding = Bidding.is_not_bidding(biddings,bidding);
    if(is_sign_up && is_not_bidding && localStorage.is_bidding == 'true'){
        biddings.push(bidding);
        _.map(bids, function(bid){
            (bid.name == localStorage.current_bid && bid.activity_id == current_activity_id) ? bid.biddings  = biddings : '';
        });
    }
    localStorage.setItem('bids',JSON.stringify(bids));
}
Bidding.is_not_bidding = function(biddings,bidding){
    return _.find(biddings,function(b){return b.phone == bidding.phone}) == undefined ? true:false;
}
Bidding.is_sign_up = function(current_activity_id,bidding){
    var sign_ups = JSON.parse(localStorage.sign_ups);
    var current_sign_ups = _.filter(sign_ups,function(s){return s.activity_id == current_activity_id})
    return _.find(current_sign_ups,function(c){return c.phone == bidding.phone}) != undefined ? true:false;
}
Bidding.render_biddings = function(activity_id,bid_name){
    var sign_ups = JSON.parse(localStorage.sign_ups);
    var current_sign_ups = _.filter(sign_ups,function(s){return s.activity_id == activity_id});
    var bids = JSON.parse(localStorage.bids);
    var current_bid = _.find(bids,function(bid){return bid.activity_id == activity_id && bid.name == bid_name});
    var biddings = current_bid.biddings;
    var min_not_repeat =  _.chain(biddings)
        .sortBy(function(bidding){return bidding.price})
        .groupBy(function(bidding){return bidding.price})
        .find(function(bidding){return bidding.length == 1})
        .value();
    var sign_up_applicant = _.find(current_sign_ups,function(c){return c.phone == min_not_repeat[0].phone});
    min_not_repeat[0]['name'] = sign_up_applicant.name;
    return min_not_repeat;
}