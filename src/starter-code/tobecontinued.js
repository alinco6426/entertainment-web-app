
let windowLocation = location.pathname;

function fetchData() {
    fetch("data.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            movieList = data;
            let windowLocation = location.pathname;
            if (windowLocation === "/starter-code/index.html") {
                recomendedMovie()
                isTrending();
            } else if (windowLocation === "/starter-code/movies.html" || windowLocation === "/starter-code/tv-series.html") {
                return isMovieCategory();
            } else if (windowLocation === "/starter-code/bookmarked.html") {

                isBookmarked()
            }

        })
        .catch(function (error) {
            console.log("Error :", error)
        })
}
fetchData()

let movieList = JSON.parse(localStorage.getItem('movieList')) || [];
let movieDisplayer;
let isMobile = window.matchMedia("(max-width:500px").matches;
let isPad = window.matchMedia("(max-width:780px)").matches;




function listMovie(movie, displayer, index) {


    if (displayer) {
        let movieDisplay = ` <section class="movie-container">
    <div class="book-mark-container">
        ${movie.isBookmarked === true ? `<img src="icon-bookmark-full.svg" alt="icon-category-movie" class="movie-book-marker">`
                : movie.isBookmarked === false ? `<img src="icon-bookmark-empty.svg" alt="book-mark-container" class="movie-book-marker">` : ''}
    </div>
    <div class="movie-illustration-container">
       <section class="movie-illustrating-image-container"></section>
      <section class="movie-play-container">
        <button id="play" class="play">
          <img src="icon-play.svg" alt="icon-play">
          <p>play</p>
        </button>
      </section>
   

    </div>

    <div class="movie-details">

      <p class="movie-year">${movie.year}</p>
      <p class="movie-category">
      ${movie.category === "Movie" ? `<img src="icon-category-movie.svg" alt="icon-category-movie" class="movie-category-icon">` : movie.category === "TV Series" ? `<img src="icon-category-tv.svg" alt="icon-category-movie" class="movie-category-icon">` : ""}
      ${movie.category}      
      </p>
      <p class="movie-rating">${movie.rating}</p>

    </div>
    <h4 class="movie-title">${movie.title}</h4>
  </section>`;
        displayer.innerHTML += movieDisplay;
        isBookmarkedToggle(displayer, movie);
        illustratingImage(displayer, movie, index);
    }
}


function isTrending() {

    let isTrendingMovie = movieList.filter((movie) => {
        return movie.isTrending === true;
    })
    isTrendingMovie.forEach((movie, index) => {
        let isTrendingDisplayer = document.getElementById("is-trending-displayer");
        listMovie(movie, isTrendingDisplayer, index);
    })
}
function recomendedMovie() {
    const recommendedMovies = movieList.filter((movie) => { return movie.isTrending === false; });



    let recommendedMoviesDidplayer = document.getElementById("recommended-movie-displayer");

    recommendedMovies.forEach((recomendedMovie, index) => {
        listMovie(recomendedMovie, recommendedMoviesDidplayer, index);
    })
}

function isMovieCategory() {

    let categoryList, categoryDisplayer, categoryIllustratingImage;

    if (windowLocation === "/starter-code/movies.html") {
        categoryList = movieList.filter((movie) => { return movie.category === "Movie" });
        categoryDisplayer = document.getElementById("category-movie-display-container");
    } else if (windowLocation === "/starter-code/tv-series.html") {
        categoryList = movieList.filter((movie) => { return movie.category === "TV Series" });
        categoryDisplayer = document.getElementById("category-tv-series-displayer");
    }

    categoryList.forEach((category, index) => {
        listMovie(category, categoryDisplayer, index);
    });
}



function isBookmarked() {
    let isBookmarkedMovieDisplayer = document.getElementById('book-mark-movie-displayer');


    let isBookmarkedMovieList = movieList.filter((movie) => { return movie.isBookmarked && movie.category === "Movie" })
    isBookmarkedMovieList.forEach((movie, index) => {
        listMovie(movie, isBookmarkedMovieDisplayer, index)
    })

    let isBookmarkedTvDisplayer = document.getElementById("book-mark-tv-series-displayer");
    let isBookmarkedTvList = movieList.filter((movie) => { return movie.isBookmarked && movie.category === "TV Series" })

    isBookmarkedTvList.forEach((movie, index) => {
        listMovie(movie, isBookmarkedTvDisplayer, index)
    })
}


function isBookmarkedToggle(displayer, movie) {
    let bookMarkBtn = displayer.getElementsByClassName("book-mark-container");
    for (let i = 0; i < bookMarkBtn.length; i++) {
        bookMarkBtn[i].addEventListener("click", function () {
            let bookMarkIcon = this.getElementsByClassName("movie-book-marker")[0];
            if (movie.isBookmarked === true) {
                movie.isBookmarked = false;
                bookMarkIcon.src = "icon-bookmark-empty.svg";
            } else if (movie.isBookmarked === false) {
                movie.isBookmarked = true;
                bookMarkIcon.src = "icon-bookmark-full.svg";
            }
        })
    }
    return movie.isBookmarked;
}

function illustratingImage(displayer, movie, index) {
    let illustratingContainers = displayer.getElementsByClassName("movie-illustrating-image-container")[index];
    let illustratingImage;
    if (displayer === "recommended-movie-displayer") {
        if (isMobile) {
            illustratingImage = `<img src="${movie.thumbnail.trending.small}" alt="icon-category-movie" >`;
        } else {
            illustratingImage = `<img src="${movie.thumbnail.trending.large}" alt="icon-category-movie">`;
        };
    } else if (displayer !== "recommended-movie-displayer") {
        if (isMobile) {
            if (isMobile) {
                illustratingImage = `<img src="${movie.thumbnail.regular.small}" alt="icon-category-movie">`;
            } else if (isPad) {
                illustratingImage = `<img src="${movie.thumbnail.regular.medium}" alt="icon-category-movie">`;
            } else {
                illustratingImage = `<img src="${movie.thumbnail.regular.large}" alt="icon-category-movie">`;
            };
        }
    }



    illustratingContainers.innerHTML = illustratingImage;

}
