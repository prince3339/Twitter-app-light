//publish all users for client
Meteor.publish('all_users', function() {
  return Meteor.users.find({}, {
    fields: { 'username': 1 }
  });
});

Meteor.publishComposite('followingUserTweets', function(currentUsername) {  
  return {
    find: function() {
      // Find the current user's following users
      return userRelationship.find({ followerList: currentUsername });
    },
    children: [{
      //get parameter value from top find function
      find: function(user_relationship) {
        // Find tweets from followed users
        return TweetsCollection.find({user: user_relationship.followingList});
      }
    }]
  }
});


Meteor.publish('myTweets', function(currentUsername) {  
  return TweetsCollection.find({user: currentUsername});
});

Meteor.publish('allTweets', function() {
  return TweetsCollection.find();
});


//current user's following usernames
Meteor.publish('followingList', function(currentUsername) {  
  return userRelationship.find({ followerList: currentUsername });
});

//current user's follower usernames
Meteor.publish('followerList', function(currentUsername) {  
  return userRelationship.find({ followingList: currentUsername });
});

//All info of userRelationship collection
Meteor.publish('allFollowerFollowingInfo', function(currentUsername) {  
  return userRelationship.find();
});

