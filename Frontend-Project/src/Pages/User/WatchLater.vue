<template>
  <div class="WatchLater">
    <div class="nav"><NavBar /></div>
    <div class="WatchLater_body container">
      <div class="d-flex justify-content-between">
        <h2 class="text-center">Watch Later</h2>
        <button
          class="btn btn-danger"
          style="background-color: #d81f26"
          @click="clearwatchLater()"
        >
          Clear WatchLater
        </button>
      </div>
      <div v-if="Movies.length > 0 || Episodes.length > 0">
        <span v-if="Movies.length > 0">
          <h4 class="mt-5">Movies</h4>
          <MovieWatchLater :data="Movies" />
        </span>
        <span v-if="Episodes.length > 0">
          <h4>Episodes</h4>
          <UserEpisodeCardList :data="Episodes" />
        
        </span>
      </div>
      <div v-else>
        <h2 class="text-center mt-5" style="color: #d81f26">No Watch Later</h2>
      </div>
    </div>
    <div class="footer"><Footer /></div>
  </div>
</template>

<script>
import NavBar from "../../components/NavBar.vue";
import Footer from "../../components/Footer.vue";
import UserApi from "../../services/user.service";
import MovieWatchLater from "../../components/Movie/MovieWatchLater.vue";
import UserEpisodeCardList from "../../components/Series/UserEpisodeCardList.vue";
export default {
  name: "WatchLater",

  data() {
    return {
      Episodes: [],
      Movies: [],
    };
  },
  components: {
    NavBar,
    Footer,
    MovieWatchLater,
    UserEpisodeCardList,
  },
  mounted() {
    document.title = `Netflix - WatchLater`;

    UserApi.showWatchLater().then((res) => {
      this.Episodes = res.data.episodes;
      this.Movies = res.data.movies;
    });
  },
  methods: {
    clearwatchLater() {
      var result = confirm("Are you sure you want to delete Watch later?");
      if (result) {
        UserApi.deleteWatchLater().then((res) => {
          console.log(res.data);
          location.reload();
        });
      }
    },
  },
};
</script>

<style>
.WatchLater {
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
.WatchLater_body {
  margin-top: 200px;
}
.footer {
  margin-top: 470px;
}
.categories {
  padding-bottom: 40px;
}
.categories_card_bottom {
  display: flex;
  justify-content: space-around;
  text-align: center;
  background-color: #1f1f1f49;
  padding-bottom: 5px;
  transition: all 0.4s;
  opacity: 0;
}
.categories_card_bottom_icon {
  margin-top: 3px;
  border-radius: 40px;
  border: 1px solid lightgrey;
  width: fit-content;
  transition: all 0.35s;
}
.categories_card_bottom_icon:hover {
  background-color: #d81f26;
  color: #141414;
  border: 1px solid #141414;
}
.categories_card_main {
  object-fit: contain;
  transition: all 0.4s;
}
.categories_card_main:hover {
  transform: scale(1.09);
  padding: 10px;
  cursor: pointer;
}
.categories_card_main:hover .categories_card_bottom {
  opacity: 1;
  cursor: pointer;
}
</style>