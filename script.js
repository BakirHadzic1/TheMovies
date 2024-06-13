const gallery = document.getElementById("gallery");
const searchInput = document.getElementById("search");

fetch(
  "https://api.themoviedb.org/3/movie/popular?api_key=ac611aa60fbb0355792b075ff8337fbe&language=en-US"
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    displayMovies(data.results);

    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      const filteredMovies = data.results.filter(movie =>
        movie.title.toLowerCase().includes(query)
      );
      displayMovies(filteredMovies);
    });
  });

function displayMovies(movies) {
  gallery.innerHTML = "";
  movies.forEach((movie) => {
    console.log(movie);
    const div = document.createElement("div");
    div.className = "movie_container";

    const img = document.createElement("img");
    img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    img.alt = movie.title;

    const movieTitle = document.createElement("p");
    movieTitle.innerHTML = movie.title;
    movieTitle.className = "title";
    
    const rating = document.createElement("p");
    rating.innerHTML = `Rating: ${movie.vote_average}`;
    rating.className = "rating";

    div.appendChild(img);
    div.appendChild(movieTitle);
    div.appendChild(rating);

    div.addEventListener("click", () => {
      fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=ac611aa60fbb0355792b075ff8337fbe&language=en-US`)
        .then((response) => response.json())
        .then((videoData) => {
          const trailer = videoData.results.find(video => video.type === "Trailer" && video.site === "YouTube");
          if (trailer) {
            const trailerUrl = `https://www.youtube.com/watch?v=${trailer.key}`;
            window.open(trailerUrl, '_blank');
          } else {
            alert("Trailer not found.");
          }
        })
        .catch((error) => {
          console.error("Error fetching video data:", error);
          alert("Error fetching trailer.");
        });
    });

    gallery.appendChild(div);
  });
}



