const apiKey = '6bb00c5182b602ed6d21b310efbee35c';
const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

// Fetch movie data from the TMDB API
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const movies = data.results;

    // Generate HTML markup for the movie list
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = ''; // Clear the existing content
    movies.forEach(movie => {
      const listItem = document.createElement('li');
      
      // Create an anchor element for the movie poster
      const anchor = document.createElement('a');
      anchor.href = `home-movie-detail.html?id=${movie.id}`; // Link to the movie details page
      anchor.target = '_blank'; // Open the link in a new tab
      listItem.appendChild(anchor);
      
      // Create an image element for the movie poster
      const image = document.createElement('img');
      image.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`; // URL of the movie poster image
      image.alt = movie.title; // Alt text for the image (can be the movie title)
      anchor.appendChild(image);

      movieList.appendChild(listItem);
    });
  })
  .catch(error => {
    console.error('Error fetching movie data:', error);
  });

