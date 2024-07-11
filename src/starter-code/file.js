let windowLocation = location.pathname;
const isMobile = window.matchMedia("(max-width:500px").matches;
const isPad = window.matchMedia("(max-width:780px)").matches;

const fetchData = async () => {
     try {
          const response = await fetch("data.json");
          const data = await response.json();
          movieList = data;

          if (windowLocation === "/starter-code/index.html") {
               recomendedMovie();
               isTrending();
          } else if (windowLocation === "/starter-code/movies.html" || windowLocation === "/starter-code/tv-series.html") {
               isMovieCategory();
          } else if (windowLocation === "/starter-code/bookmarked.html") {
               isBookmarkedTv();
               isBookmarkedMovie();
          }
          localStorage.setItem("movielist", JSON.stringify(movieList));
     } catch (error) {
          console.log("Error :", error);
     }
};

const listMovie = (movie, displayer, index) => {
     if (displayer) {
          const movieDisplay = `<section class="movie-container">
            <div class="book-mark-container">
                <img src="${movie.isBookmarked ? "icon-bookmark-full.svg" : "icon-bookmark-empty.svg"}" alt="icon-category-movie" class="movie-book-marker">
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
                <p class="movie-category">${movie.category === "Movie" ? `<img src="icon-category-movie.svg" alt="icon-category-movie" class="movie-category-icon">` : movie.category === "TV Series" ? `<img src="icon-category-tv.svg" alt="icon-category-movie" class="movie-category-icon">` : ""} ${movie.category}</p>
                <p class="movie-rating">${movie.rating}</p>
            </div>
            <h4 class="movie-title">${movie.title}</h4>
        </section>`;
          displayer.innerHTML += movieDisplay;
          isBookmarkedToggle(displayer, movie);
          illustratingImage(displayer, movie, index);
     }
};

const illustratingImage = (displayer, movie, index) => {
     const illustratingContainers = displayer.getElementsByClassName("movie-illustrating-image-container")[index];
     let illustratingImage;

     if (displayer === "recommended-movie-displayer") {
          illustratingImage = isMobile ? `<img src="${movie.thumbnail.trending.small}" alt="icon-category-movie">` : `<img src="${movie.thumbnail.trending.large}" alt="icon-category-movie">`;
     } else {
          illustratingImage = isMobile ? `<img src="${movie.thumbnail.regular.small}" alt="icon-category-movie">` : isPad ? `<img src="${movie.thumbnail.regular.medium}" alt="icon-category-movie">` : `<img src="${movie.thumbnail.regular.large}" alt="icon-category-movie">`;
     }

     illustratingContainers.innerHTML = illustratingImage;
};

const attachSearchListener = (searchInput, dataList, displayer) => {
     searchInput.addEventListener("input", function searchBar() {
          const inputValue = searchInput.value.toLowerCase();
          const searchedMovie = dataList.filter((movie) => {
               return movie.title.toLowerCase().includes(inputValue) || movie.category.toLowerCase().includes(inputValue) || movie.year.toString().includes(inputValue);
          });
          displayer.innerHTML = "";
          if (inputValue) {
               let alertMessage = `<h1 class = "search-feedback">Found ${searchedMovie.length} results for '${inputValue}'</h1>`;
               displayer.innerHTML = alertMessage;
          }
          searchedMovie.forEach((movie, index) => {
               listMovie(movie, displayer, index);
          });

     });
};

const isTrending = () => {
     const isTrendingMovie = movieList.filter((movie) => movie.isTrending);
     const isTrendingDisplayer = document.getElementById("is-trending-displayer");

     isTrendingMovie.forEach((movie, index) => {
          listMovie(movie, isTrendingDisplayer, index);
     });
     let isTrendingMovieContainer = isTrendingDisplayer.getElementsByClassName("movie-container");
     Array.from(isTrendingMovieContainer).forEach(container => container.classList.add("is-trending-container"));
};

const recomendedMovie = () => {
     const recommendedMovies = movieList.filter((movie) => !movie.isTrending);
     const recommendedMoviesDidplayer = document.getElementById("recommended-movie-displayer");

     recommendedMovies.forEach((recomendedMovie, index) => {
          listMovie(recomendedMovie, recommendedMoviesDidplayer, index);
     });

     const searchInput = document.getElementById("search-movie-bar");
     attachSearchListener(searchInput, recommendedMovies, recommendedMoviesDidplayer);
};

