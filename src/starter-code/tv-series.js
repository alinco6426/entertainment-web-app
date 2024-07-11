import { insertMovies, movieContainer, renderMovies } from "./main.js";

const tvSeriesDisplayer = document.getElementById("category-tv-series-displayer")
insertMovies().then(
function () {
     const isTvSeries = movieContainer.filter(movie => {
          return movie.category.toLowerCase() === "tv series";
     })
     renderMovies(isTvSeries, tvSeriesDisplayer);


     const searchMovieBar = document.getElementById("search-movie-bar");
     const heading = document.querySelector(".heading");
     
     searchMovieBar.addEventListener("input" , function(){
     if(this.value !== ""){     
     const inputValue = this.value;
     const searchedMovies = isTvSeries.filter(movie => {
        return movie.title.toLowerCase().includes(inputValue.toLowerCase()) || movie.year.toString().includes(inputValue);
     })
     renderMovies(searchedMovies,tvSeriesDisplayer)
     heading.textContent = `Found ${searchedMovies.length} results for ‘${inputValue}’`;
     }else{
          heading.textContent = "TV Series";
          renderMovies(isTvSeries, tvSeriesDisplayer);
     }
});
});
