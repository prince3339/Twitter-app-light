Template.homePage.onCreated(function(){
  //if user not logged in redirect them to registration page
    if(!Meteor.userId()){
      FlowRouter.go('/');
      //console.log(Meteor.userId());
    }  
});

Template.homePage.onRendered(function(){  

});

Template.homePage.events({

});

Template.homePage.helpers({
    
});