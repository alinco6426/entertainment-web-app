import { insertMovies, movieContainer, renderMovies } from "./main.js";

const bookmarkedMovieDisplayer = document.querySelector(".bookMarkedMovieDisplayer");
const bookMarkedTvSeriesDisplayer = document.querySelector(".bookMarkedTvSeriesDisplayer");

insertMovies().then(
function () {
     const bookmarkedMovie = movieContainer.filter(movie => {
          return movie.category.toLowerCase() === "movie" && movie.isBookmarked === true;
     })
     renderMovies(bookmarkedMovie, bookmarkedMovieDisplayer);

     const bookmarkedTvSeries = movieContainer.filter(movie => {
          return movie.category.toLowerCase() === "tv series" && movie.isBookmarked === true;
     });
     renderMovies(bookmarkedTvSeries, bookMarkedTvSeriesDisplayer);

     const searchMovieBar = document.getElementById("search-movie-bar");
     const bookMarkMovieHeading = document.querySelector(".bookMarkMovieHeading");
     const bookMarkTvSeries = document.querySelector(".bookMarkTvSeries");

     searchMovieBar.addEventListener("input", function () {
           if (this.value !== "") {
               const inputValue = this.value.toLowerCase();
               const searchedBookmarkedMovies = bookmarkedMovie.filter(movie => {
                    return (movie.title.toLowerCase().includes(inputValue.toLowerCase()) || movie.year.toString().includes(inputValue)) ;
               })
                const searchedBookmarkedTvSeries = bookmarkedTvSeries.filter(movie => {
                    return (movie.title.toLowerCase().includes(inputValue.toLowerCase()) || movie.year.toString().includes(inputValue)) ;
               })               
               if(searchedBookmarkedMovies){
                    renderMovies(searchedBookmarkedMovies , bookmarkedMovieDisplayer);
                    bookMarkMovieHeading.textContent = `Found ${searchedBookmarkedMovies.length} results for ‘${inputValue}’`;
               } else if (searchedBookmarkedMovies.length === 0){
                    bookMarkMovieHeading.textContent = `Found ${searchedBookmarkedMovies.length} results for ‘${inputValue}’`;
               }
               if(searchedBookmarkedTvSeries){
                    renderMovies(searchedBookmarkedTvSeries, bookMarkedTvSeriesDisplayer);
                    bookMarkTvSeries.textContent = `Found ${searchedBookmarkedTvSeries.length} results for ‘${inputValue}’`;
               }else if (searchedBookmarkedTvSeries.length === 0) {
                    bookMarkTvSeries.textContent = `Found ${searchedBookmarkedTvSeries.length} results for ‘${inputValue}’`;
               }
           } else {
               renderMovies(bookmarkedMovie, bookmarkedMovieDisplayer);
               renderMovies(bookmarkedTvSeries, bookMarkedTvSeriesDisplayer);
               bookMarkMovieHeading.textContent = "Bookmarked Movies";
               bookMarkTvSeries.textContent = "Bookmarked TV Series";
           }
    });
});