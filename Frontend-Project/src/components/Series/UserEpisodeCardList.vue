<template>
  <div class="categories">
    <div class="categories_card_main" v-for="i in data" :key="i">
      <router-link
        :to="{
          name: 'EpisodeVideo',
          params: {
            id: i.seriesid,
            episodeid: i._id,
            seasonid: i.seasonid,
          },
        }"
      >
        <img class="Episode_WatchHistory_categories_card" :src="i.Banner" />
      </router-link>
      <h7 class="categories_card_bottom">{{ i.episode_name }}</h7>
      <div class="categories_card_bottom">
        <div class="categories_card_bottom_icon">
          <div v-if="i.WatchHistory_id">
            <CloseIcon v-on:click="removeHistory(i._id)" />
          </div>
          <div v-else-if="i.WatchLater_id">
            <CloseIcon v-on:click="removeWatchLater(i._id)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserApi from "../../services/user.service";
import { CloseIcon } from "@iconicicons/vue";
export default {
  name: "UserEpisodeCardList",
  data() {
    return {
      type: "Episode",
    };
  },
  components: {
    CloseIcon,
  },
  props: {
    data: Array,
    seasonid: String,
    episodeid: String,
  },
  methods: {
    async removeHistory(data1) {
      await UserApi.removeFromHistory({
        media_id: data1,
        media_type: this.type,
      })
        .then(() => {
          location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    },

    async removeWatchLater(data1) {
      await UserApi.removeFromWatchLater({
        media_id: data1,
        media_type: this.type,
      })
        .then(() => {
          location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
  },
};
</script>

<style>
.categories {
  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;
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
.Episode_WatchHistory_categories_card {
  object-fit: contain;
  max-width: 210px;
  max-height: 250px;
}
.categories_card_bottom {
  display: flex;
  justify-content: space-around;
  text-align: center;
  background-color: #1f1f1f49;
  padding-bottom: 5px;
  transition: all 0.4s;
  opacity: 0;
}
.categories_card_bottom_icon {
  margin-top: 3px;
  border-radius: 40px;
  border: 1px solid lightgrey;
  width: fit-content;
  transition: all 0.35s;
}
.categories_card_bottom_icon:hover {
  background-color: #d81f26;
  color: #141414;
  border: 1px solid #141414;
}

.categories_card_main:hover .categories_card_bottom {
  opacity: 1;
  cursor: pointer;
}
</style>