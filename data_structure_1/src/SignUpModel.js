function notify_sms_received(sms_json){
    var activities = JSON.parse(localStorage.activities);
    var current_activity = localStorage.current_activity;
    var sign_up = {};
    sign_up['name'] = sms_json.messages[0].message.replace(/\s||\S/g,'').toLocaleLowerCase().replace(/^bm/,'');
    sign_up['phone'] = sms_json.messages[0].phone
    activities = _.map(activities, function(activity){
       activity['name'] == current_activity ? activity['sign_ups'].push(sign_up) : '';
       return activity;
    });
    localStorage.setItem('activities',JSON.stringify(activities));
}