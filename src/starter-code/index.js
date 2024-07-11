
// const profileChanger = document.getElementById("profile-changer");

// profileChanger.addEventListener("change",function (){
//     let profileImage = document.getElementById("profile-image");
//     let newSrc = URL.createObjectURL(this.files[0]);
//     profileImage.setAttribute("src",newSrc );
// })

import { insertMovies, movieContainer, renderMovies ,addBookMark} from "./main.js";

const isMobile = window.matchMedia("(max-width:768px").matches;
const isTablet = window.matchMedia("(min-width:769px)").matches;

const recommendedMovieDisplayer = document.getElementById("recommended-movie-displayer");
const isTrendingDisplayer = document.getElementById("is-trending-displayer");
insertMovies().then(
    function () {
        const isTrendingMovie = movieContainer.filter(movie => {
            return movie.isTrending === true;
        })
        renderTrendingMovies(isTrendingMovie, isTrendingDisplayer);
        renderMovies(movieContainer, recommendedMovieDisplayer);
    }
);






function renderTrendingMovies(movieList, displayer){
    if (displayer) {
        displayer.innerHTML = "";

        movieList.forEach((movie) => {

            let movieContaineer = document.createElement("div");
            movieContaineer.setAttribute("class", "trending-movie");

            let bookMarkButtonContainer = document.createElement("section");
            bookMarkButtonContainer.setAttribute("class", "book-mark-container");
            let bookMarkIcon = document.createElement("img");
            bookMarkIcon.setAttribute("src", movie.isBookmarked ? "icon-bookmark-full.svg" : "icon-bookmark-empty.svg");
            bookMarkIcon.addEventListener("click", function () {
                addBookMark(this, movie);
                renderMovies(movieList, displayer)
            })
            bookMarkButtonContainer.append(bookMarkIcon)


            let movieIllustartionContainer = document.createElement("div");
            movieIllustartionContainer.setAttribute("class", "movie-illustration-container");

            let movieIllustartionImageContainer = document.createElement("article");
            movieIllustartionImageContainer.setAttribute("class", "movie-illustrating-image-container");

            let illustratingImage = document.createElement("img");
            illustratingImage.setAttribute("src", isMobile ? movie.thumbnail.regular.small : isTablet ? movie.thumbnail.regular.medium : movie.thumbnail.regular.large);
            movieIllustartionImageContainer.append(illustratingImage);

            let moviePlayContainer = document.createElement("div");
            moviePlayContainer.setAttribute("class", "movie-play-container");

            let moviePlayContainerContent =
                `<button id="play" class="play">
               <img src="icon-play.svg" alt="icon-play">
               <p>play</p>
               </button>`;
            moviePlayContainer.innerHTML = moviePlayContainerContent;

            movieIllustartionContainer.append(movieIllustartionImageContainer, moviePlayContainer);

            let otherMovieDetailsContainer = document.createElement("section");
            otherMovieDetailsContainer.classList.add("other-movies-details-container");
            let otherMovieDetails =
                `<div class="movie-details">
               <p class="movie-year">${movie.year}</p>
               <p class="movie-category">${movie.category === "Movie" ? `<img src="icon-category-movie.svg" alt="icon-category-movie" class="movie-category-icon">` : movie.category === "TV Series" ? `<img src="icon-category-tv.svg" alt="icon-category-movie" class="movie-category-icon">` : ""} ${movie.category}</p>
               <p class="movie-rating">${movie.rating}</p>
               </div>
               <h4 class="movie-title">${movie.title}</h4>`;
            otherMovieDetailsContainer.innerHTML = otherMovieDetails;

            movieContaineer.append(bookMarkButtonContainer, movieIllustartionContainer, otherMovieDetailsContainer);

            displayer.appendChild(movieContaineer);

        })
    }
}


const searchMovieBar = document.getElementById("search-movie-bar");
const heading = document.querySelector(".recommendHeading");
searchMovieBar.addEventListener("input" , function(){
if(this.value !== ""){
    const inputValue = this.value;
    const searchedMovies = movieContainer.filter(movie => {
        return movie.title.toLowerCase().includes(inputValue.toLowerCase()) || movie.category.toLowerCase().includes(inputValue.toLowerCase()) || movie.year.toString().includes(inputValue);
    })
    renderMovies(searchedMovies,recommendedMovieDisplayer)
    heading.textContent = `Found ${searchedMovies.length} results for ‘${inputValue}’`
}else{
    heading.textContent = "Recommended for you";
}
})