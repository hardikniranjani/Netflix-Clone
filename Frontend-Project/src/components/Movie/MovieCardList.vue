<template>
  <carousel :settings="settings" :breakpoints="breakpoints">
    <slide class="categories_card_main_movie" v-for="i in data" :key="i">
      <div class="carousel__item">
        <router-link :to="{ name: 'MoviePage', params: { id: i._id } }">
          <img class="Movie_categories_card" :src="i.Banner" />
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
import IconComponent from "../../components/IconComponent.vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Navigation } from "vue3-carousel";

export default {
  name: "MovieCardList",
  data() {
    return {
      media_type: "Movies",
      settings: {
        itemsToShow: 7,
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
          itemsToShow: 5.3,
          snapAlign: "start",
        },
        // 1366 and up
        1366: {
          itemsToShow: 7,
          snapAlign: "start",
        },
        // 1440 and up
        1440: {
          itemsToShow: 7.8,
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
    data: Array,
  },
  components: {
    Carousel,
    Slide,
    Navigation,
    IconComponent,
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
  height: 100% !important;
  margin-top: -18px !important;
  margin-left: 35px;
}
.carousel__next {
  opacity: 0;
  height: 70% !important;
  margin-top: -18px !important;
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

<style scoped>
.movie_categories {
  display: flex;
  padding-left: 20px;
}
.categories_card_main_movie {
  object-fit: contain;
  padding-bottom: 20px;
  margin-left: -2px;
  transition: all 0.4s;
}
.categories_card_main_movie:hover {
  transform: scale(1.08);
  cursor: pointer;
}
.Movie_categories_card {
  object-fit: contain;
  object-fit: cover;
  width: 170px;
  height: 230px;
}
.categories_card_bottom_movie {
  width: 80% !important;
  display: flex;
  justify-content: space-around;
  text-align: center;
  background-color: #1f1f1f17;
  padding-bottom: 5px;
  transition: all 0.4s;
  opacity: 0;
}
.Movie_categories_card_bottom_icon {
  margin-top: 8px;
  margin-bottom: 5px;
  width: fit-content;
  transition: all 0.35s;
}
.Movie_categories_card_bottom_icon:hover {
  color: #d81f26;
}

.categories_card_main_movie:hover .categories_card_bottom_movie {
  opacity: 1;
  cursor: pointer;
}
</style>