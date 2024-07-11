<template>
     <section>
          <div class="logo-wrapper">
               <img src="../assets/icons/logo.svg" alt="icon-logo">
          </div>
          <form>
               <h1>Sign Up</h1>
               <label for="email-getter">
                    <input  type="email" id="email-getter" placeholder="Email address"
                         v-model="email">
                    <p v-if="emailError !== ''">{{ emailError }}</p>
               </label>
               <label for="password-getter">
                    <input  type="password" id="password-getter" placeholder="Password"
                         v-model="password">
                    <p v-show="passwordError">{{ passwordError }}</p>
               </label>
               <label for="repeat-password-getter">
                    <input type="password" id="repeat-password-getter" placeholder="Repeat password"
                         v-model="confirmPassword">
                    <p v-show="confirmPasswordError">{{ confirmPasswordError }}</p>
               </label>
               <button @click="signUp()" type="button">Create an account</button>
               <span>
                    <p>Already have an account?</p>
                    <router-link to="/login" class="router-link">Login</router-link>
               </span>
          </form>
     </section>
</template>

<script >
export default {
     data(){
          return{
               email : "",
               password : "",
               confirmPassword : "",
               emailError : "",
               passwordError : "",
               confirmPasswordError : "",
               valid : true
          }
     },
     methods :{
         checkEmailValid(){
              const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

              if (this.email === "") {
                   this.emailError = "Cant't be empty";
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
          }else if(this.confirmPassword === "") {
               this.confirmPasswordError = "Can't be empty";
               this.valid = false
          }
          else if((this.password && this.confirmPassword) && this.password !== this.confirmPassword){
               this.passwordError = "Password mismatched";
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
         async signUp(){
             if(!this.checkValidations()){
               return
          }
          else{
               try {
                    let newUser = {
                         email : this.email,
                         password : this.password
                    }
                    console.log(newUser)
                    const response = await fetch("http://localhost:8080/api/auth/users/signup" , {
                         method : "POST",
                         headers: { "Content-Type": "application/json" },
                         body  : JSON.stringify(newUser),
                    });
                    const  data = await response.json();

                    if(data.status === "Conflict"){
                         this.emailError = "Email already exists";
                         return // check if email already exists in the database and return corresponding response message
                    }
                    if(data.status === "Created"){
                         this.$router.push("/login"); // if status is  created re-route the page to login page 
                    }
               } catch (error) {
                    console.log(error)
               }
          }
         }
     }
}
</script>

<style scoped>
@import url("../styles/base.css");
@import url("../styles/auth.css");
</style>