Template.registrationSuccess.onCreated(function(){
    if(!Session.get('user_id')){
        FlowRouter.go('/');
    }
});

Template.registrationSuccess.onRendered(function(){
    //console.log(Session.get('username'));
});

Template.registrationSuccess.events({
    'click #loginBtn': function(){
        FlowRouter.go('/login');
        Session.set('user_id', undefined);
    }
});

Template.registrationSuccess.helpers({
    newUser: function(){
        return Session.get('user_id');
    }
});