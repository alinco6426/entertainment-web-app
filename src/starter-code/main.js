let movieContainer = JSON.parse(localStorage.getItem("movieContainer")) || [];

 async function fetchAllMovies(){
     try{
          const response = await fetch("data.json");
          const data = await response.json();
          if (!response.ok) {
               throw new Error(`HTTP error! status: ${response.status}`);
          }
          const movies = data;
          return movies;``
     }
     catch (error) {
          console.error('Add request error:', error);
          throw error;
     }
 }
 fetchAllMovies()

async function insertMovies() {
     try{
          if(movieContainer.length === 0){
               movieContainer = await fetchAllMovies();
          }
          localStorage.setItem("movieContainer", JSON.stringify(movieContainer));
          console.log(movieContainer)
     }
     catch (error) {
          console.error('Add request error:', error);
          throw error;
     }
}
insertMovies()

const isMobile = window.matchMedia("(max-width:768px").matches;
const isTablet = window.matchMedia("(min-width:769px)").matches;

function renderMovies(movieList, displayer ) {
     if (displayer) {
          displayer.innerHTML = "";

          movieList.forEach((movie) => {

               let movieContaineer = document.createElement("div");
               movieContaineer.setAttribute("class", "movie-container");
          
               let bookMarkButtonContainer = document.createElement("section");
               bookMarkButtonContainer.setAttribute("class", "book-mark-container");
               let bookMarkIcon = document.createElement("img");
               bookMarkIcon.setAttribute("src", movie.isBookmarked ? "icon-bookmark-full.svg" : "icon-bookmark-empty.svg");
               bookMarkIcon.addEventListener("click", function () {
                    addBookMark(this,movie);
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

function addBookMark(button,movie) {
     let bookMarked = movie.isBookmarked;
     bookMarked = !bookMarked;
     movie.isBookmarked = bookMarked;
     localStorage.setItem("movieContainer", JSON.stringify(movieContainer))

     if (button.getAttribute("src").includes("icon-bookmark-full.svg")) {
          button.setAttribute("src", "icon-bookmark-empty.svg")
     }
     else {
          button.setAttribute("src", "icon-bookmark-full.svg");
     }
}
export { insertMovies , movieContainer , renderMovies,addBookMark};



