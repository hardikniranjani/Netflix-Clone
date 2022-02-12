<template>
  <div class="WishList">
    <div class="nav"><NavBar /></div>
    <div class="WishList_body container">
      <div class="d-flex justify-content-between">
        <h2 class="text-center">My WishList</h2>
        <button
          class="btn btn-danger"
          style="background-color: #d81f26"
          @click="clearWishList()"
        >
          Clear List
        </button>
      </div>
      <div v-if="Movies.length > 0 || Series.length > 0">
        <span v-if="Movies.length > 0">
          <h4 class="mt-5">Movies</h4>
          <UserMovieCardList :data="Movies" />
        </span>
        <span v-if="Series.length > 0">
          <h4>Series</h4>
          <UserSeriesCardList :data="Series" />
        </span>
      </div>
      <div v-else>
        <h2 class="text-center mt-5" style="color: #d81f26">
          You Don't have List
        </h2>
      </div>
    </div>
    <div class="footer"><Footer /></div>
  </div>
</template>

<script>
import UserMovieCardList from "../../components/Movie/UserMovieCardList.vue";
import UserSeriesCardList from "../../components/Series/UserSeriesCardList.vue";
import NavBar from "../../components/NavBar.vue";
import Footer from "../../components/Footer.vue";
import UserApi from "../../services/user.service";

export default {
  name: "WishList",

  data() {
    return {
      MyList: [],
      Series: [],
      Movies: [],
    };
  },
  components: {
    NavBar,
    Footer,
    UserMovieCardList,
    UserSeriesCardList,
  },
  mounted() {
    document.title = `Netflix - MyWishList`;

    UserApi.getWishList().then((res) => {
      console.log(res.data);
      this.MyList = res.data;
      this.Series = res.data.series;
      this.Movies = res.data.movies;
    });
  },
  methods: {
    clearWishList() {
      var result = confirm("Are you sure you want to clear your list?");
      if (result) {
        UserApi.deleteWishList().then((res) => {
          console.log(res.data);
          location.reload();
        });
      }
    },
  },
};
</script>

<style>
.WishList {
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
.WishList_body {
  margin-top: 200px;
}
.footer {
  margin-top: 470px;
}
</style>