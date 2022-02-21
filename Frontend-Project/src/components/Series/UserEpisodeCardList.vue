<template>
  <carousel :settings="settings" :breakpoints="breakpoints" :wrap-around="true">
    <slide class="categories_card_main ms-3 me-3" v-for="i in data" :key="i">
      <div class="carousel__item">
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
          <img class="Episode_categories_card" :src="i.Banner" />
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
    </slide>
    <template #addons>
      <navigation />
    </template>
  </carousel>
</template>

<script>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Navigation } from "vue3-carousel";
import UserApi from "../../services/user.service";
import { CloseIcon } from "@iconicicons/vue";
export default {
  name: "UserEpisodeCardList",
  data() {
    return {
      type: "Episode",
      settings: {
        itemsToShow: 4,
        snapAlign: "center",
      },
      breakpoints: {
        // 300px and up
        300: {
          itemsToShow: 1.4,
          snapAlign: "start",
        },
        // 375px and up
        375: {
          itemsToShow: 1.6,
          snapAlign: "start",
        },
        // 390px and up
        390: {
          itemsToShow: 1.7,
          snapAlign: "start",
        },
        // 400px and up
        400: {
          itemsToShow: 1.8,
          snapAlign: "start",
        },
        // 500px and up
        500: {
          itemsToShow: 2.3,
          snapAlign: "start",
        },
        // 600px and up
        600: {
          itemsToShow: 2.7,
          snapAlign: "start",
        },
        // 700px and up
        700: {
          itemsToShow: 3.2,
          snapAlign: "start",
        },
        // 768px and up
        768: {
          itemsToShow: 3.4,
          snapAlign: "start",
        },
        // 800px and up
        800: {
          itemsToShow: 3.4,
          snapAlign: "start",
        },
        // 900px and up
        900: {
          itemsToShow: 3.9,
          snapAlign: "start",
        },
        // 1024 and up
        1024: {
          itemsToShow: 4.4,
          snapAlign: "start",
        },
        // 1366 and up
        1366: {
          itemsToShow: 5.9,
          snapAlign: "start",
        },
        // 1440 and up
        1440: {
          itemsToShow: 6.3,
          snapAlign: "start",
        },
        // 2560 and up
        2560: {
          itemsToShow: 11,
          snapAlign: "start",
        },
      },
    };
  },
  components: {
    CloseIcon,
    Carousel,
    Slide,
    Navigation,
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
.carousel__item {
  max-height: 200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  color: white;
  background-color: #1f1f1f6b;
  border-radius: 0px;
  width: 5%;
  height: 66%;
  border: none;
}
.carousel__prev {
  margin-top: -21px;
  margin-left: 35px;
}
.carousel__next {
  
  margin-top: -21px;
  margin-right: 30px;
}
/* .carousel__next,
.carousel__prev {
opacity: 0;
}
.carousel__next:hover,
.carousel__prev:hover {
  opacity: 1;
} */

.carousel__prev--in-active,
.carousel__next--in-active {
  display: none !important;
}
</style>


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
.Episode_categories_card {
  object-fit: contain;
  max-width: 210px;
  max-height: 120px;
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
  .episode_categories {
    padding-bottom: 0px;
    padding-top: 10px;
  }
}
</style>