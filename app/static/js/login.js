$(document).ready(function() {
  $('form').submit(function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the username and password values from the input fields
    var username = $('#username').val();
    var password = $('#password').val();

    // Create an object with the data
    var data = {
      username: username,
      password: password
    };

    // Send the Ajax request
    $.ajax({
      url: '/login',
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

