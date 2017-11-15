$(document).ready(function() {
  
})

var cancelled = false;
$('#submit').click(function(){
   if($('#username').val() != 'user1'){
     alert('username is user1');
      cancelled = true;
   }
   else if($('#password').val() != 'password'){
      alert('password is password');
      cancelled = true;
   }
   
});

$('#submit').click(function(){

    if(cancelled == true){
        window.location.href="login.html";
    }
    else{
        window.location.href="index.html";
    }


});
