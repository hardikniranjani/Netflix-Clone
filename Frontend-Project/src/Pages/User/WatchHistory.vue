<template>
  <div class="WatchHistory">
    <div class="nav"><NavBar /></div>
    <div class="WatchHistory_body container">
      <div class="d-flex justify-content-between">
        <h2 class="text-center">Watch History</h2>
        <button
          class="btn btn-danger"
          style="background-color: #d81f26"
          @click="clearWatchHistory()"
        >
          Clear History
        </button>
      </div>
      <div v-if="Movies.length > 0 || Episodes.length > 0">
        <span v-if="Movies.length > 0">
          <h4 class="mt-5">Movies</h4>
          <MovieWatchHistoryCardList :data="Movies" />
        </span>
        <span v-if="Episodes.length > 0">
          <h4>Episodes</h4>
          <EpisodeCardList :data="Episodes" />
        </span>
      </div>
      <div v-else>
        <h2 class="text-center mt-5" style="color: #d81f26">
          You don't have WatchHistory
        </h2>
      </div>
    </div>
    <div class="footer"><Footer /></div>
  </div>
</template>

<script>
import NavBar from "../../components/NavBar.vue";
import Footer from "../../components/Footer.vue";
import { mapGetters } from "vuex";
import UserApi from "../../services/user.service";
import MovieWatchHistoryCardList from "../../components/Movie/MovieWatchHistoryCardList.vue";
import EpisodeCardList from "../../components/Series/EpisodeCardList.vue";

export default {
  name: "WatchHistory",

  methods: {
    getUserHistory() {
      UserApi.showWatchHistory().then((res) => {
        console.log(res.data);
        this.$store.dispatch("ADD_HISTORY", res.data);
      });
    },

    clearWatchHistory() {
      var result = confirm("Want to delete watch history?");
      if (result) {
        UserApi.deleteWatchHistory().then((res) => {
          location.reload();
          console.log(res.data);
        });
      }
    },
  },
  mounted() {
    document.title = `Netflix - WatchHistory`;
    console.log(this.Movies);
  },
  components: {
    NavBar,
    Footer,
    MovieWatchHistoryCardList,
    EpisodeCardList,
  },

  computed: {
    ...mapGetters({
      Movies: "HistoryMovies",
      Episodes: "HistoryEpisodes",
    }),
  },
};
</script>

<style>
.WatchHistory {
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
.WatchHistory_body {
  margin-top: 200px;
}
.footer {
  margin-top: 470px;
}
</style>