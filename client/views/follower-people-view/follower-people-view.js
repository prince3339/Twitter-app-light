Template.followerPeopleList.onCreated( function() {  
  var self = this;
  self.autorun(function(){
    var user_name = FlowRouter.getParam("user_name"); //get user id from url
    
    if(Meteor.user()){
        self.subscribe('followerList', user_name); // subscribe follower list
        self.subscribe('followingList', user_name); // subscribe following list
       // self.subscribe('myTweets', user_name); //get following users' tweets
        self.subscribe('allTweets'); // subscribe all tweets

    }    
  });

});

Template.followerPeopleList.onRendered(function(){

});

Template.followerPeopleList.helpers({  
  'followerList': function() {
    if (Meteor.user()) {
        var user_name = FlowRouter.getParam("user_name"); //get username from url
        return userRelationship.find({ followingList: user_name });
    }
  },
    
  'followerListCount': function() {
    if (Meteor.user()) {
        var user_name = FlowRouter.getParam("user_name"); //get username from url
        return userRelationship.find({ followingList: user_name }).count();
    }
  },

  'getFollowerUserTweet': function(use_rname) {
    //this.subscribe('myTweets', use_rname);
    //get following user's latest tweets [only 1] 
    var followerUserTweet = TweetsCollection.find({
        user: use_rname
    }, { 
        sort: {timestamp: -1}, 
        limit: 1
    });

      return followerUserTweet;
    },
    //get Viewing user's username from url
    'viewingUserName': function() {
        return FlowRouter.getParam("user_name");
    },

    'toggleFollowBtn': function(checkUser) {
      var checkUser = userRelationship.find({
          followingList: checkUser
      });

      if(checkUser){
        return checkUser;  
      }else
        return false;

      console.log(checkUser);
    }
  
});

Template.followerPeopleList.events({
  //get follower user's username to display all of his tweets
  'click #goUserProfile': function() {
    var getUsername = this.followerList;
    if(Meteor.user()){
      Meteor.call("searchUser", getUsername, function(err, res){
        if(res) Session.set('get_userId_for_follower', res);
        console.log(Session.get('get_userId_for_follower')._id);
        FlowRouter.go("/user_profile/"+Session.get('get_userId_for_follower')._id+"");
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
  },
  
  'click #openFollowingModalOpen': function() {
    
    $("#open-following-modal").modal({backdrop: 'static'});
    //Session.set('get_following_user', this.followerList);
    console.log(this.followerList);
    console.log(this._id);
  },

  'click #followUser': function() {
    var followUser = this.followerList
    console.log(this._id);
    console.log(followUser);
    //console.log(Session.get('get_following_user'));

      $.when($.ajax($('#open-following-modal').modal('hide'))).then(function () {
          setTimeout(function(){
            //Meteor.call('followUserMethod', Session.get('get_following_user').username);
            Meteor.call('followUserMethod', followUser);
            console.log("Followed");
      }, 500);
    });
  
  }
  
});