const isMovieCategory = () => {
     let categoryList, categoryDisplayer, searchInput;

     if (windowLocation === "/starter-code/movies.html") {
          categoryList = movieList.filter((movie) => movie.category === "Movie");
          categoryDisplayer = document.getElementById("category-movie-display-container");
          searchInput = document.getElementById("category-movie-search-bar");
     } else if (windowLocation === "/starter-code/tv-series.html") {
          categoryList = movieList.filter((movie) => movie.category === "TV Series");
          categoryDisplayer = document.getElementById("category-tv-series-displayer");
          searchInput = document.getElementById("category-tv-search-bar");
     }

     categoryList.forEach((category, index) => {
          listMovie(category, categoryDisplayer, index);
          isBookmarkedToggle(categoryDisplayer, category);
          const categoryIllustratorDisplayer = categoryDisplayer.getElementsByClassName("movie-illustrating-image-container")[index];
          const categoryIllustratingImage = isMobile ? `<img src="${categoryList[index].thumbnail.regular.small}" alt="icon-category-movie">` : isPad ? `<img src="${categoryList[index].thumbnail.regular.medium}" alt="icon-category-movie">` : `<img src="${categoryList[index].thumbnail.regular.large}" alt="icon-category-movie">`;
          categoryIllustratorDisplayer.innerHTML = categoryIllustratingImage;
     });

     attachSearchListener(searchInput, categoryList, categoryDisplayer);
};

const isBookmarkedTv = () => {
     const isBookmarkedTvDisplayer = document.getElementById("book-mark-tv-series-displayer");
     const isBookmarkedTvList = movieList.filter((movie) => movie.isBookmarked && movie.category === "TV Series");

     isBookmarkedTvList.forEach((movie, index) => {
          listMovie(movie, isBookmarkedTvDisplayer, index);
          isBookmarkedToggle(isBookmarkedTvDisplayer, movie);
          const illustration = isBookmarkedTvDisplayer.getElementsByClassName("movie-illustrating-image-container")[index];
          const illustratinImage = isMobile ? `<img src="${isBookmarkedTvList[index].thumbnail.regular.small}" alt="icon-category-movie">` : isPad ? `<img src="${isBookmarkedTvList[index].thumbnail.regular.medium}" alt="icon-category-movie">` : `<img src="${isBookmarkedTvList[index].thumbnail.regular.large}" alt="icon-category-movie">`;
          illustration.innerHTML = illustratinImage;
     });

     const searchInput = document.getElementById("book-mark-search-bar");
     attachSearchListener(searchInput, isBookmarkedTvList, isBookmarkedTvDisplayer);
};

const isBookmarkedMovie = () => {
     const isBookmarkedMovieDisplayer = document.getElementById('book-mark-movie-displayer');
     const isBookmarkedMovieList = movieList.filter((movie) => movie.isBookmarked && movie.category === "Movie");

     isBookmarkedMovieList.forEach((movie, index) => {
          listMovie(movie, isBookmarkedMovieDisplayer, index);
          const illustration = isBookmarkedMovieDisplayer.getElementsByClassName("movie-illustrating-image-container")[index];
          const illustratinImage = isMobile ? `<img src="${isBookmarkedMovieList[index].thumbnail.regular.small}" alt="icon-category-movie">` : isPad ? `<img src="${isBookmarkedMovieList[index].thumbnail.regular.medium}" alt="icon-category-movie">` : `<img src="${isBookmarkedMovieList[index].thumbnail.regular.large}" alt="icon-category-movie">`;
          illustration.innerHTML = illustratinImage;
     });

     const searchInput = document.getElementById("book-mark-search-bar");
     attachSearchListener(searchInput, isBookmarkedMovieList, isBookmarkedMovieDisplayer);
};

const isBookmarkedToggle = (displayer, movie) => {
     const bookMarkBtns = displayer.getElementsByClassName("movie-book-marker");
     Array.from(bookMarkBtns).forEach(button => {
          button.addEventListener("click", function () {
               setBookMark(button, movie)
          })
     })
};

const setBookMark = (button, movie) => {
     if (movie.isBookmarked === true) {
          button.setAttribute('src', "icon-bookmark-full.svg")
          movie.isBookmarked = false;
     } else if (movie.isBookmarked === false) {
          button.setAttribute('src', "icon-bookmark-empty.svg")
          movie.isBookmarked = true;
     }
     localStorage.setItem("movielist", JSON.stringify(movieList));
};

let movieList = JSON.parse(localStorage.getItem('movieList')) || [];
fetchData();


const profileChanger = document.getElementById("profile-changer");

profileChanger.addEventListener("change", function () {
     let profileImage = document.getElementById("profile-image");
     let newSrc = URL.createObjectURL(this.files[0]);
     profileImage.setAttribute("src", newSrc);
})

