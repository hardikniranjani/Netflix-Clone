import Http from "../httpcommon";
import store from "../store";
const { token } = store.state;

export default new (class Season_Service {
  getAllSeason(series_id) {
    return Http.get(`/season/${series_id}`);
  }

  getAnSeason(series_id, season_id) {
    return Http.get(`/season/${series_id}/${season_id}`);
  }

  findSeasonAndSort({ filter, series_id, order }) {
    return Http.get(
      `/season/sort?series_id=${series_id}&filter=${filter}&order=${order}`
    );
  }

  findseasionBySearch({ queryperam, queryName, series_id }) {
    return Http.get(
      `/season/search?series_id=${series_id}&item1=${queryperam}&item=${queryName}`
    );
  }

  createSeason(season_data, series_id) {
    return Http.post(`/season/${series_id}`, season_data, {
      headers: {
        "x-access-token": token,
      },
    });
  }

  updateSeason(series_id, data, season_number) {
    return Http.put(`season/${series_id}?SeasonNumber=${season_number}`, data, {
      headers: {
        "x-access-token": token,
      },
    });
  }

  deleteAnseason({ series_id, season_id }) {
    return Http.put(`/season/${series_id}/${season_id}`, {
      headers: {
        "x-access-token": token,
      },
    });
  }

  getAllEpisodesOfSeason({ series_id, season_id }) {
    return Http.get(`Episode/${series_id}/${season_id}`, {
      headers: {
        "x-access-token": token,
      },
    });
  }

  getAnEpisodeOfSeason({ season_id, Episode_id }) {
    return Http.get(`/Episode/${season_id}/${Episode_id}`, {
      headers: {
        "x-access-token": token,
      },
    });
  }
})();
