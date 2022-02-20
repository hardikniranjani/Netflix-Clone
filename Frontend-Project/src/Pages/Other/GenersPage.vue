
<template>
  <div class="GenersPage">
    <div class="nav"><NavBar /></div>
    <div class="body">
      <h2 class="d-flex justify-content-center Geners_title">Genres</h2>

      <div class="AllGeners">
        <span
          class="AllGeners_inner ms-5 mt-5"
          v-for="i in Genres"
          :key="i._id"
        >
          <router-link
            style="text-decoration: none; color: inherit"
            :to="{ name: 'GenersContent', params: { id: i._id } }"
            ><SmallCard :Name="i.GenresName"
          /></router-link>
        </span>
      </div>
    </div>
    <div class="genres_footer"><Footer /></div>
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

.genres_footer {
  margin-top: 120px;
}
.Geners_title {
  font-size: 3rem;
  font-weight: 800;
  padding-bottom: 0.3rem;
}
@media screen and (max-width: 788px) {
  .AllGeners {
    margin-right: 50px;
    align-items: center;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    text-decoration: none;
  }
  .Geners_title {
    margin-bottom: 2rem;
    margin-top: -4rem;
    font-size: 2rem;
    font-weight: 800 !important;
    padding-bottom: 0.3rem;
  }
}
</style>