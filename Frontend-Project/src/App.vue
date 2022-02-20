<template>
  <div>
    <!-- <CardList /> -->
    <router-view />
    <notifications position="top center" width="500px"/>
  </div>
</template>

<script>

//  import CardList from "./Pages/Cardlist.vue"
export default {
  name: "App",
  components: {
    // CardList
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  /* background-color: #141414; */
  background-color: #000000;
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
 