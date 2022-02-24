import Http from "../httpcommon";
import store from "../store/index";
const { token } = store.state;
export default new (class Movie_Service {
  createAnMovie(movie_data) {
    return Http.post("/movies", movie_data, {
      headers: {
        "x-access-token":  store.state.token,
      },
    });
  }

  getAllMovie() {
    return Http.get("/movies", {
      headers: {
        "x-access-token": token,
      },
    });
  }

  getMovie(movie_id) {
    return Http.get(`/movies/${movie_id}`, {
      headers: {
        "x-access-token": token,
      },
    });
  }

  findMovieBySort({ filter, ascending }) {
    return Http.get(
      `/movies/sorting/movie?filter=${filter}&ascending=${ascending}`,
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
  }

  findMovieBySearch({ queryperam, queryName }) {
    return Http.get(
      `/movies/search/movie?item1=${queryperam}&item=${queryName}`,
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
  }

  uploadMovieImage(movie_id,media_field, formdata) {
    return Http.post(`/movies/upload/image?movie_id=${movie_id}&media_field=${media_field}`, formdata, {
      headers: {
        "x-access-token": store.state.token,
      },
    });
  }

  uploadMovieVideo(movie_id, formdata) {
    return Http.post(`/movies/upload/video?movie_id=${movie_id}`, formdata, {
      headers: {
        "x-access-token":  store.state.token,
      },
    });
  }

  updateMovie(movie_id) {
    return Http.put(
      `/movies/${movie_id}`,
      {},
      {
        headers: {
          "x-access-token":  store.state.token,
        },
      }
    );
  }

  deleteMovie(movie_id) {
    return Http.put(
      `/movies/delete/${movie_id}`,
      {},
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
  }

  HardDeleteMovie(movie_id) {
    return Http.put(
      `/movies/${movie_id}`,
      {},
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
  }
})();
