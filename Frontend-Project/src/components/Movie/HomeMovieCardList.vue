<template>
  <carousel :settings="settings" :breakpoints="breakpoints">
    <slide class="categories_card_main_movie" v-for="i in data" :key="i">
      <div class="carousel__item">
        <router-link :to="{ name: 'MoviePage', params: { id: i._id } }">
          <img class="Home_Movie_categories_card" :src="i.backdrop_path" />
        </router-link>
        <IconComponent :media_type="this.media_type" :id="i._id" />
      </div>
    </slide>
    <template #addons>
      <navigation />
    </template>
  </carousel>
</template>

<script>
import IconComponent from "../../components/IconComponent.vue"
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Navigation } from "vue3-carousel";
import UserApi from "../../services/user.service";
import swal from "sweetalert";
export default {
  name: "HomeMovieCardList",
  data() {
    return {
      media_type: "Movies",
      settings: {
        itemsToShow: 6.1,
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
  props: {
    id: String,
    data: Array,
  },
  components: {
    Carousel,
    Slide,
    Navigation,
     IconComponent
  },
  methods: {
    Mynotification(text, type) {
      this.$notify({
        text: text,
        type: type,
        duration: 5000,
        speed: 1000,
      });
    },
    async addToWishList(movie_id) {
      await UserApi.addToWishList({
        media_type: this.media_type,
        media_id: movie_id,
      })
        .then(() => {
          this.Mynotification("Successfully added to wish list!", "success");
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async addToWatchLater(movie_id) {
      await UserApi.addToWatchLater({
        media_type: this.media_type,
        media_id: movie_id,
      })
        .then(() => {
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
  height: 90% !important;
  border: none;
}
.carousel__prev {
  opacity: 0;
  margin-top: -5px !important;
  margin-left: 35px;
}
.carousel__next {
  opacity: 0;
  margin-top: -5px !important;
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
.span {
  color: red;
}
.categories_movie {
  display: flex;
  padding-left: 50px;
}
.categories_card_main_movie {
  object-fit: contain;
  width: min-content;
  transition: transform 500ms;
}
.categories_card_main_movie:hover {
  transform: scale(1.08);
  /* padding: 10px; */
  cursor: pointer;
}
.Home_Movie_categories_card {
  object-fit: cover;
  width: 210px;
  height: 120px;
}
.categories_card_bottom {
  width: 105%;
  display: flex;
  justify-content: space-between;
  text-align: center;
  background-color: #1f1f1f49;
  padding-bottom: 5px;
  transition: all 0.4s;
  opacity: 0;
}

.Home_Movie_categories_card_bottom_icon {
  margin-top: 8px;
  margin-bottom: 5px;
  width: fit-content;
  transition: all 0.35s;
}
.Home_Movie_categories_card_bottom_icon:hover {
  color: #d81f26;
}

.categories_card_main_movie:hover .categories_card_bottom {
  opacity: 1;
  cursor: pointer;
}
</style>