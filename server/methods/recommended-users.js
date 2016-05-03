//Get recommended users except current user's following list
//Meteor.methods({  
//  'displayRecommendUsers': function() {
//    if (Meteor.user()) {
//      var getCurrentFollowings = common.getFollowingsUsers(Meteor.user().username);
//
//      var getRecUsers = Meteor.users.find({
//        username: {
//          $nin: getCurrentFollowings //query except currentFollowings as well as current user
//        }
//      }, {
//        fields: { 'username': 1 },
//        limit: 5
//      }).fetch();
//
//      return getRecUsers;
//    }
//  }
//});