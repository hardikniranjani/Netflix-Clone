import Http from "../httpcommon";
import store from "../store";
const { token } = store.state;
export default new (class Episode_Service {
  getEpisode() {
    return Http.get(`/episode`);
  }

  findEpisodeAndSort({ series_id, season_id, queryperam, ascending }) {
    return Http.get(
      `episode/sort?series_id=${series_id}&season_id=${season_id}&filter=${queryperam}&ascending=${ascending}`
    );
  }

  findEpisodeBySearch({ series_id, season_id, queryperam, queryName }) {
    return Http.get(
      `/episode/search?series_id=${series_id}&season_id=${season_id}&item1=${queryperam}&item=${queryName}`
    );
  }

  uploadEpisodeImage(episode_id, formdata) {
    return Http.post(`/episode?episode_id=${episode_id}`, formdata, {
      headers: {
        "x-access-token": token,
      },
    });
  }

  uploadEpisodeVideo(episode_id, formdata) {
    return Http.post(`/episode?episode_id=${episode_id}`, formdata, {
      headers: {
        "x-access-token": token,
      },
    });
  }

  createEpisode(episode_data) {
    return Http.post("/episode", episode_data, {
      headers: {
        "x-access-token": token,
      },
    });
  }

  createMultiEpisode(episode_data_array, season_id) {
    return Http.post(
      `/episode/multiepisode?season_id=${season_id}`,
      episode_data_array,
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
  }

  softDeleteBulkEpisode(episode_data_array, season_id) {
    return Http.put(
      `episode/bulk_soft_delete?season_id=${season_id}`,
      episode_data_array,
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
  }

  hardDeleteBulkEpisode(season_id, episode_data_array) {
    return Http.delete(
      `/episode/bulk_hard_delete?season_id=${season_id}`,
      episode_data_array,
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
  }

  updateEpisode({ season_id, series_id, episode_id }, episode_data) {
    return Http.put(
      `/episode/update?season_id=${season_id}&series_id=${series_id}&episode_id=${episode_id}`,
      episode_data,
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
  }

  updateBulkEpisode({ season_id , series_id,episode_data_array}) {
    return Http.put(`/episode/bulk_update?season_id=${season_id}&series_id=${series_id}`, episode_data_array);
  }
})();
