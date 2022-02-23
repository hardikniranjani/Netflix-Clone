<template>
  <div class="MoviePage">
    <div class="nav"><NavBar /></div>
    <MovieBanner
      :src="Banner_src"
      :Name="Movie.MovieName"
      :Description="Movie.Description"
      :id="this.id"
      :moviesrc="this.src"
      :movieData="Movie"
    />
    <div class="Movie_footer"><Footer /></div>
  </div>
</template>

<script>
import NavBar from "../../components/NavBar.vue";
import Footer from "../../components/Footer.vue";
import MovieApi from "../../services/movie.service";
import MovieBanner from "../../components/Movie/Movie_Banner.vue";

export default {
  name: "MoviePage",
  created() {
    document.title = `Netflix - Movie`;
  },

  data() {
    return {
      Movie: [],
      src: "",
      Banner_src: "",
    };
  },
  props: {
    id: String,
  },
  components: {
    NavBar,
    Footer,
    MovieBanner,
  },
  async mounted() {
    await MovieApi.findMovieBySearch({
      queryperam: "_id",
      queryName: `${this.id}`,
    })
      .then((res) => {
        this.Movie = res.data[0];
        this.src = res.data[0].Video_path;
        this.Banner_src = res.data[0].backdrop_path;
      })
      .catch((err) => {
        console.error(err);
        this.$router.replace({ name: "PageNotFound" });
      });
  },
};
</script>

<style scopes src="../../Style/card.css">
* {
  background-color: #fcfcfc00;
}
.banner__fadeBottom {
  height: 7.4rem;
  background: linear-gradient(
    180deg,
    transparent,
    rgba(37, 37, 37, 0.61),
    #111
  );
}
.MoviePage {
  width: 100%;
  height: 100%;
}
.nav {
  margin-top: 0px;
}
.body {
  margin-top: 200px;
}
.Movie_footer {
  margin-top: 70px;
}

</style>