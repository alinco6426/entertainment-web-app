<template>
     <div class="trending-movie">
          <button class="bookmark-button" @click="setBookmark(movie.title , movie._id)">
               <img v-if="movie.isBookmarked" src="../assets/icons/icon-bookmark-full.svg" alt="icon-bookmark-full">
               <img v-else src="../assets/icons/icon-bookmark-empty.svg" alt="icon-bookmark-empty">
          </button>
          <section class="play-button-container">
               <button class="play-button">
                    <img src="../assets/icons/icon-play.svg" alt="icon-play">
                    <p>Play</p>
               </button>
          </section>
          <img class="movie-thumbnail" :src="`/src/${movie.thumbnail.trending.large}`" alt="movie-thumbnail">
          <figure>
               <span>
                    <p>{{ movie.year }}</p>
                    <p>
                         <img v-if="movie.category === 'TV Series'" src="../assets/icons/icon-category-tv.svg"
                              alt="icon-category">
                         <img v-else-if="movie.category === 'Movie'" src="../assets/icons/icon-category-tv.svg"
                              alt="icon-category">
                         {{ movie.category }}
                    </p>
                    <p>
                         {{ movie.rating }}
                    </p>
               </span>
               <h3>{{ movie.title }}</h3>
          </figure>
     </div>
</template>

<script>
import { useMovieStore } from '../store/moviesStore';
export default {
     props: {
          movie : Object
     },
     methods : {
            setBookmark(title , id){
               useMovieStore().changeBookmarkedStatus(title , id)
            }
     }
}
</script>

<style scoped>
@import url("../styles/base.css");
@import url("../styles/trending-movie.css");
</style>