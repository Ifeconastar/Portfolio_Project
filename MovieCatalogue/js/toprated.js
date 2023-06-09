const myKey = '6bb00c5182b602ed6d21b310efbee35c';
const topRatedUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${myKey}`;

// Fetch top-rated movie data from the TMDB API
fetch(topRatedUrl)
  .then(response => response.json())
  .then(data => {
    const topRatedMovies = data.results;

    // Generate HTML markup for the top-rated movie list
    const topRatedList = document.getElementById('top-rated-list');
    topRatedList.innerHTML = ''; // Clear the existing content
    topRatedMovies.forEach(movie => {
      const listItem = document.createElement('li');
      
      // Create an anchor element for the movie poster
      const anchor = document.createElement('a');
      anchor.href = `/home-movie-detail?id=${movie.id}`; // Link to the movie details page
      anchor.target = '_blank'; // Open the link in a new tab
      listItem.appendChild(anchor);
      
      // Create an image element for the movie poster
      const image = document.createElement('img');
      image.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`; // URL of the movie poster image
      image.alt = movie.title; // Alt text for the image (can be the movie title)
      anchor.appendChild(image);

      topRatedList.appendChild(listItem);
    });
  })
  .catch(error => {
    console.error('Error fetching top-rated movie data:', error);
  });

