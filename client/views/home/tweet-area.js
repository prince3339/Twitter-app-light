Template.tweetArea.onRendered(function () {
  //initially set character count=0
  Session.set('tweetCharNum', 0);
});


Template.tweetArea.events({  
  //change the character count session when user inputs anything
  'input #tweetContent': function(){
    Session.set('tweetCharNum', $('#tweetContent').val().length);
  },
  
  'click #tweetPostBtn': function(e) {
    //insert tweets into mongo DB
    e.preventDefault();
    var tweet = $('#tweetContent').val()
    //e.target.tweetContent.reset();
    $('#tweetContent').val("");
    Session.set('tweetCharNum', 0);
    
    //check if user logged in or not
    if (Meteor.user()) {
      //Save tweets with username in DB
      Meteor.call('saveTweets', tweet);
    }
  }
});

//display the character count changes
Template.tweetArea.helpers({  
  tweetCharCount: function() {
    return 140 - Session.get('tweetCharNum');
  },

  //add a new class to change the color of character count when it's smaller than 140 character
  tweetCharClass: function() {
  if (Session.get('tweetCharNum') > 140) {
    //return 'error-tweet-char';    //new css class name
    return sAlert.error("Please write within 140 letters.");
  } else {
    return false;
  }
},

  //Disable tweet button when it's value is 0 or larger than 140  character
tweetDisableBtn: function() {
  if (Session.get('tweetCharNum') <= 0 ||
    Session.get('tweetCharNum') > 140) {
    return 'disabled';
  }
}
  
});
