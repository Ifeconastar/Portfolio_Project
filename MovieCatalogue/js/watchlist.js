// watchlist.js

// Function to retrieve the user's watchlist from the backend API
function getWatchlist() {
  // Send AJAX request to the backend to fetch the watchlist
  $.ajax({
    url: '/movies/watchlist',
    method: 'GET',
    success: function(response) {
      // Process the watchlist data and update the page content
      displayWatchlist(response);
    },
    error: function(error) {
      // Handle error response
      console.log('Error:', error);
    }
  });
}

// Function to display the watchlist
function displayWatchlist(watchlist) {
  var watchlistSection = $('#watchlist-section');
  watchlistSection.empty(); // Clear previous watchlist items

  // Iterate over the watchlist and create HTML elements for each movie
  watchlist.forEach(function(movie) {
    var movieItem = $('<div class="watchlist-item"></div>');
    var thumbnail = $('<img class="thumbnail" src="' + movie.thumbnail + '">');
    var title = $('<h3 class="title">' + movie.title + '</h3>');
    var removeButton = $('<button class="remove-button">Remove</button>');

    // Add event listener to remove button
    removeButton.click(function() {
      removeMovieFromWatchlist(movie.id);
    });

    // Add movie elements to the watchlist item
    movieItem.append(thumbnail);
    movieItem.append(title);
    movieItem.append(removeButton);

    // Add the watchlist item to the watchlist section
    watchlistSection.append(movieItem);
  });
}

// Function to remove a movie from the watchlist
function removeMovieFromWatchlist(movieId) {
  // Send AJAX request to remove the movie from the watchlist
  $.ajax({
    url: '/movies/' + movieId + '/watchlist',
    method: 'DELETE',
    success: function(response) {
      console.log('Movie removed from watchlist:', response);
      // Reload the watchlist after removing the movie
      getWatchlist();
    },
    error: function(error) {
      // Handle error response
      console.log('Error:', error);
    }
  });
}

// Call the necessary functions when the page is loaded
$(document).ready(function() {
  getWatchlist(); // Retrieve and display the watchlist
});

