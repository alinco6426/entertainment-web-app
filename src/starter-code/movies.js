import { insertMovies, movieContainer, renderMovies } from "./main.js";

const tvSeriesDisplayer = document.getElementById("category-movie-displayer")
insertMovies().then(
     
function () {
      const isMovies = movieContainer.filter(movie => {
           return movie.category.toLowerCase() === "movie";
      })
      renderMovies(isMovies, tvSeriesDisplayer);


      const searchMovieBar = document.getElementById("search-movie-bar");
      const heading = document.querySelector(".heading");

      searchMovieBar.addEventListener("input", function () {
           if (this.value !== "") {
                const inputValue = this.value;
                const searchedMovies = isMovies.filter(movie => {
                     return movie.title.toLowerCase().includes(inputValue.toLowerCase()) || movie.year.toString().includes(inputValue);
                })
                renderMovies(searchedMovies, tvSeriesDisplayer)
                heading.textContent = `Found ${searchedMovies.length} results for ‘${inputValue}’`;
           } else {
                heading.textContent = "Movies";
                renderMovies(isMovies, tvSeriesDisplayer);
           }
    });
});