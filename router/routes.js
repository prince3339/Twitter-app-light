masterLayout = 'masterLayout';

FlowRouter.route('/login', {
    name: 'login',
    action: function(params, queryParams) {
        BlazeLayout.render(masterLayout, {
            main: 'loginPage'
        });
    }
});

FlowRouter.route('/', {
    name: 'signup',
    action: function(params, queryParams) {
        BlazeLayout.render(masterLayout, {
            main: 'signUpPage'
        });
    }
});

FlowRouter.route('/registration_success', {
    name: 'registration_success',
    action: function(params, queryParams) {
        BlazeLayout.render(masterLayout, {
            main: 'registrationSuccess',
        });
    }
});

FlowRouter.route('/search_user', {
    name: 'search_user',
    action: function(params, queryParams) {
        BlazeLayout.render(masterLayout, {
            main: 'searchUser'
        });
    }
});

FlowRouter.route('/home', {
    name: 'home',
    triggersEnter:[
//      function(){
//        Tracker.autorun(function(){
//          if(!Meteor.user()) {
//            //console.log('triger entered');
//            FlowRouter.go('login');
//          }
//        });
//      }
    ],
    action: function(params, queryParams) {
        BlazeLayout.render(masterLayout, {
            main: 'homePage'
        });
    }
});

//dynamic routes
FlowRouter.route('/user_profile/:user_id', {
    name: 'User profile',
    action: function(params, queryParams) {
        BlazeLayout.render(masterLayout, {
            main: 'viewProfilePage'
        });
    }
});

FlowRouter.route('/following_people/:user_name', {
    name: 'followingPeopleList',
    action: function(params, queryParams) {
        BlazeLayout.render(masterLayout, {
            main: 'followingPeopleList'
        });
    }
});

FlowRouter.route('/follower_people/:user_name', {
    name: 'followerPeopleList',
    action: function(params, queryParams) {
        BlazeLayout.render(masterLayout, {
            main: 'followerPeopleList'
        });
    }
});
