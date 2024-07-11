<template>
     <main>
          <!-- <Navbar /> -->
          <section>
               <SearchBar :placeholder="placeholder"  v-model="searchValue" />
               <h1>TV Series</h1>
               <div class="movies-container">
                    <Movie v-for="serie in tvSeries" :key="serie.title" :movie="serie" :searchValue = "searchValue" />
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
               placeholder: "Search for a TV Series",
          };
     },
     computed: {
          tvSeries() {
            return useMovieStore().getTvSeries;
          },
          filteredSeries() {
               return useMovieStore().searchMovie(this.searchValue , this.tvSeries)
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
