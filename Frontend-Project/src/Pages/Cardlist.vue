<template>
  <!-- <slick ref="slick" :options="slickOptions">
    <div class="categories_card_main" v-for="i in Allseries" :key="i">
      <router-link :to="{ name: 'SeriesPage', params: { id: i._id } }">
        <img
          class="Home_Series_categories_card js-slide bg-img-hero-center"
          :src="i.backdrop_path"
        />
      </router-link>
      <div class="categories_card_bottom">
        <i
          class="bi bi-heart-fill Home_Series_categories_card_bottom_icon"
          v-on:click="addToWishList(i._id)"
        ></i>
      </div>
    </div>
  </slick> -->
  <!-- <div class="cardlist_body">
    <slick ref="slick" :options="slickOptions">
      <a href="http://placehold.it/2000x1000"
        ><img src="http://placehold.it/2000x1000" alt=""
      /></a>
      <a href="http://placehold.it/2000x1000"
        ><img src="http://placehold.it/2000x1000" alt=""
      /></a>
      <a href="http://placehold.it/2000x1000"
        ><img src="http://placehold.it/2000x1000" alt=""
      /></a>
      <a href="http://placehold.it/2000x1000"
        ><img src="http://placehold.it/2000x1000" alt=""
      /></a>
      <a href="http://placehold.it/2000x1000"
        ><img src="http://placehold.it/2000x1000" alt=""
      /></a>
    </slick>
  </div> -->
  <!-- <div class="wrapper d-flex flex-row mt-1">
    <button @click="scroll_left" class="side_button left">
      <i class="bi bi-chevron-compact-left"></i>
    </button>
    <div class="wrapper-box">
      <div id="box" class="d-flex align-items-center">
        <div class="categories_card_main" v-for="i in Allseries" :key="i">
          <router-link :to="{ name: 'SeriesPage', params: { id: i._id } }">
            <img class="Home_Series_categories_card" :src="i.backdrop_path" />
          </router-link>
          <div class="categories_card_bottom">
            <i
              class="bi bi-heart-fill Home_Series_categories_card_bottom_icon"
              v-on:click="addToWishList(i._id)"
            ></i>
          </div>
        </div>
      </div>
    </div>
    <button @click="scroll_right" class="side_button right">
      <i class="bi bi-chevron-compact-right"></i>
    </button>
  </div> -->

  <!-- <div id="app">
    <split-carousel>
      <split-carousel-item  v-for="i in Allseries" :key="i">
        <img class="Home_Series_categories_card" :src="i.backdrop_path" />
      </split-carousel-item>
    </split-carousel>
  </div> -->
  <carousel :items-to-show="6.2">
    <slide v-for="i in Allseries" :key="i">
      <img class="Home_Series_categories_card" :src="i.backdrop_path" />
    </slide>

    <template #addons>
      <navigation />
      
    </template>
  </carousel>
  <carousel :items-to-show="5">
    <slide v-for="slide in 100" :key="slide">
      {{ slide }}
    </slide>

    <template #addons>
      <navigation />
      
    </template>
  </carousel>
  <carousel :items-to-show="7">
    <slide v-for="slide in 100" :key="slide">
      {{ slide }}
    </slide>

    <template #addons>
      <navigation />
      
    </template>
  </carousel>
  <carousel :items-to-show="5">
    <slide v-for="slide in 100" :key="slide">
      {{ slide }}
    </slide>

    <template #addons>
      <navigation />
      
    </template>
  </carousel>
  <carousel :items-to-show="5">
    <slide v-for="slide in 100" :key="slide">
      {{ slide }}
    </slide>

    <template #addons>
      <navigation />
      
    </template>
  </carousel>
</template>

<script>
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Navigation } from "vue3-carousel";
import SeriesApi from "../services/series.service";

export default {
  name: "CardList",
  data() {
    return {
      Allseries: [],
      Horror_Series: [],
      slickOptions: {
        slidesToShow: 3,
        // Any other options that can be got from plugin documentation
      },
    };
  },
  components: {
    Carousel,
    Slide,
    Navigation,
  },
  methods: {
    next() {
      this.$refs.slick.next();
    },

    prev() {
      this.$refs.slick.prev();
    },

    reInit() {
      // Helpful if you have to deal with v-for to update dynamic lists
      this.$nextTick(() => {
        this.$refs.slick.reSlick();
      });
    },
    scroll_left() {
      let content = document.querySelector(".wrapper-box");
      content.scrollLeft -= 800;
    },
    scroll_right() {
      let content = document.querySelector(".wrapper-box");
      content.scrollLeft += 800;
    },
    async allSeries() {
      let Allseries_res = await SeriesApi.getAllSeries();
      this.Allseries = Allseries_res.data;
      this.Horror_Series = this.Allseries.filter((series) => {
        return series.Genres.filter((g) => {
          if (g.GenresName === "Horror fiction") {
            return series;
          }
        })[0];
      });
    },
  },
  mounted() {
    this.allSeries();
  },
};
</script>

<style>
#app {
  width: 100vw;
  margin: 10px auto;
}
</style>
<style>
.wrapper {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: left;
  align-items: center;
  flex-direction: column;
  scroll-behavior: smooth;
  transition: transform 0.4s ease-in;
}
.wrapper-box {
  max-width: 190%;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: hidden;
  scroll-behavior: smooth;
}
#box {
  width: 800px;
  /* height: 257px; */
  position: relative;
  margin-left: 50px;
  display: flex;
  margin-top: 10px;
  width: max-content;
  transform: translateX(0px);
  /* transition: all 1s ease; */
  scroll-behavior: smooth;
  transition: transform 0.4s ease-in;
}
.side_button {
  width: 50px;
  height: 172px;
  background-color: rgb(22, 22, 22, 0.5);
  color: white;
  position: absolute;
  border: none;
  z-index: 99;
  top: 0;
  bottom: 0;
  margin: auto;
  cursor: pointer;
  scroll-behavior: smooth;
}
.left {
  left: 0;
}

.right {
  right: 0;
}
.cardlist_body {
  width: 100vw;
  height: 100vh;
}
</style>