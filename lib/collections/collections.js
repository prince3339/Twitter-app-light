TweetsCollection = new Mongo.Collection('tweetsCollection');
userRelationship = new Mongo.Collection('userRelationship');

//user permission for TweetsCollection collection
TweetsCollection.allow({
    insert: function(userID, doc){
        //if user logged in
        if(Meteor.user()){
            if(doc.postedUserId != userID){
                //console.log(doc.postedUserId);
                return false;
            }else
                return true;    
        }else
            return false;
    },
    
    remove: function(userID, doc){
        //if user logged in
        if(Meteor.user()){
            if(doc.postedUserId != userID){
                //console.log(doc.postedUserId);
                return false;
            }else
                return true;    
        }else
            return false;
    },
    
    update: function(userID, doc){
        //if user logged in
        if(Meteor.user()){
            if(doc.postedUserId != userID){
                //console.log(doc.postedUserId);
                return false;
            }else
                return true;    
        }else
            return false;
    }
});

//user permission for userRelationship collection
userRelationship.allow({
    remove: function(userID, doc){
        //if user logged in
        if(Meteor.user()){
            return true;
        }else
            return false;
    },
    
    update: function(userID, doc){
        //if user logged in
        if(Meteor.user()){
            return true;
        }else
            return false;
    }
});