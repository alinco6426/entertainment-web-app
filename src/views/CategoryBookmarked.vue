<template>
     <main>
          <!-- <Navbar /> -->
          <section>
               <SearchBar :placeholder="placeholder"  v-model="searchValue" />

               <h1 v-if="!searchValue">Bookmarked Movies</h1>
               <h1 v-else>Found {{ filteredBookMarkedMovies.length }} results for {{ searchValue }}</h1>
               <div class="movies-container" v-if="filteredBookMarkedMovies">
                    <Movie v-for="movie in filteredBookMarkedMovies" :key="movie.title" :movie="movie"
                         :searchValue="searchValue"/>
               </div>
               <h1 v-if="!searchValue">Bookmarked TV Series</h1>
               <h1 v-else>Found {{filteredBookmarkedSeries.length}} results for {{searchValue}}</h1>
               <div class="movies-container">
                    <Movie v-for="serie in filteredBookmarkedSeries" :key="serie.title" :movie="serie"
                         :searchValue="searchValue"/>
               </div>
          </section>
     </main>
</template>

<script>
import SearchBar from '../components/SearchBar.vue';
import Movie from '../components/MovieComp.vue';
import { useMovieStore } from '../store/moviesStore';
// import Navbar from '../components/Navbar.vue';

export default {
     data() {
          return {
               searchValue: "",
               placeholder : "Search for bookmarked movie or tv-series"
          };
     },
     computed: {
          bookmarkedMovies() {
               return useMovieStore().getBoookMarkedMovies
          }, 
          bookmarkedSeries() {
               return  useMovieStore().getBoookMarkedTvSeries;
          },
          filteredBookMarkedMovies() {
               return useMovieStore().searchMovie(this.searchValue , this.bookmarkedMovies)

          },
          filteredBookmarkedSeries() {
               return useMovieStore().searchMovie(this.searchValue , this.bookmarkedSeries);

          }
     },
     components: {
          SearchBar,
          Movie,
          // Navbar
     }
};
</script>

<style scoped>
@import url("../styles/base.css");

main {
     display: flex;
}

section {
     width: 100%;
}

.trending-movies-container {
     width: 100%;
     display: flex;
     justify-content: space-between;
}

.movies-container {
     width: 100%;
     display: grid;
     grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
}
</style>
