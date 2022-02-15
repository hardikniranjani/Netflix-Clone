<template>
  <div class="Gener">
    <div class="nav"><NavBar /></div>
    <div class="body">
      <div>
        <h1>{{ Geners.GenresName }}</h1>
      </div>
      <div v-if="Movies.length > 0">
        <h2>Movies</h2>
        <MovieCardList  :data="Movies" />
      </div>
      <div v-else></div>

      <div v-if="Series.length > 0">
        <h2>Series</h2>
        <SeriesCardList :data="Series" />
      </div>
      <div v-else></div>
    </div>
    <div class="footer"><Footer /></div>
  </div>
</template>

<script>
import MovieCardList from "../../components/Movie/MovieCardList.vue";
import SeriesCardList from "../../components/Series/SeriesCardList.vue";
import NavBar from "../../components/NavBar.vue";
import Footer from "../../components/Footer.vue";

import SeriesApi from "../../services/series.service";
import MoviesApi from "../../services/movie.service";
import GenreApi from "../../services/genre.service";

export default {
  name: "GenersContent",

  data() {
    return {
      Series: [],
      Movies: [],
      Geners: [],
    };
  },
  props: {
    id: String,
  },
  components: {
    NavBar,
    Footer,
    MovieCardList,
    SeriesCardList
  },
  mounted() {
    document.title = `Netflix - Genres`;
    // series api
    SeriesApi.findSeriesBySearch({
      queryperam: "Genres",
      queryName: this.id,
    })
      .then((res) => {
        this.Series = res.data;
      })
      .catch((err) => {
        console.log(err.response);
      });

    // movie api
    MoviesApi.findMovieBySearch({
      queryperam: "Genres",
      queryName: this.id,
    })
      .then((res) => {
        this.Movies = res.data;
      })
      .catch((err) => {
        console.log(err.response);
      });

    // genres api
    GenreApi.getGenre({
      genre_id: this.id,
    })
      .then((res) => {
        this.Geners = res.data;
      })
      .catch((err) => {
        console.log(err.response);
        this.$router.replace({ name: "PageNotFound" });
      });
  },
};
</script>

<style scoped src="../../Style/card.css">
.Gener {
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
.body {
  margin-top: 200px;
}
.footer {
  margin-top: 470px;
}
</style>