// search.js

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');

searchButton.addEventListener('click', performSearch);

function performSearch() {
  const query = searchInput.value.trim();
  if (query !== '') {
    // Clear previous search results
    searchResults.innerHTML = '';

    // Make API request to search movies
    const apiKey = '6bb00c5182b602ed6d21b310efbee35c';
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        displaySearchResults(data.results);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
}

function displaySearchResults(results) {
  results.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    const movieTitle = document.createElement('h3');
    movieTitle.textContent = movie.title;

    const movieOverview = document.createElement('p');
    movieOverview.textContent = movie.overview;

    const movieImage = document.createElement('img');
    movieImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    movieImage.alt = movie.title;

    const movieLink = document.createElement('a');
    movieLink.href = `movie-detail.html?id=${movie.id}`; // Replace with the appropriate movie details page URL
    movieLink.appendChild(movieImage);
    movieLink.appendChild(movieTitle);

    movieCard.appendChild(movieLink);
    movieCard.appendChild(movieOverview);

    searchResults.appendChild(movieCard);
  });
}


