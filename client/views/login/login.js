Template.loginPage.onCreated(function(){
  //if user logged in redirect them to home page
    if(Meteor.userId()){
      FlowRouter.go('/home');
      //console.log(Meteor.userId());
    }  
});

Template.loginPage.onRendered(function(){  
  //allow only small/capital letters, numbers, space, hyphen, underscore
  document.getElementById('username').addEventListener('input', function (e) {
    e.target.value = e.target.value.replace(/[^a-zA-Z0-9 _-]/g, '');
  });

  //allow only small/capital letters, numbers
  document.getElementById('password').addEventListener('input', function (e) {
    e.target.value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
  });
});

Template.loginPage.events({
    'submit #login-form': function(e){
        e.preventDefault();
        
        var username = $('#username').val();
        var password = $('#password').val();
        
        if(!$('#username').val()){
            sAlert.error("Please enter your username");    
        }
        else if(!$('#password').val()){
            sAlert.error("Please enter your password");     
        }
        
        else if($('#username').val() <4 ){
            sAlert.error("Please enter minimum 4 letters");     
        }
        
        else if($('#password').val() <4 ){
            sAlert.error("Please enter minimum 4 letters");    
        }
        
        else{
            Meteor.loginWithPassword(username, password, function(error) {
                if(error) {
                    //console.log(error);
                    //sAlert.error(error);
                    
                    if(error.message == "User not found [403]" || error.message == "Incorrect password [403]"){
                        sAlert.error("The username or the password is incorrect");  
                    }
                    
                }else{
                    FlowRouter.go('/home');
                }

            });
        }
    }
});

Template.loginPage.helpers({
    
});