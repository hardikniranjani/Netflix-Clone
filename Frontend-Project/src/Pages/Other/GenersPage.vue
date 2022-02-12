
<template>
  <div class="GenersPage">
    <div class="nav"><NavBar /></div>
    <div class="body">
      <h2 class="display-3 mt-0">Genres</h2>

      <div class="AllGeners">
        <span
          class="AllGeners_inner ms-5 mt-5"
          v-for="i in Genres"
          :key="i._id"
        >
          <router-link  style="text-decoration: none; color: inherit;" :to="{ name: 'GenersContent', params: { id: i._id } }"
            ><SmallCard :Name="i.GenresName"
          /></router-link>
        </span>
      </div>
    </div>
    <div class="footer"><Footer /></div>
  </div>
</template>

<script>
import SmallCard from "../../components/smallCard.vue";
import NavBar from "../../components/NavBar.vue";
import Footer from "../../components/Footer.vue";

import GenreApi from "../../services/genre.service";
export default {
  name: "GenersPage",
  created() {
    document.title = `Netflix - AllGenres`;
  },
  data() {
    return {
      Genres: [],
    };
  },
  components: {
    NavBar,
    Footer,
    SmallCard,
  },
  async mounted() {
    let genres_res = await GenreApi.getAllGenre();
    console.log(genres_res);
    this.Genres = genres_res.data;
  },
};
</script>

<style>
.GenersPage {
  width: 100%;
  height: 100%;
}
.AllGeners {
  display: flex;
  flex-wrap: wrap;
  text-decoration: none;
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