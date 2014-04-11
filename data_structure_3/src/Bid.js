function Bid(){
    this.biddings = [];
}
Bid.create_new_bid = function(activity_id){
    var bids = JSON.parse(localStorage.bids);
    var bid = new Bid;
    bid['activity_id'] = activity_id;
    bid['name'] = "竞价"+(bids.length+1);
    bids.push(bid);
    localStorage.setItem('bids',JSON.stringify(bids));
}
Bid.render_bids = function(activity_id){
    var bids = JSON.parse(localStorage.bids);
    return _.filter(bids,function(bid){return bid.activity_id == activity_id});
}