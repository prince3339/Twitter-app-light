Template.profilePage.onCreated( function() {  
    var self = this;
    self.autorun(function(){
      if (Meteor.user()) {
        self.subscribe('followingList', Meteor.user().username);
        self.subscribe('followerList', Meteor.user().username);
        self.subscribe('myTweets', Meteor.user().username);
      }
    });
});

Template.profilePage.onRendered(function(){

});

Template.profilePage.helpers({  
  'tweetsCounter': function() {
    if (Meteor.user()) {
      return TweetsCollection.find({ user: Meteor.user().username }).count();
    }
  },

  'followingList': function() {
    if (Meteor.user()) {
      return userRelationship.find({ followerList: Meteor.user().username }).count();
    }
  },

  'followerList': function() {
    if (Meteor.user()) {
      return userRelationship.find({ followingList: Meteor.user().username }).count();
    }
  },

  'myUserName': function() {
    if (Meteor.user()) {
      return Meteor.user().username;
    }  
  }
});

Template.profilePage.events({
    'click #getFollowings': function() {
        if(Meteor.user()){
            var currentUser = Meteor.user().username;
            FlowRouter.go("/following_people/"+currentUser+"");  
        } 
    },
  
    'click #getFollowers': function() {
        if(Meteor.user()){
            var currentUser = Meteor.user().username;
            FlowRouter.go("/follower_people/"+currentUser+"");  
        } 
    },
    'click #viewMyTweets': function() {
        if(Meteor.user()){
          Meteor.call("searchUser", Meteor.user().username, function(err, res){
            if(res) Session.set('get_userId_to_view_profile', res);
            console.log(Session.get('get_userId_to_view_profile')._id);
            FlowRouter.go("/user_profile/"+Session.get('get_userId_to_view_profile')._id+"");
          });
        }
    }
});

