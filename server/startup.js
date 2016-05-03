import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  //userRelationship._ensureIndex({follower: 1, following: 1}, {unique: 1});
  userRelationship._ensureIndex({followerList: 1, followingList: 1}, {unique: 1});
});
