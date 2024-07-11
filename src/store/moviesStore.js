import { defineStore } from "pinia";

export const useMovieStore = defineStore("movies", {
     state: () => ({
          movies : []
     }),
     getters : {
        // get movies which category are tv series
        getTvSeries(){
             return this.movies.filter(movie => movie.category === "TV Series");
        },
        // get movie which category are  movie
        getMovies(){
            return this.movies.filter(movie => movie.category === "Movie");
        },
        // get movies which are category are movie and are bookmarked
        getBoookMarkedMovies(){
            return this.movies.filter(movie => movie.category === "Movie" && movie.isBookmarked === true);

        },
        // get movies which are category are tv series and are bookmarked
        getBoookMarkedTvSeries(){
            return this.movies.filter(movie => movie.category === "TV Series" && movie.isBookmarked === true)
        },
        // to get the moveis that are currently trending 
        getTrendingMovies(){
            return this.movies.filter(movie => movie.isTrending === true);
        }
     },
     actions : {
        // get all movies from the database
        async getAllMovies(){
            try {
                const response = await fetch("http://127.0.0.1:8080/api/movies");
                this.movies = await response.json();
            } catch (error) {
                console.log(error)
            }
        },
        // function to search for movies 
        searchMovie(searchValue , movieArray){
            const searchTerm = searchValue.toLowerCase()
            if(!searchValue){
                return movieArray
            }else{
                return movieArray.filter(movie => movie.title.toLowerCase().includes(searchTerm));
            }
        },
        // function to chnage the bookmark status of a single movie
        async changeBookmarkedStatus(title , _id){
            let movie =  this.movies.find(movie => {
                return movie.title === title && movie._id === _id;
            });

            if(movie){
                try {
                    const response = await fetch(`http://127.0.0.1:8080/api/movie/bookmark/${_id}` , {
                        method : "PUT",
                    });
                    const data = await response.json();
                    if(data.status === "success"){
                        movie.isBookmarked = !movie.isBookmarked;
                    }else{
                        console.log(data.message)
                    };
                } catch (error) {
                    console.log(error)
                };
            };
        },

     },
 });