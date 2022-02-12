<template>
  <div class="HomePage">
    <div class="nav"><NavBar /></div>
    <header id="banner">
      <div id="banner__contents">
        <div id="banner__contents_details">
          <h1 id="banner__title">{{ Banner_Movie.MovieName }}</h1>
          <div id="banner__buttons">
            <!-- <button id="banner__button">Go to Movie</button> -->
            <button id="banner__button" v-on:click="addToWatchLater()">
              Watch Later
            </button>
          </div>
          <p id="banner__description">
            {{ Banner_Movie.Description }}
          </p>
        </div>
      </div>
      <div id="banner__fadeBottom"></div>
    </header>

    <div class="HomePage_body">
      <div class="body_content">
        <h3>Movies</h3>
        <HomeMovieCardList :data="movie_data" />

        <h3 class="mt-5">Series</h3>
        <HomeSeriesCardList :data="series_data" />

        <h3 class="mt-5">Adventure Movie</h3>
        <HomeMovieCardList :data="Adventure_movie" />

        <div v-if="Drama_Series.length > 0">
          <h3 class="mt-5">Drama Series</h3>
          <HomeSeriesCardList :data="Drama_Series" />
        </div>

        <h3 class="mt-5">Romentic movie</h3>
        <HomeMovieCardList :data="Romentic_movie" />

        <div v-if="Adventure_Series.length > 0">
          <h3 class="mt-5">Adventure Series</h3>
          <HomeSeriesCardList :data="Adventure_Series" />
        </div>
        
        <div v-if="Crime_Mystry_Movies.length > 0">
          <h3 class="mt-5">Crime Movie</h3>
          <HomeMovieCardList :data="Crime_Mystry_Movies" />
        </div>
      </div>
    </div>
    <div class="Home_footer"><Footer /></div>
  </div>
</template>

<script>
// import MovieBanner from "../../components/Movie/Movie_Banner.vue";
import NavBar from "../../components/NavBar.vue";
import Footer from "../../components/Footer.vue";
import MovieApi from "../../services/movie.service.js";
import SeriesApi from "../../services/series.service";
import UserApi from "../../services/user.service";
import swal from "sweetalert";
import HomeMovieCardList from "../../components/Movie/HomeMovieCardList.vue";
import HomeSeriesCardList from "../../components/Series/HomeSeriesCardList.vue";
export default {
  name: "HomePage",
  data() {
    return {
      movie_data: [],
      series_data: [],
      Adventure_movie: [],
      Romentic_movie: [],
      Drama_Series: [],
      Adventure_Series: [],
      Crime_Mystry_Movies: [],
      Banner_Movie: {},
      src: "",
      Banner_src: "",
      media_type: "Movies",
    };
  },
  components: {
    NavBar,
    Footer,
    HomeMovieCardList,
    HomeSeriesCardList,
    // MovieBanner
  },
  props: {
    id: String,
  },

  methods: {
    async addToWatchLater() {
      await UserApi.addToWatchLater({
        media_type: this.media_type,
        media_id: this.Banner_Movie._id,
      })
        .then((res) => {
          console.log(res, "line 58 movie banner");
          swal("Successfully added to watch later!");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  async created() {
    document.title = "Netflix - Home";

    // Banner _Movie
    await MovieApi.findMovieBySearch({
      queryperam: "_id",
      queryName: "17",
    }).then((res) => {
      var banner = document.getElementById("banner");
      banner.style.backgroundImage = "url(" + res.data[0].backdrop_path + ")";
      this.Banner_Movie = res.data[0];
      this.src = res.data[0].Video_path;
      this.Banner_src = res.data[0].backdrop_path;
    });

    // movie data +++
    let movie_res = await MovieApi.getAllMovie();
    this.movie_data = movie_res.data;

    // series data +++
    let series_res = await SeriesApi.getAllSeries();
    this.series_data = series_res.data;

    // Adventure_movie +++
    this.Adventure_movie = movie_res.data.filter((mov) => {
      return mov.Genres.filter((g) => {
        if (g.GenresName === "Adventure") {
          return mov;
        }
      })[0];
    });

    // Drama_Series +++
    this.Drama_Series = series_res.data.filter((series) => {
      return series.Genres.filter((g) => {
        if (g.GenresName === "Drama") {
          return series;
        }
      })[0];
    });

    // Romentic_movie +++
    this.Romentic_movie = movie_res.data.filter((mov) => {
      return mov.Genres.filter((g) => {
        if (g.GenresName === "Romance") {
          return mov;
        }
      })[0];
    });

    // Adventure_Series +++
    this.Adventure_Series = series_res.data.filter((series) => {
      return series.Genres.filter((g) => {
        if (g.GenresName === "Adventure") {
          return series;
        }
      })[0];
    });

    // Crime_Mystry_Movies +++
    this.Crime_Mystry_Movies = movie_res.data.filter((mov) => {
      return mov.Genres.filter((g) => {
        if (g.GenresName === "Crime and mystery") {
          return mov;
        }
      })[0];
    });
  },
};
</script>

<style scoped src="../../Style/Banner.css">
</style>
<style >
.HomePage {
  width: 100vw;
  height: 100%;
  overflow-x: hidden;
}
.nav {
  margin-top: 0px;
}
.HomePage_body {
  margin-top: 0px;
}
.Home_footer {
  margin-top: 50px;
}
.body_content {
  margin-top: -100px;
}

@media screen and (max-width: 788px) {
  #banner__contents {
    height: 25%;
    width: 50vw;
  }
  #banner {
    height: 25%;
    width: 100vw;
  }
  #banner__title {
    font-size: 10px;
    font-weight: 500;
    padding-bottom: 0.3rem;
  }
  #banner__description {
    width: 45rem;
    line-height: 1.5;
    padding-top: 1rem;
    font-size: 0.9rem;
    max-width: 260px;
    height: 100px;
    overflow: hidden;
  }
  #banner__button {
    cursor: pointer;
    color: white;
    outline: none;
    border: none;
    font-weight: 500;
    border-radius: 0.2vw;
    padding-left: 2rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding-right: 2rem;
    margin-right: 1rem;
    padding-top: 0.5rem;
    background-color: rgba(51, 51, 51, 0.5);
    padding-bottom: 0.5rem;
  }
}
</style>