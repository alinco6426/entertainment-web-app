<template>
     <!-- <main class="movie-container"> -->
          <div class="movie">
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

               <img class="movie-thumbnail"  :src="`/src${movie.thumbnail.regular.small}`" alt="movie-thumnbnail">
               <span>
                    <p>{{ movie.year }}</p>
                    <p>
                         <img v-if="movie.category === 'TV Series' " src="../assets/icons/icon-category-tv.svg" alt="icon-category">
                         <img v-else-if="movie.category === 'Movie' " src="../assets/icons/icon-category-tv.svg" alt="icon-category">
                          {{ movie.category }}
                    </p>
                    <p>
                         {{ movie.rating }}
                    </p>
               </span>
               <h3>{{ movie.title }}</h3>
          </div>
     <!-- </main> -->

</template>
<script>
import { useMovieStore } from '../store/moviesStore';
export default {
     props:{
          movie : Object
     },
     methods: {
         setBookmark(title , id){
           useMovieStore().changeBookmarkedStatus(title , id)
         }
      }

}
</script>
<style scoped>
@import url("../styles/base.css");
  .movie{
     width: 100%;
     height: auto;
     cursor: pointer;
     position: relative
  }
  .movie .bookmark-button{
     width: 50px;
     height: 50px;
     border-radius: 50%;
     background-color: var(--bookmark-background);
     opacity: 3;
     display: flex;
     align-items: center;
     justify-content: center;
     position: absolute;
     top: 20px;
     right: 20px;
     z-index: 30;
  }
  .bookmark-button img{
     width: 15px;
     height: 15px;
  }
   .movie .movie-thumbnail{
     width: 100%;
     height:250px;
     border-radius: 8px;
  }
   .movie .play-button-container{
     width: 100%;
     height: 250px;
     background-color: var(--play-button-container-background);
     border-radius: 8px;
     display: flex;
     align-items: center;
     justify-content: center;
     position: absolute;
     top: 0;
     display: none;
  }
  .movie:hover  .play-button-container{
     display: flex;
     transition: all 20s ease-in;
  }
  .play-button{
     width: 150px;
     height: 80px;
     border-radius: 40px;
     display: flex;
     justify-content: space-between;
     align-content: center;
     align-items: center;
     background-color: var(--play-button-background);
     color:  var(--text-white-soft);
     padding: 20px;
     font-size: 16px;
  }
  .play-button img{
     width: 45px;
  }
  .movie span {
     width: 100%;
     display: flex;
     margin-top: 20px;
  }
  span p{
     color: var(--opaque-white);
     margin-right: 30px;
     font-weight: 300;
     position: relative;
  }
  span p:not(:first-child)::before{
     content: '';
     width: 5px;
     height: 5px;
     border-radius: 50%;
     background-color: var(--opaque-white);
     padding: 2px;
     position: absolute;
     top: 8px;
     left: -20px;
  }
  .movie h3{
     color: var(--text-white-soft);
     font-size: 25px;
     margin-top: 15px;
     text-transform: capitalize;
  }
</style>