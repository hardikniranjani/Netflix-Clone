<template>
  <div class="Gener">
    <div class="nav"><NavBar /></div>
    <div class="body">
      <div>
        <h1 class="d-flex justify-content-center Geners_title" >{{ Geners.GenresName }}</h1>
      </div>
      <div v-if="Movies.length > 0">
        <h2 class="Home_List_Title">Movies</h2>
        <MovieCardList class="ms-5"  :data="Movies" />
      </div>
      <div v-else></div>

      <div v-if="Series.length > 0">
        <h2 class="Home_List_Title">Series</h2>
        <SeriesCardList class="ms-5" :data="Series" />
      </div>
      <div v-else></div>
    </div>
    <div class="genres_footer"><Footer /></div>
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

</style>
<style scoped>
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
.genres_footer {
  margin-top: 120px;
}
.Geners_title{
  font-size: 3rem;
  font-weight: 800;
  padding-bottom: 0.3rem;
}
@media screen and (max-width: 788px) {
  .Geners_title {
    margin-bottom:2rem;
    margin-top:-4rem;
  font-size: 2rem;
  font-weight: 800 !important;
  padding-bottom: 0.3rem;
}
}
</style>