<template>
  <div class="main_class">
    <div class="nav"><NavBar /></div>
    <div class="main_classbody">
    </div>
    <div class="footer"><Footer /></div>
  </div>
</template>

<script>

import NavBar from "../../components/NavBar.vue";
import Footer from "../../components/Footer.vue";


export default {
  name: "TestingPage",

  data() {
    return {
      // Series: [],
    };
  },
  components: {
    NavBar,
    Footer,
  },
  mounted() {
    document.title = `Netflix - Testing`;
  },
};
</script>

<style>
.main_class {
  width: 100%;
  height: 100%;
}
.AllMovies {
  display: flex;
}
.AllSeries {
  display: flex;
}
.nav {
  margin-top: 0px;
}
.main_classbody {
  margin-top: 200px;
}
.footer {
  margin-top: 470px;
}
</style>