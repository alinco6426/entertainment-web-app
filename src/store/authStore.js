import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth" , {
     state: () => ({
          user: null,
          token : null
     }),
     getters : {},
     actions : {
     initializeToken() {
      const token = localStorage.getItem("token");
      if (token) {
        this.token = JSON.parse(token);
      }
    },
          setUserInfo(user , token){
               this.user = user;
               this.token = token;
                localStorage.setItem("token", JSON.stringify(token));
               console.log(this.user , this.token)
          },
          clearUserInfo() {  // Add a method to clear user info on logout
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");
    },
     }
})