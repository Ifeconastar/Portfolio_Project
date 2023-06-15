
var movieId = getMovieId();


function getMovieId() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}


// Select the elements to update
const movieTitle = document.getElementById('movie-title');
const moviePoster = document.getElementById('movie-poster');
const releaseDate = document.getElementById('release-date');
const genres = document.getElementById('genres');
const runtime = document.getElementById('runtime');
const tagline = document.getElementById('tagline');
const overview = document.getElementById('overview');
const status = document.getElementById('status');
const originalLanguage = document.getElementById('original-language');
const budget = document.getElementById('budget');
const revenue = document.getElementById('revenue');
const spokenLanguages = document.getElementById('spoken-languages');
const voteAverage = document.getElementById('vote-average');
const voteCount = document.getElementById('vote-count');
const popularity = document.getElementById('popularity');
const trailer = document.getElementById('trailer');

// Fetch movie details from TMDB API
fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=6bb00c5182b602ed6d21b310efbee35c&language=en-US`)
  .then(response => response.json())
  .then(data => {
    // Update the movie details on the page
    movieTitle.textContent = data.title;
    moviePoster.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
    releaseDate.textContent = `Release Date: ${data.release_date}`;
    genres.textContent = `${data.genres.map(genre => genre.name).join(', ')}`;
    runtime.textContent = `Runtime: ${data.runtime} minutes`;
    tagline.textContent = `${data.tagline}`;
    overview.textContent = `Overview: ${data.overview}`;
    status.textContent = `Status: ${data.status}`;
    originalLanguage.textContent = `Original Language: ${data.original_language}`;
    budget.textContent = `Budget: $${data.budget.toLocaleString()}`;
    revenue.textContent = `Revenue: $${data.revenue.toLocaleString()}`;
    spokenLanguages.textContent = `Spoken Languages: ${data.spoken_languages.map(language => language.name).join(', ')}`;
    voteAverage.textContent = `Vote Average: ${data.vote_average}`;
    voteCount.textContent = `Vote Count: ${data.vote_count}`;
    popularity.textContent = `Popularity: ${data.popularity}`;
   });
 
 fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=6bb00c5182b602ed6d21b310efbee35c&language=en-US`)
  .then(response => response.json())
  .then(data => {
    const videos = data.results;
    
    if (videos.length > 0) {
      const videoKey = videos[0].key;
      const videoContainer = document.getElementById('video-container');
      
      const embedURL = `https://www.youtube.com/embed/${videoKey}`;
      
      videoContainer.innerHTML = `
        <iframe width="100%" height="315" src="${embedURL}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      `;
    }
  })
  .catch(error => {
    console.log('Error:', error);
  });
  
  // JavaScript code to handle movie rating
$('.rating-stars .star').on('click', function() {
  var value = $(this).data('value');

  // Update the selected rating value
  $('.rating-value').text(value);

  // Add 'active' class to highlight the selected rating stars
  $(this).addClass('active');
  $(this).prevAll('.star').addClass('active');
  $(this).nextAll('.star').removeClass('active');
});

function addToWatchlist() {
  $.ajax({
    url: '/add-to-watchlist',
    type: 'POST',
    data: { movieId: movieId },
    success: function(response) {
      // Handle the response from the server
    },
    error: function(xhr, status, error) {
      // Handle any errors that occur during the AJAX request
    }
  });
}

function removeFromWatchlist() {
  $.ajax({
    url: '/remove-from-watchlist',
    type: 'POST',
    data: { movieId: movieId },
    success: function(response) {
      // Handle the response from the server
    },
    error: function(xhr, status, error) {
      // Handle any errors that occur during the AJAX request
    }
  });
}

// Get the review and rating from the form
var review = $('#review-text').val();
var rating = $('.rating-value').text();

// Create the data object to send in the AJAX request
var data = {
  review: review,
  rating: rating,
  movieId: movieId
};

// Send the AJAX request
$.ajax({
  url: '/submit_review',
  type: 'POST',
  data: data,
  success: function(response) {
    // Handle the success response
    
    // You can perform any additional actions after successful submission
  },
  error: function(error) {
    
  }
});


