$(document).ready(function() {
  $('form').submit(function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the form input values
    var username = $('#username').val();
    var email = $('#email').val();
    var password = $('#password').val();
    var confirm-password = $('#confirm-password').val();

    // Create an object with the data
    var data = {
      username: username,
      email: email,
      password: password,
      confirm-password: confirm-password
    };

    // Send the Ajax request
    $.ajax({
      url: '/register',
      method: 'POST',
      data: data,
      success: function(response) {
        // Handle the successful response
      },
      error: function(xhr, status, error) {
        // Handle the error response
      }
    });
  });
});

