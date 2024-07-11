<template>
     <section>
               <div class="logo-wrapper">
                    <img src="../assets/icons/logo.svg" alt="icon-logo">
               </div>
               <form>
                    <h1>Login</h1>
                    <label for="email-getter">
                         <input @input="chekvalue(email)" type="email" id="email-getter" placeholder="Email address" v-model="email">
                         <p v-if="emailError">{{ emailError }}</p>
                    </label>
                    <label for="password-getter">
                         <input @input="chekvalue(password)" type="password" id="password-getter" placeholder="Password" v-model="password">
                         <p v-if="passwordError">{{ passwordError }}</p>
                    </label>
                    <button type="button" @click="login()">Login to your account</button>
                    <span>
                         <p>Don't have an account?</p>
                         <router-link to="/signup"  class="router-link" >Sign Up</router-link>
                    </span>
               </form>
          </section>
</template>
<script>
import { useAuthStore } from '../store/authStore';
import { useMovieStore } from '../store/moviesStore';
export default {
     data(){
         return {
          email : "",
          password : "",
          emailError : "",
          passwordError : "",
          valid : true
         } 
     },

     methods : {
          chekvalue(value){
               console.log(value)
          },
           checkEmailValid(){
              const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

              if (this.email === "") {
                   this.emailError = "Can't be empty";
                   this.valid = false;
              }
              else if (this.email !== "" && !emailRegEx.test(this.email)){
                this.emailError = "Wrong email format";
                this.valid = false;
              } 
              else{
               this.emailError = "";
              }
         },

         checkPassword(){
          if (this.password === ""){
               this.passwordError = "Can't be empty";
               this.valid = false;
          }
          else{
               this.passwordError = "";
               this.confirmPasswordError  = "";
          }
         },

         checkValidations(){
          this.valid = true ; // set the initial value of valid to true 

          this.checkEmailValid();
          this.checkPassword(); // run validations on the input fields
         
          return this.valid; // return the value of valid
         },

         async login(){
          if (!this.checkValidations()){
               return
          }
          else{
               const parameters =  {
                    email: this.email,
                    password : this.password
               };
               console.log(parameters)
               const response = await fetch("http://localhost:8080/api/auth/login" , {
                    method : "POST",
                    headers : {"Content-Type" : "application/json"},
                    body : JSON.stringify(parameters)
               });
               const data = await response.json();

               if(data.status === "Not found"){
                    this.emailError = data.message;
                    return
               }
               if(data.status === "Forbidden"){
                    this.passwordError = data.message;
                    return
               }
               if(data.status === "Success"){
                    const {user , token} = data;
                    const authStore = useAuthStore();
                    authStore.setUserInfo(user , token);
                    this.getAllMovies()
                    this.$router.push("/");
               }else{
                    console.log(data.message);
                    return
               }
          }
         },
    getAllMovies(){
      return useMovieStore().getAllMovies()
    }
     }
}
</script>



<style scoped>
@import url("../styles/base.css");
@import url("../styles/auth.css");
</style>