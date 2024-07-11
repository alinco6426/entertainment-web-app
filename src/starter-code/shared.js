let navLink = document.querySelectorAll("navLink");
let homeNav = document.querySelectorAll(".homeNav");
let MoviesNav = document.querySelectorAll(".MoviesNav");
let TvSeriesNav = document.querySelectorAll(".TvSeriesNav");
let BookmarkedNav = document.querySelectorAll(".BookmarkedNav")

let currentLocation = window.location;

if(currentLocation.href.includes("/index")){
     for(const link of navLink){
          link.classList.remove("active");
     }
     for(const link of homeNav){
          link.classList.add("active")
     }
}
else if (currentLocation.href.includes("movies")) {
     for(const link of navLink){
          link.classList.remove("active");
     }
     for(const link of MoviesNav){
          link.classList.add("active");
     }
}
else if (currentLocation.href.includes("/tv-series")){
     for(const link of navLink){
          link.classList.remove("active");
     }
     for(const link of TvSeriesNav){
          link.classList.add("active");
     }
}
else if (currentLocation.href.includes("/bookmarked")){
     for(const link of navLink){
          link.classList.remove("active");
     }
     for(const link of BookmarkedNav){
          link.classList.add("active");
     }
}