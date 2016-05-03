Template.viewProfilePage.onCreated( function() {  
  var self = this;
  self.autorun(function(){
    var user_id = FlowRouter.getParam("user_id"); //get user id from url
    //call method to get username from userid
    var search_result = Meteor.call('searchUserById', user_id, function(err, res) {
      if (res) Session.set('getUserName', res);
    });
    
    if(Meteor.user()){
      self.subscribe('myTweets', Session.get('getUserName')); // subscribe to user's tweets only
      console.log(user_id);
      console.log(Session.get('getUserName'));
    }    
  });
});

Template.viewProfilePage.onRendered(function(){

});

Template.viewProfilePage.helpers({  
  'viewUsersTweets': function() {
    var tweets = TweetsCollection.find({}, { 
        sort: {timestamp: -1}, 
        limit: 10
    });
    if(tweets){
      return tweets;
    }else
      return false;
  }
  
});

Template.viewProfilePage.events({

});

