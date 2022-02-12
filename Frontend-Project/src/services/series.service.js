import Http from "../httpcommon";
import store from "../store";
const { token } = store.state;

export default new (class Series_Service {
  getAllSeries() {
    return Http.get("/series");
  }

  getSeries(series_id) {
    return Http.get(`/series/${series_id}`);
  }

  findSeriesAndSort({ filter, ascending }) {
    return Http.get(
      `/series/sort/series?filter=${filter}&ascending=${ascending}`
    );
  }

  findSeriesBySearch({ queryperam, queryName }) {
    return Http.get(
      `/series/search/series?item1=${queryperam}&item=${queryName}`
    );
  }

  createSeries(series_data) {
    return Http.post("/series", series_data, {
      headers: {
        "x-access-token": token,
      },
    });
  }

  updateSeries(series_id, updated_series_data) {
    return Http.put(`/series/${series_id}`, updated_series_data, {
      headers: {
        "x-access-token": token,
      },
    });
  }

  deleteSeries(series_id) {
    return Http.put(
      `/series/delete/${series_id}`,
      {},
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
  }

  HardDeleteSeries(series_id) {
    return Http.delete(
      `/series  /${series_id}`,
      {},
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
  }
})();
