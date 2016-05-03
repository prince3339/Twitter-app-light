Template.followingPeopleList.onCreated( function() {  
  var self = this;
  self.autorun(function(){
    var user_name = FlowRouter.getParam("user_name"); //get user id from url

    if(Meteor.user()){
        self.subscribe('followingList', user_name); // subscribe following list
       // self.subscribe('myTweets', user_name); //get following users' tweets
        self.subscribe('allTweets'); // subscribe all tweets

      console.log(user_name);
    }    
  });

});

Template.followingPeopleList.onRendered(function(){

});

Template.followingPeopleList.helpers({  
  'followingList': function() {
    if (Meteor.user()) {
        var user_name = FlowRouter.getParam("user_name"); //get username from url
        return userRelationship.find({ followerList: user_name });
    }
  },
    
  'followingListCount': function() {
    if (Meteor.user()) {
        var user_name = FlowRouter.getParam("user_name"); //get username from url
        return userRelationship.find({ followerList: user_name }).count();
    }
  },
  'getFollowingUserTweet': function(use_rname) {
    //this.subscribe('myTweets', use_rname);
    //get following user's latest tweets [only 1] 
    var followingUserTweet = TweetsCollection.find({
        user: use_rname
    }, { 
        sort: {timestamp: -1}, 
        limit: 1
    });
      console.log(followingUserTweet);
      console.log(use_rname);

      return followingUserTweet;
    },
    //get Viewing user's username from url
    'viewingUserName': function() {
        return FlowRouter.getParam("user_name");
    }
  
});

Template.followingPeopleList.events({
  //get following user's username to display all of his tweets
  'click #goUserProfile': function() {
    var getUsername = this.followingList;
    if(Meteor.user()){
      Meteor.call("searchUser", getUsername, function(err, res){
        if(res) Session.set('get_userId_for_following', res);
        console.log(Session.get('get_userId_for_following')._id);
        FlowRouter.go("/user_profile/"+Session.get('get_userId_for_following')._id+"");
      });
    }
  },
  
  'click #cancelFollowingModalOpen': function() {
    
    $("#cancel-following-modal").modal({backdrop: 'static'});
    Session.set('cancel_following_id', this._id);
    console.log(this._id);
  },
  
  'click #cancelFollowing': function() {
    console.log(this._id);
    
    $.when($.ajax($('#cancel-following-modal').modal('hide'))).then(function () {
        setTimeout(function(){
          userRelationship.remove({"_id": Session.get('cancel_following_id')});
          console.log("Unfollowed");
      }, 500);
    });
  }
  
});

