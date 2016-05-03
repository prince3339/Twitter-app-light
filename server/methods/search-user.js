//Meteor methods
Meteor.methods({  
  'searchUser': function(search_user_name) {
      //search user details
    return Meteor.users.findOne({
      username: search_user_name
    }, {
        fields: {
          'username': 1
        }
    });
  },
  
  'searchUserById': function(search_user_id) {
      //search username only by ID
    var userDetails =  Meteor.users.findOne({
      _id: search_user_id
    },{
      fields: {
        'username': 1
      }  
    });  
    return userDetails.username;
  },
});
