import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  plugins: [createPersistedState()],

  state: {
    token: "",
    user: {},
    avatar: "",
    // movies:{},
    // series:{},
  },
  mutations: {
    ADD_TOKEN(state, tokenValue) {
      state.token = tokenValue;
    },
    ADD_USER(state, userData) {
      state.user = { ...userData };
    },
    ADD_HISTORY(state, historyData) {
      state.user.watchHistory = historyData;
    },
    REMOVE_TOKEN(state) {
      state.token = "";
      state.user = {};
      state.avatar = "";
    },
    AVATAR(state, avatarData) {
      state.avatar = avatarData;
    },

    ADD_WATCH_LATER(state, list) {
      state.user.watchLater = list;
    },
    ADD_WISH_LIST(state, list) {
      state.user.wishlist = list;
    },
  },
  actions: {
    ADD_TOKEN({ commit }, token) {
      commit("ADD_TOKEN", token);
    },
    ADD_USER({ commit }, userData) {
      commit("ADD_USER", userData);
    },
    REMOVE_TOKEN({ commit }) {
      commit("REMOVE_TOKEN");
    },
    AVATAR({ commit }, svg) {
      commit("AVATAR", svg);
    },
    ADD_HISTORY({ commit }, history) {
      commit("ADD_HISTORY", history);
    },

    ADD_WATCH_LATER({ commit }, list) {
      commit("ADD_WATCH_LATER", list);
    },
    ADD_WISH_LIST({ commit }, list) {
      commit("ADD_WISH_LIST", list);
    },
    // MOVIES({commit},movie_res){
    //   commit("MOVIES",movie_res);
    // },
    // SERIES({commit},series_res){
    //   commit("SERIES",series_res);
    // },
  },
  getters: {
    HistoryMovies(state) {
      if (state.user.watchHistory) {
        let Movies = state.user.watchHistory.Movies;
        if (Movies.length > 0) {
          return state.user.watchHistory.Movies.map((obj) => obj._id);
        } else return [];
      } else return [];
    },
    HistoryEpisodes(state) {
      if (state.user.watchHistory) {
        let Episodes = state.user.watchHistory.Episode;
        if (Episodes.length > 0) {
          return state.user.watchHistory.Episode.map(({ _id }) => {
            return {
              _id: _id._id,
              WatchHistory_id: _id._id,
              seasonid: _id.SeasonID,
              seriesid: _id.SeriesID._id,
              Banner: _id.Banner,
              episode_name: _id.EpisodeName,
            };
          });
        } else return [];
      } else return [];
    },
    availableInWishList: function (state) {
      return (id, media_type) => {
        if (state.user.wishlist) {
          return state.user.wishlist[media_type].includes(id);
        } else return false;
      };
    },
    availableInWatchLater: function (state) {
      return (id, media_type) => {
        if (state.user.watchLater) {
          return state.user.watchLater[media_type].includes(id);
        } else return false;
      };
    },
    mediaDuration: function (state) {
      return (id, media_type) => {
        let mediaObj = state.user.watchHistory[media_type].filter(
          (obj) => obj._id == id
        );
        if (mediaObj.length > 0) {
          let duration = parseInt(
            JSON.parse(JSON.stringify(mediaObj))[0]["duration"]
          );
          return duration === undefined ? 0 : duration;
        } else return 0;
      };
    },
  },
});
