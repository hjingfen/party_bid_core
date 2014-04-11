function Bid(){
    this.biddings = [];
}
Bid.create_new_bid = function(activity_id){
    var bids = JSON.parse(localStorage.bids);
    this.activity_id = activity_id;
    this.name = "竞价"+ (bids.length+1);
    var bid = new Bid;
    bids.push(bid);
    localStorage.setItem('bids',JSON.stringify(bids));
}