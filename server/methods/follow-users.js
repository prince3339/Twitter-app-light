//Meteor methods
Meteor.methods({  
  'followUserMethod': function(follow_User_Name) {
    userRelationship.insert({
      followerList: Meteor.user().username,
      followingList: follow_User_Name
    });
  }
    
});

