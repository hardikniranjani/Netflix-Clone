<template>
  <div>
    <router-view />
    <notifications position="top center"  />
  </div>
</template>

<script>

export default {
  name: "App",
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
 