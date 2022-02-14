<template>
  <div class="episode_categories">
    <div
      class="categories_card_main"
      v-for="episode in data"
      :key="episode._id"
    >
      <div class="Episode_categories_card_main_background">
        <router-link
          :to="{
            name: 'EpisodeVideo',
            params: {
              id: episode.SeriesID,
              episodeid: episode._id,
              seasonid: episode.SeasonID,
            },
          }"
        >
          <img class="Series_categories_card" :src="episode.Banner" />
        </router-link>
      </div>
      <div class="categories_card_bottom_main">
        <h7 class="categories_card_bottom">{{ episode.EpisodeName }}</h7>
        <div class="categories_card_bottom">
          <!-- <i
            class="bi bi-play-circle-fill Episode_categories_card_bottom_icon"
          ></i> -->
          <i
            class="bi bi-plus-circle Movie_categories_card_bottom_icon"
            v-on:click="addToWatchLater(episode._id)"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserApi from "../../services/user.service";
import swal from "sweetalert";
export default {
  name: "SeriesCardList",
  data() {
    return {
      media_type: "Episode",
    };
  },
  props: {
    // src: String,
    data: Array,
  },

  methods: {
    async addToWatchLater(episode_id) {
      await UserApi.addToWatchLater({
        media_type: this.media_type,
        media_id: episode_id,
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
};
</script>

<style>
.episode_categories {
  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;
}
.episode_categories {
  padding-bottom: 10px;
  padding-top: 10px;
}
.categories_card_main {
  object-fit: contain;
  transition: all 0.4s;
}
.categories_card_main:hover {
  transform: scale(1.09);
  padding: 10px;
  cursor: pointer;
}
.Episode_categories_card_main_background {
  overflow: hidden;
}
.Series_categories_card {
  object-fit: contain;
  max-width: 210px;
  max-height: 250px;
}

.categories_card_bottom_main {
  overflow-wrap: break-word;
  overflow: hidden;
}
.categories_card_bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  text-align: center;
  background-color: #1f1f1f49;
  padding-bottom: 5px;
  transition: all 0.4s;
  opacity: 0;
}

.Episode_categories_card_bottom_icon {
  margin-top: 8px;
  margin-bottom: 5px;
  width: fit-content;
  transition: all 0.35s;
}
.Episode_categories_card_bottom_icon:hover {
  color: #d81f26;
}

.categories_card_main:hover .categories_card_bottom {
  opacity: 1;
  cursor: pointer;
}

@media screen and (max-width: 788px) {
  .episode_categories{
    padding-bottom: 0px;
  padding-top: 10px;
  }
}
</style>