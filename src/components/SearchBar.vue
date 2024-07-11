<template>
     <div>
          <img src="../assets/icons/icon-search.svg" alt="icon-search">
          <input type="search" :placeholder="placeholder" :value="modelValue" @input="$emit('update:modelValue' , $event.target.value)">
     </div>
</template>

<script>

export default {
     props:{
          placeholder : String,
          modelValue : String
     },   
}
</script>
<style scoped>
@import url("../styles/base.css");
div{
     width: 100%;
     height: 50px;
     display: flex;
     align-items: center;
}
img{
     width: 40px;
     height: 40px;
}
input{
     width: 90%;
     border: none;
     outline: none;
     background: transparent;
     font-size: 20px;
     margin-left: 40px;
     padding: 20px;
     color: var(--text-white-soft);
}
input::placeholder{
     color: var(--opaque-white);
     text-transform: capitalize;
}
input:focus{
     border-bottom: 5px solid var(--nav-background);
}
input::-webkit-search-cancel-button{
     appearance: none;
}
</style>