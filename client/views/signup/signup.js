Template.signUpPage.onCreated(function(){
  //if user logged in redirect them to home page
    if(Meteor.userId()){
      FlowRouter.go('/home');
    }  
});

Template.signUpPage.onRendered(function(){
   
    //allow only small/capital letters, numbers, space, hyphen, underscore
    document.getElementById('name').addEventListener('input', function (e) {
      e.target.value = e.target.value.replace(/[^a-zA-Z0-9 _-]/g, '');
    });
    
    //allow only small/capital letters, numbers, space, hyphen, underscore
    document.getElementById('username').addEventListener('input', function (e) {
      e.target.value = e.target.value.replace(/[^a-zA-Z0-9 _-]/g, '');
    });
    
    //allow only small/capital letters, numbers
    document.getElementById('password').addEventListener('input', function (e) {
      e.target.value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
    });
    
    //allow only small/capital letters, numbers
    document.getElementById('confirm_password').addEventListener('input', function (e) {
      e.target.value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
    });
});

Template.signUpPage.events({
    'submit #sign_up_form': function(e){
        
        e.preventDefault();
        
        var full_name = $('#name').val();
        var user_name = $('#username').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var confirm_password = $('#confirm_password').val();
        
        var userInfo = {
          username: user_name,
          email: email,
          password: password,
          profile: {
            fullname: full_name
          }
        };
        
        if($('#name').val().length<4){
            sAlert.error("Full name must be atleast 4 characters");    
        }
        else if($('#username').val().length<4){
            sAlert.error("Username must be atleast 4 characters");    
        }
        else if($('#password').val().length<4){
            sAlert.error("Password must be atleast 4 characters");    
        }
        
        else if(password !== confirm_password){
            sAlert.error("Password and confirm password should be same.");    
        }
        
        else{
            Accounts.createUser(userInfo, function (error) {
              if(error){
                  //console.log(error.message);
                  if(error.message == "Username already exists. [403]"){
                    sAlert.error("The username is already taken.");  
                  }
                  
                  else if(error.message == "Email already exists. [403]"){
                    sAlert.error("Email is already used.");  
                  }
                  
                  else{
                      sAlert.error(error);
                  }
              }else{
                  Session.set('user_id', user_name);//set session to track the registration success page

                  function logOut(){
                    Meteor.logout();  
                  }
                  
                  function reDirect(){
                    FlowRouter.go('/registration_success');
                  }                
                  $.when($.ajax(
                    setTimeout(function(){
                        logOut()
                    },1000)
                  )).then(function () {
                      setTimeout(function(){
                         reDirect();
                    }, 1000);
                  });
              }
            });    
        }
    }
});

Template.signUpPage.helpers({
    
});