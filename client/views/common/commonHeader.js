Template.navBar.onCreated(function(){
 
});

Template.navBar.onRendered(function(){  

});

Template.navBar.events({
  'click #logout': function (e) {
    e.preventDefault();
    Meteor.logout();
    //FlowRouter.go('/login');
    Tracker.autorun(function(){
      if(!Meteor.user()) {
        //console.log('triger entered');
        FlowRouter.go('login');
      }
    });
    
  }
});

Template.navBar.helpers({
  homeUrl: function () {
    if (Meteor.userId()) {
        return '/home';
    }
    return '/';
  }  
});