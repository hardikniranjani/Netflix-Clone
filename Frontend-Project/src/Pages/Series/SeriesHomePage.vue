<template>
  <div class="SeriesHomePage">
    <div class="nav"><NavBar /></div>

    <div class="body">
      <h2 class="text-center">Series Home</h2>
      
    </div>
    <div v-if="Allseries.length > 0">
      <h3 class="mt-5">Series</h3>
      <SeriesCardList :data="Allseries" />
    </div>

    <div v-if="Adventure_Series.length > 0">
      <h3 class="mt-5">Adventure Series</h3>
      <SeriesCardList :data="Adventure_Series" />
    </div>

    <div v-if="Drama_Series.length > 0">
      <h3 class="mt-5">Drama Series</h3>
      <SeriesCardList :data="Drama_Series" />
    </div>

    <div v-if="Thriller_Series.length > 0">
      <h3 class="mt-5">Thriller Series</h3>
      <SeriesCardList :data="Thriller_Series" />
    </div>

    <div v-if="Action_Series.length > 0">
      <h3 class="mt-5">Action Series</h3>
      <SeriesCardList :data="Action_Series" />
    </div>

    <div v-if="Horror_Series.length > 0">
      <h3 class="mt-5">Horror Series</h3>
      <SeriesCardList :data="Horror_Series" />
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
</style>