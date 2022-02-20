<template>
  <div class="SeriesHomePage">
    <div class="nav"><NavBar /></div>

    <div class="body">
      <h2 class="d-flex justify-content-center series_title">Series</h2>
    </div>
    <div v-if="Allseries.length > 0">
      <h3 class="Home_List_Title">Series</h3>
      <SeriesCardList class="ms-5" :data="Allseries" />
    </div>

    <div v-if="Adventure_Series.length > 0">
      <h3 class="Home_List_Title">Adventure Series</h3>
      <SeriesCardList class="ms-5" :data="Adventure_Series" />
    </div>

    <div v-if="Drama_Series.length > 0">
      <h3 class="Home_List_Title">Drama Series</h3>
      <SeriesCardList class="ms-5" :data="Drama_Series" />
    </div>

    <div v-if="Thriller_Series.length > 0">
      <h3 class="Home_List_Title">Thriller Series</h3>
      <SeriesCardList class="ms-5" :data="Thriller_Series" />
    </div>

    <div v-if="Action_Series.length > 0">
      <h3 class="Home_List_Title">Action Series</h3>
      <SeriesCardList class="ms-5" :data="Action_Series" />
    </div>

    <div v-if="Horror_Series.length > 0">
      <h3 class="Home_List_Title">Horror Series</h3>
      <SeriesCardList class="ms-5" :data="Horror_Series" />
    </div>

    <div class="Series_footer"><Footer /></div>
  </div>
</template>

<script>
import NavBar from "../../components/NavBar.vue";
import Footer from "../../components/Footer.vue";
import SeriesApi from "../../services/series.service";
import SeriesCardList from "../../components/Series/SeriesCardList.vue";
export default {
  name: "SeriesHomePage",
  created() {
    document.title = `Netflix - AllSeries`;
  },
  data() {
    return {
      Allseries: [],
      Adventure_Series: [],
      Drama_Series: [],
      Thriller_Series: [],
      Action_Series: [],
      Horror_Series: [],
    };
  },
  components: {
    NavBar,
    Footer,
    SeriesCardList,
  },

  async mounted() {
    let Allseries_res = await SeriesApi.getAllSeries();
    this.Allseries = Allseries_res.data;

    this.Adventure_Series = this.Allseries.filter((series) => {
      return series.Genres.filter((g) => {
        if (g.GenresName === "Adventure") {
          return series;
        }
      })[0];
    });

    this.Drama_Series = this.Allseries.filter((series) => {
      return series.Genres.filter((g) => {
        if (g.GenresName === "Drama") {
          return series;
        }
      })[0];
    });

    this.Thriller_Series = this.Allseries.filter((series) => {
      return series.Genres.filter((g) => {
        if (g.GenresName === "Thriller") {
          return series;
        }
      })[0];
    });

    this.Action_Series = this.Allseries.filter((series) => {
      return series.Genres.filter((g) => {
        if (g.GenresName === "Action") {
          return series;
        }
      })[0];
    });

    this.Horror_Series = this.Allseries.filter((series) => {
      return series.Genres.filter((g) => {
        if (g.GenresName === "Horror fiction") {
          return series;
        }
      })[0];
    });
  },
};
</script>

<style scoped src="../../Style/card.css">
</style>
<style scoped>
.SeriesHomePage {
  width: 100vw;
  height: 100vh;
}

.nav {
  margin-top: 0px;
}
.Series_body {
  margin-top: 150px;
}
.Series_footer {
  margin-top: 150px;
}
.series_title {
  font-size: 3rem;
  font-weight: 800 !important;
  padding-bottom: 0.3rem;
}
@media screen and (max-width: 788px) {
  .series_title {
    margin-bottom:2rem;
    margin-top:-4rem;
  font-size: 2rem;
  font-weight: 800 !important;
  padding-bottom: 0.3rem;
}
}
</style>