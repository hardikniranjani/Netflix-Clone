import Http from '../httpcommon';
import store from '../store'
const { token } = store.state;

export default new (class Genre_Service {
  getAllGenre() {
    return Http.get("/genre");
  }

  getGenre({ genre_id }) {
    return Http.get(`/genre/${genre_id}`);
  }

  createGenre(data) {
    return Http.post("/genre", data, {
      headers: {
        "x-access-token": token,
      },
    });
  }

  updateGenre({ genre_id, data }) {
    return Http.put(`/genre/${genre_id}`, data, {
      headers: {
        "x-access-token": token,
      },
    });
  }

  deleteGenre({ genre_id }) {
    return Http.put(
      `/genre/delete/${genre_id}`,
      {},
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
  }

  HardDeleteGenre({genre_id}){
      return Http.delete(`/genre/${genre_id}`, {
        headers: {
          "x-access-token": token,
        },
      });
  }
})();