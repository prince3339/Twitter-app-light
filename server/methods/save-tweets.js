Meteor.methods({
  saveTweets: function(tweet) {
    if (Meteor.user()) {
      TweetsCollection.insert({
        message: tweet,
        user: Meteor.user().username,
        postedUserId: Meteor.user()._id,
        timestamp: new Date()
      });
    }
  }
});
