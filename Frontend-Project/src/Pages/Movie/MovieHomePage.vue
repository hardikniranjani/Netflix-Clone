<template>
  <div class="MovieHomePage">
    <div class="nav"><NavBar /></div>
    <div class="body">
      <h2 class="d-flex justify-content-center movie_title">Movies</h2>
    </div>
    <div v-if="Adventure_Movies.length > 0">
       <Explore name="Adventure Movie"/>
      <MovieCardList class="Home_List_Title" :data="Adventure_Movies" />
    </div>

    <div v-if="Romantic_Movies.length > 0">
      <h3 class="Home_List_Title">Romantic Movie</h3>
      <MovieCardList class="Home_List_Title" :data="Romantic_Movies" />
    </div>

    <div v-if="Drama_Movies.length > 0">
      <h3 class="Home_List_Title">Drama Movie</h3>
      <MovieCardList class="Home_List_Title" :data="Drama_Movies" />
    </div>

    <div v-if="Crime_Mystry_Movies.length > 0">
      <h3 class="Home_List_Title">Crime Movie</h3>
      <MovieCardList class="Home_List_Title" :data="Crime_Mystry_Movies" />
    </div>

    <div v-if="Thriller_Movies.length > 0">
      <h3 class="Home_List_Title">Thriller Movie</h3>
      <MovieCardList class="Home_List_Title" :data="Thriller_Movies" />
    </div>

    <div v-if="Anime_Movies.length > 0">
      <h3 class="Home_List_Title">Anime Movies</h3>
      <MovieCardList class="Home_List_Title" :data="Anime_Movies" />
    </div>

    <div v-if="Action_Movies.length > 0">
      <h3 class="Home_List_Title">Action Movie</h3>
      <MovieCardList class="Home_List_Title" :data="Action_Movies" />
    </div>

    <div v-if="Comedy_Movies.length > 0">
      <h3 class="Home_List_Title">Comedy Movie</h3>
      <MovieCardList class="Home_List_Title" :data="Comedy_Movies" />
    </div>

    <div v-if="Fantasy_Movies.length > 0">
      <h3 class="Home_List_Title">Fantasy Movie</h3>
      <MovieCardList class="Home_List_Title" :data="Fantasy_Movies" />
    </div>

    <div v-if="Horror_Movies.length > 0">
      <h3 class="Home_List_Title">Horror Movie</h3>
      <MovieCardList class="Home_List_Title" :data="Horror_Movies" />
    </div>
    <div class="card-1 mt-5 mb-0 w-100"></div>
    <div class="movie_footer"><Footer /></div>
  </div>
</template>

<script>
import Explore from "../../components/Explore.vue"
import NavBar from "../../components/NavBar.vue";
import Footer from "../../components/Footer.vue";
import MovieApi from "../../services/movie.service";
import MovieCardList from "../../components/Movie/MovieCardList.vue";
export default {
  name: "MovieHomePage",
  created() {
    document.title = `Netflix - AllMovies`;
  },
  data() {
    return {
      AllMovies: [],
      Adventure_Movies: [],
      Romantic_Movies: [],
      Drama_Movies: [],
      Thriller_Movies: [],
      Crime_Mystry_Movies: [],
      Action_Movies: [],
      Comedy_Movies: [],
      Horror_Movies: [],
      Fantasy_Movies: [],
      Anime_Movies: [],
    };
  },
  components: {
    NavBar,
    Footer,
    MovieCardList,
    Explore
  },
  async mounted() {
    let Allmovies_res = await MovieApi.getAllMovie();
    this.AllMovies = Allmovies_res.data;
    this.Adventure_Movies = this.AllMovies.filter((mov) => {
      return mov.Genres.filter((g) => {
        if (g.GenresName === "Adventure") {
          return mov;
        }
      })[0];
    });

    this.Romantic_Movies = this.AllMovies.filter((mov) => {
      return mov.Genres.filter((g) => {
        if (g.GenresName === "Romance") {
          return mov;
        }
      })[0];
    });

    this.Drama_Movies = this.AllMovies.filter((mov) => {
      return mov.Genres.filter((g) => {
        if (g.GenresName === "Drama") {
          return mov;
        }
      })[0];
    });

    this.Crime_Mystry_Movies = this.AllMovies.filter((mov) => {
      return mov.Genres.filter((g) => {
        if (g.GenresName === "Crime and mystery") {
          return mov;
        }
      })[0];
    });

    this.Thriller_Movies = this.AllMovies.filter((mov) => {
      return mov.Genres.filter((g) => {
        if (g.GenresName === "Thriller") {
          return mov;
        }
      })[0];
    });

    this.Action_Movies = this.AllMovies.filter((mov) => {
      return mov.Genres.filter((g) => {
        if (g.GenresName === "Action") {
          return mov;
        }
      })[0];
    });

    this.Comedy_Movies = this.AllMovies.filter((mov) => {
      return mov.Genres.filter((g) => {
        if (g.GenresName === "Comedy") {
          return mov;
        }
      })[0];
    });

    this.Horror_Movies = this.AllMovies.filter((mov) => {
      return mov.Genres.filter((g) => {
        if (g.GenresName === "Horror fiction") {
          return mov;
        }
      })[0];
    });

    this.Fantasy_Movies = this.AllMovies.filter((mov) => {
      return mov.Genres.filter((g) => {
        if (g.GenresName === "Fantasy") {
          return mov;
        }
      })[0];
    });

    this.Anime_Movies = this.AllMovies.filter((mov) => {
      return mov.Genres.filter((g) => {
        if (g.GenresName === "Anime") {
          return mov;
        }
      })[0];
    });
  },
};
</script>

<style scoped src="../../Style/card.css">
</style>
<style scoped>
.card-1 {
  position: relative;
  display: inline-grid;
  grid-template-columns: 50% 40%;
  text-align: left;
  align-items: center;
  padding: 25px 45px 50px;
}
.MovieHomePage {
  width: 100%;
  height: 100%;
}
.nav {
  margin-top: 0px;
}
.Movie_body {
  margin-top: 200px;
}
.movie_footer {
  margin-top: 120px !important;
}
.movie_title {
  font-size: 3rem;
  font-weight: 800;
  padding-bottom: 0.3rem;
}
@media screen and (max-width: 788px) {
  .movie_title {
    margin-bottom: 2rem;
    margin-top: -4rem;
    font-size: 2rem;
    font-weight: 800 !important;
    padding-bottom: 0.3rem;
  }
}
</style>