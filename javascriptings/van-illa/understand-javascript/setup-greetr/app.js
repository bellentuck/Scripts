// gets a new object (the architecture allows us not to have to use the 'new' keyword here)
var g = G$('Sadie', 'Dean');

// use our chainable methods
g.greet().greet('formal').setLang('es').greet(true).greet().log();

// also totally possible to use the 'new' keyword
var h = new Greetr('Ben', 'E');
console.log(h);

// let's use our object on the click of the login button
//var login = document.getElementById('login');
//login.addEventListener('click', function(){}, false);
$('#login').click(function() {
  // create a new 'Greetr' obj (let's pretend we know the name from the login)
  var loginGrtr = G$('John', 'Doe');

  // hide the login UI on the screen
  $('#logindiv').hide();

  // fire off an HTML greeting, passing the '#greeting' as the selector and the chosen language, and log the welcome as well
  loginGrtr.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();
  
});
