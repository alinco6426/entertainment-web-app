<template>
  <!-- <h1>home</h1> -->
  <div>
    <Navbar />
    <router-view class="router-view"></router-view>
  </div>
</template>
<script>
import Navbar from './components/Navbar.vue';
import { useAuthStore } from './store/authStore';
import { useMovieStore } from './store/moviesStore';

export default {

  mounted() {
    
    this.initToken();
    this.runAuth();
    this.getAllMovies();
    console.log(this.getAllMovies())
   
  },
  computed: {
    token(){
      return useAuthStore().token
    },
  },
  methods: {
     runAuth(){
      if(this.token === null){
        this.$router.push('/login')
      }
     },
     
     initToken(){
      return useAuthStore().initializeToken()
    },
    getAllMovies(){
      return useMovieStore().getAllMovies()
    }
  },
  components: {
    Navbar
  }
}
</script>
<style scoped>
@import url("../src/styles/base.css");

div {
  width: 100%;
  display: flex;
  padding-inline: 50px;
  padding-top: 50px;
}

.router-view {
  width: 90%;
  margin-left: auto;
}
</style>
<!-- <style scoped>

</style> -->

