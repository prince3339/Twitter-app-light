common = function() {};    //global variable

//This function is to find current users following list 
common.getFollowingsUsers = function(username) {  
  var getCurrentFollowings = userRelationship.find({
    followerList: username
  }).fetch().map(function(data) {
    return data.followingList;
  });
  getCurrentFollowings.push(Meteor.user().username); //except current user from the list

  return getCurrentFollowings;
};