<template>
     <!-- <main> -->
     <!-- <Navbar /> -->
     <main>
          <SearchBar :placeholder="placeholder"  v-model="searchValue" />
          <h1>Trending</h1>
          <div class="trending-movies-wrapper">
               <section class="trending-movies-container">
                    <TrendingMovie v-for="movie in TrendingMovies" :key="movie.title" :movie="movie" />
               </section>
          </div>
          <h1 v-if="!searchValue">Recommended for you</h1>
          <h1 v-else>Found {{ filteredMovies.length }} results for {{ searchValue }}</h1>

          <div class="movies-container">
               <Movie v-for="movie in filteredMovies" :key="movie.title" :movie="movie" />
          </div>
     </main>
     <!-- </main> -->
</template>

<script>
import SearchBar from '../components/SearchBar.vue';
import Movie from '../components/MovieComp.vue';
// import Navbar from '../components/Navbar.vue';
import { useMovieStore } from '../store/moviesStore';
import TrendingMovie from '../components/TrendingMovie.vue';

export default {
     data() {
          return {
               placeholder: "Search for movies or TV series",
               searchValue: "",
          };
     },
     mounted() {
        useMovieStore().getAllMovies;
     },
     computed : {
          Movies(){
               return useMovieStore().movies;
          },
          filteredMovies(){
               if(!this.searchValue){
                    return this.Movies
               }else{
                    return this.Movies.filter(movie => {
                         return movie.title.toLowerCase().includes(this.searchValue.toLowerCase())
                    })
               }
          },
          TrendingMovies(){
               return useMovieStore().getTrendingMovies
          }
     },
     components: {
          SearchBar,
          Movie,
          // Navbar,
          TrendingMovie
     }
};
</script>

<style scooped>
@import url("../styles/base.css");


main {
     width: 100%;
}
.trending-movies-wrapper{
     width:100%;
     height: auto;
     overflow-x: hidden;
     margin: 30px 0;
}
.trending-movies-container {
     width: 100%;
     height: auto;
     display: flex;
     flex-wrap: nowrap;
     overflow-x: scroll;
}
.trending-movies-container::-webkit-scrollbar{
     width: 100%;
     height: 10px;
     border-radius: 10px;
     background: var(--nav-background);
     cursor: pointer
}

.movies-container {
     width: 100%;
     display: grid;
     grid-template-columns: repeat(4, minmax(300px, 1fr));
     grid-gap: 20px;
}
</style>
