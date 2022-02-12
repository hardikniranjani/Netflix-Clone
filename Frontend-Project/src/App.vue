<template>
  <div>
    <!-- <UserLoading /> -->
    <router-view />
  </div>
</template>

<script>
// import UserLoading from "./components/UserLoading.vue"
export default {
  name: "App",
  // components:{
  //   UserLoading
  // }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  /* background-color: #000000e7; */
  background-color: #141414;
  color: #fafafad3;
  overflow-x: hidden;
}
::-webkit-scrollbar {
  width: 7px;
  height: 5px;
  background-color: rgba(17, 17, 17, 0.979);
}
::-webkit-scrollbar-thumb {
  background-color: #fafafad3;
  border-radius: 20px;
}
</style>
 