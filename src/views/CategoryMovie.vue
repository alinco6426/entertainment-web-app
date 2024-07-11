<template>
<main>
          <!-- <Navbar /> -->
          <section>
               <SearchBar :placeholder="placeholder"  v-model="searchValue" />
               <h1>Movies</h1>
               <div class="movies-container">
                    <Movie v-for="movie in filteredMovies" :key="movie.title" :movie="movie"
                         :searchValue="searchValue" />
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
               placeholder: "Search for a movie"
          };
     },
     computed: {
          isMovie() {
               return useMovieStore().getMovies;
          },
          filteredMovies() {
               return useMovieStore().searchMovie(this.searchValue , this.isMovie)
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
