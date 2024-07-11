<template>
     <nav>
          <section class="logo-routers-container-wrapper">
               <div class="logo-container">
                    <img src="../assets/icons/logo.svg" alt="logo">
               </div>

               <div class="router-link-container">
                    <router-link to="/" class="router-link" exact-active-class="active"><img src="../assets/icons/icon-nav-home.svg"
                              alt="icon-nav-home"></router-link>
                    <router-link to="/movies" class="router-link" exact-active-class="active"><img src="../assets/icons/icon-nav-movies.svg"
                              alt="icon-nav-movies"></router-link>
                    <router-link to="/tv-series" class="router-link" exact-active-class="active"><img src="../assets/icons/icon-nav-tv-series.svg"
                              alt="icon-nav-tv-series"></router-link>
                    <router-link to="/bookmarked" class="router-link" exact-active-class="active"><img src="../assets/icons/icon-nav-bookmark.svg"
                              alt="icon-nav-bookmark"></router-link>
               </div>
          </section>

          <div class="avatar-container">
               <label for="profile-image-getter">

                    <input type="file" id="profile-image-getter" multiple accept=".jpg , .png"
                         @change="setProfileImg($event.target)">
                    <img src="../assets/thumbnails/avatar/image-avatar.png" alt="image-avatar"
                         v-if="avatarUrl ===  null">
                    <img :src="avatarUrl" alt="image-avatar" v-else>
               </label>
          </div>
     </nav>
</template>
<script>
// import { RouterLink } from 'vue-router';
  export default {
     data(){
          return{
               avatarUrl : null,
          }
     },
     methods: {
           setProfileImg(setter) {
               this.avatarUrl = URL.createObjectURL(setter.files[0]);
               // createob
           }
     },
  }
</script>
<style scoped>
@import url("../styles/base.css");

nav{
     width: 100px;
     height: 100vh;
     background-color: var(--nav-background);
     display: flex;
     flex-direction: column;
     align-content: center;
     justify-content: space-between;
     align-items: center;
     padding: 20px;
     border-radius: 10px;
}
.logo-routers-container-wrapper{
     width: 100%;
     height: auto;
     display: flex;
     flex-direction: column;
     align-items: center;
}
.router-link-container{
     width: 100%;
     height: auto;
     display: flex;
     flex-direction: column;
     align-items: center;
     margin-top: 80px;
    /* border: 2px solid red;*/
}
.router-link-active img,
.router-link-exact-active img {
filter: brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(223%) hue-rotate(238deg) brightness(115%) contrast(101%);  /* or any other style you want */
}
.router-link-container .router-link{
     width: 100%;
     height: 50px;
     margin-bottom: 20px;
     cursor: pointer;
     padding: 20px;
     display: flex;
     align-items: center;
     justify-content: center;
}
.router-link img{
     width: 30px;
     height: 30px;
}
.avatar-container{
     width: 70px;
     height: 70px;
     border-radius: 50%;
}
.avatar-container label{
     width: 100%;
     height: 100%;
     position: relative;
}
label #profile-image-getter {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
label img{
     width: 100%;
     height: 100%;
     border-radius: 50%;
}
</style>