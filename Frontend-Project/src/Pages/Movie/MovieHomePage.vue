<template>
  <div class="MovieHomePage">
    <div class="nav"><NavBar /></div>
    <div class="body">
      <h2 class="text-center">Movie Home</h2>
    </div>
    <div v-if="Adventure_Movies.length > 0">
      <h3 class="mt-5">Adventure Movie</h3>
      <MovieCardList  :data="Adventure_Movies" />
    </div>

    <div v-if="Romantic_Movies.length > 0">
      <h3 class="mt-5">Romantic Movie</h3>
      <MovieCardList  :data="Romantic_Movies" />
    </div>

    <div v-if="Drama_Movies.length > 0">
      <h3 class="mt-5">Drama Movie</h3>
      <MovieCardList  :data="Drama_Movies" />
    </div>

    <div v-if="Crime_Mystry_Movies.length > 0">
      <h3 class="mt-5">Crime Movie</h3>
      <MovieCardList  :data="Crime_Mystry_Movies" />
    </div>

    <div v-if="Thriller_Movies.length > 0">
      <h3 class="mt-5">Thriller Movie</h3>
      <MovieCardList  :data="Thriller_Movies" />
    </div>

    <div v-if="Anime_Movies.length > 0">
      <h3 class="mt-5">Anime Movies</h3>
      <MovieCardList  :data="Anime_Movies" />
    </div>

    <div v-if="Action_Movies.length > 0">
      <h3 class="mt-5">Action Movie</h3>
      <MovieCardList  :data="Action_Movies" />
    </div>

    <div v-if="Comedy_Movies.length > 0">
      <h3 class="mt-5">Comedy Movie</h3>
      <MovieCardList  :data="Comedy_Movies" />
    </div>

    <div v-if="Fantasy_Movies.length > 0">
      <h3 class="mt-5">Fantasy Movie</h3>
      <MovieCardList  :data="Fantasy_Movies" />
    </div>

    <div v-if="Horror_Movies.length > 0">
      <h3 class="mt-5">Horror Movie</h3>
      <MovieCardList  :data="Horror_Movies" />
    </div>

    <div class="footer"><Footer /></div>
  </div>
</template>

<script>
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
  },
  async mounted() {
    let Allmovies_res = await MovieApi.getAllMovie();
    this.AllMovies = Allmovies_res.data;
    // console.log(Allmovies_res.data);
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
.footer {
  margin-top: 470px;
}
</style>