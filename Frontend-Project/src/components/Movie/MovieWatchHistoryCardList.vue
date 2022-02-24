<template>

  <carousel :settings="settings" :breakpoints="breakpoints">
    <slide class="categories_card_main" v-for="i in Movies" :key="i">
      <div class="carousel__item">
        <router-link
        class="Home_Movie_categories_card_bottom_icon"
        :to="{
          name: 'MovieVideo',
          params: { id: i._id },
        }"
      >
           <img
          class="Movie_WatchHistory_categories_card"
          :src="i.backdrop_path"
        />
        </router-link>
        <div class="categories_card_bottom">
          <div class="categories_card_bottom_icon">
            <CloseIcon v-on:click="removeHistory(i._id)" />
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
import MovieApi from "../../services/movie.service";
import { CloseIcon } from "@iconicicons/vue";
export default {
  name: "MovieWatchHistoryCardList",
  data() {
    return {
      type: "Movies",
      Movies: [],
            settings: {
        itemsToShow: 1,
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
          itemsToShow: 4.9,
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
  },
  mounted() {
    this.addMovieData();
  },
  watch: {
    data() {
      this.addMovieData();
    },
  },
  methods: {
    async addMovieData() {
      this.Movies = [];
      this.data.forEach((obj) => {
        MovieApi.getMovie(obj)
          .then((res) => res.data)
          .then((res) => {
            this.Movies.push(res);
          });
      });
    },

    async removeHistory(data) {
      await UserApi.removeFromHistory({
        media_id: data,
        media_type: this.type,
      })
        .then((res) => {
          this.$store.dispatch("ADD_HISTORY", res.data.list);
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
  },
};
</script>

    <style scoped>
.carousel__item {
  max-height: 300px;
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
  border-radius: 10px;
  width: 5%;
  height: 200% !important;
  border: none;
}
.carousel__prev {
  opacity: 0;
  margin-top: -51px;
  margin-left: 35px;
}
.carousel__next {
  opacity: 0;
  margin-top: -21px;
  margin-right: 30px;
}
.carousel__next:hover,
.carousel__prev:hover {
  opacity: 1;
}

.carousel__prev--in-active,
.carousel__next--in-active {
  display: none !important;
}
</style>

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
.Movie_WatchHistory_categories_card {
  object-fit: contain;
  max-width: 210px;
  max-height: 250px;
}
.categories_card_bottom {
  display: flex;
  width: 100% !important;
  justify-content: space-around;
  text-align: center;
  background-color: #1f1f1f00 !important;
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