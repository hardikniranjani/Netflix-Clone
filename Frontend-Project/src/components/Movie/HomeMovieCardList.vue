<template>
  <div class="categories">
    <div class="categories_card_main" v-for="i in data" :key="i">
      <router-link :to="{ name: 'MoviePage', params: { id: i._id } }">
        <img class="Home_Movie_categories_card" :src="i.backdrop_path" />
      </router-link>
      <div class="categories_card_bottom">
        <i class="bi bi-heart-fill Home_Movie_categories_card_bottom_icon" v-on:click="addToWishList(i._id )"></i>
        <router-link
          class="Home_Movie_categories_card_bottom_icon"
          :to="{
            name: 'MovieVideo',
            params: { id: i._id },
          }"
        >
          <i class="bi bi-play-circle-fill"></i>
        </router-link>

        <i class="bi bi-plus-circle Home_Movie_categories_card_bottom_icon" v-on:click="addToWatchLater(i._id )"></i>
        <!-- <HeartIcon />
        <VideoIcon />
        <PlusCircleIcon />        
        <CloseIcon v-on:click="remove(i.movie_id)" />
          <CloseIcon /> -->
        <!-- <div class="categories_card_bottom_icon">

        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
// import {
//   // CloseIcon,
//   VideoIcon,
//   HeartIcon,
//   PlusCircleIcon,
// } from "@iconicicons/vue";
import UserApi from "../../services/user.service";
import swal from "sweetalert";
export default {
  name: "HomeMovieCardList",
    data() {
    return {
      media_type: "Movies",
    };
  },
  // components: {
  //   // CloseIcon,
  //   PlusCircleIcon,
  //   HeartIcon,
  //   VideoIcon,
  //   // Card
  // },
  props: {
    // src: String,
    id: String,
    data: Array,
  },
  methods: {
    async addToWishList(movie_id) {
      await UserApi.addToWishList({
        media_type: this.media_type,
        media_id: movie_id,
      })
        .then((res) => {
          console.log(res, "line 33 movie banner");
          swal("Successfully added to wish list!");
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
.span {
  color: red;
}
.categories {
  position: relative;
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
.Home_Movie_categories_card {
  object-fit: contain;
  max-width: 210px;
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
.Home_Movie_categories_card_bottom_icon {
  margin-top: 8px;
  margin-bottom: 5px;
  width: fit-content;
  transition: all 0.35s;
}
.Home_Movie_categories_card_bottom_icon:hover {
  color: #d81f26;
}

.categories_card_main:hover .categories_card_bottom {
  opacity: 1;
  cursor: pointer;
}
</style>