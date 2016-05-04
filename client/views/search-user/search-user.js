Template.searchUser.onCreated(function(){
    var self = this;
    self.autorun(function(){
        
        if(!Meteor.userId()){
            //if user not logged in redirect them to registration page
            FlowRouter.go('/');
            //console.log(Meteor.userId());
        }
        
        if(Meteor.user()){
            self.subscribe('allTweets'); // subscribe all tweets
            self.subscribe('followingList', Meteor.user().username); // subscribe following list
            self.subscribe('all_users'); //subscribe all_users to get all users from db in client side
        }
    });
    
    
});

Template.searchUser.onRendered(function(){
    
});

Template.searchUser.events({
  'submit #search-form': function(event) {
    var search_user_name = event.target.search_user_name.value;
    
    Session.set('search_result', search_user_name);
    console.log(search_user_name);
    return false;;
  },
  
//    'click #followUser': function(event) {
//        var followUserName = document.getElementById("getUserName").innerHTML;
//        if(followUserName == Meteor.user().username){
//          sAlert.error("You can't follow yourself.");
//        }else{
//          Meteor.call('followUserMethod', Session.get('search_result').username); 
//        }
//    },
 
    'click #cancelFollowingModalOpen': function() {
    
        $("#cancel-following-modal").modal({backdrop: 'static'});
        //console.log(this._id);
    },
  
    'click #cancelFollowing': function() {
        var cancel_following_id = this._id;
    
        $.when($.ajax($('#cancel-following-modal').modal('hide'))).then(function () {
            setTimeout(function(){
              userRelationship.remove({"_id": cancel_following_id});
              console.log("Unfollowed");
          }, 500);
        });
    },
  
    'click #openFollowingModalOpen': function() {
    
        $("#open-following-modal").modal({backdrop: 'static'});
        //console.log(this.username);
    },

   'click #followUser': function() {
        var followUserName = this.username
        console.log(this._id);
        console.log(followUserName);
        //console.log(followUser);
        //console.log(Session.get('get_following_user'));

        $.when($.ajax($('#open-following-modal').modal('hide'))).then(function () {
            setTimeout(function(){
              //Meteor.call('followUserMethod', Session.get('get_following_user').username);
                if(followUserName == Meteor.user().username){
                  sAlert.error("You can't follow yourself.");
                }else{
                  Meteor.call('followUserMethod', followUserName);
                }   
            console.log("Followed");
            //console.log(this.username)
        }, 500);
      });
   },
    
    'click #goUserProfile': function() {
        var getUsername = this.username;
        console.log(getUsername);
            if(Meteor.user()){
                Meteor.call("searchUser", getUsername, function(err, res){
                if(res) Session.set('get_userId_for_follower', res);
                console.log(Session.get('get_userId_for_follower')._id);
                FlowRouter.go("/user_profile/"+Session.get('get_userId_for_follower')._id+"");
            });
        }
    }
  
});


Template.searchUser.helpers({
    'userFound': function() {
        var search_user_name = Session.get('search_result');
        if(search_user_name){
            return Meteor.users.find({username: { $regex: ".*"+search_user_name+".*"}}).fetch();
            Session.set('search_result',undefined);    
        }else
            return false;
        //console.log(search_user_name);
    },
    
    'getSearchedUserTweet': function(search_user_name) {
        var searchedUserTweet = TweetsCollection.find({
            user: search_user_name
        }, { 
            sort: {timestamp: -1}, 
            limit: 1
        });
        return searchedUserTweet;
    },
    
    'toggleFollowBtn': function(checkUser) {

       var checkUser = userRelationship.find({
           limit: 1
       }).fetch().filter(function(val){
            return val.followingList == checkUser;
        });
      if(checkUser){
        return checkUser;  
      }else
        return false;

      console.log(checkUser);
    }
});

