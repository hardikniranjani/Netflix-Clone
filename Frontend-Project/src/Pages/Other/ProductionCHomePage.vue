<template>
  <div class="ProductionCHomePage">
    <div class="nav"><NavBar /></div>
    <div class="ProductionCHomePage_body">
    </div>
    <div class="footer"><Footer /></div>
  </div>
</template>

<script>
// import Card from "../../components/card.vue";
import NavBar from "../../components/NavBar.vue";
import Footer from "../../components/Footer.vue";

// import SeriesApi from "../../services/series.service";
// import MoviesApi from "../../services/movie.service";
// import GenreApi from "../../services/genre.service";

export default {
  name: "ProductionCHomePage",

  data() {
    return {
      // Series: [],
    };
  },
  props: {
    id: String,
  },
  components: {
    NavBar,
    Footer,
  },
  mounted() {
    document.title = `Netflix - Company`;
    // series api
    // SeriesApi.findSeriesBySearch({
    //   queryperam: "Genres",
    //   queryName: this.id,
    // })
    //   .then((res) => {
    //     console.log(res);
    //     this.Series = res.data;
    //   })
    //   .catch((err) => {
    //     console.log(err.response);
    //   });

  },
};
</script>

<style>
.ProductionCHomePage {
  width: 100%;
  height: 100%;
}
.nav {
  margin-top: 0px;
}
.ProductionCHomePage_body {
  margin-top: 200px;
}
.footer {
  margin-top: 470px;
}
</style>