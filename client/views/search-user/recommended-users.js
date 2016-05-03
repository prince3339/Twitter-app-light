Template.recommendedUsers.onCreated(function(){
  var self = this;
  self.autorun(function() {
    if (Meteor.user()) {
      self.subscribe('all_users', Meteor.user().username)
      self.subscribe('followingList', Meteor.user().username);
    }
  });
  
});

Template.recommendedUsers.onRendered(function(){

});

Template.recommendedUsers.events({
  'click #followRecUser': function(event) {
    Meteor.call('followUserMethod', this.username);
  }
});

Template.recommendedUsers.helpers({
  'displayRecommendUsers': function() {
    if (Meteor.user()) {
      var getCurrentFollowings = common.getFollowingsUsers(Meteor.user().username);

      var getRecUsers = Meteor.users.find({
        username: {
          $nin: getCurrentFollowings //query except currentFollowings as well as current user
        }
      }, {
        fields: { 'username': 1 },
        limit: 5
      }).fetch();

      return getRecUsers;
    }
  }
  
});

