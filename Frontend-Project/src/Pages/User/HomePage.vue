<template>
  <div class="HomePage">
    <div class="nav"><NavBar /></div>
    <div id="banner">
      <div id="banner__fadeLeft">
        <div id="banner__contents">
          <div id="Home_banner__contents_details">
            <h1 id="banner__title">{{ Banner_Movie.MovieName }}</h1>
            <div id="banner__buttons"></div>
            <div v-if="showAlert">
              <Alert />
            </div>
            <p id="banner__description">
              {{ Banner_Movie.Description }}
            </p>
          </div>
        </div>
        <div id="Home_banner__fadeBottom"></div>
      </div>
    </div>

    <div class="HomePage_body">
      <div class="body_content">
        <h3 class="Home_List_Title">Movies</h3>
        <HomeMovieCardList class="Home_List_Title" :data="movie_data" />

        <h3 class="Home_List_Title">Series</h3>
        <HomeSeriesCardList class="Home_List_Title" :data="series_data" />

        <h3 class="Home_List_Title">Adventure Movie</h3>
        <HomeMovieCardList class="Home_List_Title" :data="Adventure_movie" />

        <div v-if="Drama_Series.length > 0">
          <h3 class="Home_List_Title">Drama Series</h3>
          <HomeSeriesCardList class="Home_List_Title" :data="Drama_Series" />
        </div>

        <h3 class="Home_List_Title">Romentic movie</h3>
        <HomeMovieCardList class="Home_List_Title" :data="Romentic_movie" />

        <div v-if="Adventure_Series.length < 0">
          <h3 class="Home_List_Title">Adventure Series</h3>
          <HomeSeriesCardList
            class="Home_List_Title"
            :data="Adventure_Series"
          />
        </div>

        <div v-if="Crime_Mystry_Movies.length > 0">
          <h3 class="Home_List_Title">Crime Movie</h3>
          <HomeMovieCardList
            class="Home_List_Title"
            :data="Crime_Mystry_Movies"
          />
        </div>
      </div>
    </div>
    <div class="Home_footer"><Footer /></div>
  </div>
</template>

<script>
import NavBar from "../../components/NavBar.vue";
import Footer from "../../components/Footer.vue";
import MovieApi from "../../services/movie.service.js";
import SeriesApi from "../../services/series.service";
import UserApi from "../../services/user.service";
import swal from "sweetalert";
import HomeMovieCardList from "../../components/Movie/HomeMovieCardList.vue";
import HomeSeriesCardList from "../../components/Series/HomeSeriesCardList.vue";
import Alert from "../../components/AlertMessage.vue";
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
      showAlert: false,
    };
  },
  components: {
    NavBar,
    Footer,
    HomeMovieCardList,
    HomeSeriesCardList,
    Alert,
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
        .then(() => {
          swal("Successfully added to watch later!");
        })
        .catch((err) => {
          console.log(err.response.data.msg);
        });
    },


  },

  async created() {
    document.title = "Netflix - Home";
    // Banner _Movie
    await MovieApi.findMovieBySearch({
      queryperam: "_id",
      queryName: "19",
    }).then((res) => {
      let banner = document.getElementById("banner");
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
.Home_List_Title {
  margin-left: 70px;
}
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

#Home_banner__fadeBottom {
  margin-bottom: -600px;
  width: 100vw;
  height: 19.5rem;
  background: linear-gradient(
    180deg,
    transparent,
    rgba(37, 37, 37, 0.61),
    #111
  );
}
#Home_banner__contents_details {
  margin-top: -150px;
}
@media screen and (max-width: 788px) {
  .Home_List_Title {
    margin-left: 20px;
  }
  #banner__contents {
    height: 25% !important;
    width: 50vw !important;
  }
  #banner {
    height: 544px !important;
    color: white;
    object-fit: contain;
    background-position: center center;
    background-size: cover;
  }
  #Home_banner__contents_details {
    margin-top: -350px !important;
    margin-left: -50px;
  }
  #banner__title {
    font-family: "Netflix Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 1.5rem !important;
    font-weight: 100;
    padding-bottom: 0.3rem;
  }
  #banner__description {
    width: 45rem !important;
    line-height: 1.5;
    padding-top: 1rem;
    font-size: 0.9rem;
    max-width: 260px !important;
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
  #Home_banner__fadeBottom {
    margin-top: -75px;
    width: 100vw;
    height: 5.5rem;
    background: linear-gradient(
      180deg,
      transparent,
      rgba(37, 37, 37, 0.61),
      #111
    );
  }
}
</style>