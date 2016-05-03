Template.displayTweets.onCreated(function() {  
  var self = this;
  
  self.autorun(function(){
    if(Meteor.user()){
      //var currentUser = Meteor.user().username;
      //console.log(currentUser);
      self.subscribe('followingUserTweets', Meteor.user().username); //get following users' tweets
      self.subscribe('myTweets', Meteor.user().username); //get current users' tweets
      //self.subscribe('all_users'); //get all users
    }    
  }); 
});

Template.displayTweets.onRendered(function() {  
  
});

Template.displayTweets.events({
  'click #deleteTweetsModal': function() {
    $('#delete-tweet-modal').modal({backdrop: 'static'});  
  },
  
  'click #deleteOwnTweet': function() {
    
    var getTweetId = this._id;
    $.when($.ajax($('#delete-tweet-modal').modal('hide'))).then(function () {
        setTimeout(function(){
           TweetsCollection.remove({"_id": getTweetId});
      }, 500);
    });
  },
  
  'click #goUserProfile': function() {
    var user_Id = this.postedUserId;
    console.log(user_Id);
    FlowRouter.go("/user_profile/"+user_Id+"");
  }
  
});

Template.displayTweets.helpers({  
  'showTweets': function() {
    return TweetsCollection.find({}, { 
        sort: {timestamp: -1}, 
        limit: 10
    });
  },
  
  'deleteTweetBtn': function(username) {    
    if(Meteor.user()){
      if(username == Meteor.user().username){
        return true;
      }else
        return false;
      }
  }
  
});