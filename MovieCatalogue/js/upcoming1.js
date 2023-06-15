const my1Key = '6bb00c5182b602ed6d21b310efbee35c';
const upcomingUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${my1Key}`;

// Fetch upcoming movie data from the TMDB API
fetch(upcomingUrl)
  .then(response => response.json())
  .then(data => {
    const upcomingMovies = data.results;

    // Generate HTML markup for the upcoming movie list
    const upcomingList = document.getElementById('upcoming-list');
    upcomingList.innerHTML = ''; // Clear the existing content
    upcomingMovies.forEach(movie => {
      const listItem = document.createElement('li');
      
      // Create an anchor element for the movie poster
      const anchor = document.createElement('a');
      anchor.href = `movie-detail.html?id=${movie.id}`; // Link to the movie details page
      anchor.target = '_blank'; // Open the link in a new tab
      listItem.appendChild(anchor);
      
      // Create an image element for the movie poster
      const image = document.createElement('img');
      image.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`; // URL of the movie poster image
      image.alt = movie.title; // Alt text for the image (can be the movie title)
      anchor.appendChild(image);

      upcomingList.appendChild(listItem);
    });
  })
  .catch(error => {
    console.error('Error fetching upcoming movie data:', error);
  });

