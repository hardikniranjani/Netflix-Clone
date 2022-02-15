<template>
  <div class="categories">
    <div class="categories_card_main" v-for="i in data" :key="i">
      <router-link :to="{ name: 'MoviePage', params: { id: i._id } }">
        <img class="Movie_categories_card" :src="i.Banner" />
      </router-link>
      <div class="categories_card_bottom">
        <i
          class="bi bi-heart-fill Movie_categories_card_bottom_icon"
          v-on:click="addToWishList(i._id)"
        ></i>
        <router-link
          class="Movie_categories_card_bottom_icon"
          :to="{
            name: 'MovieVideo',
            params: { id: i._id },
          }"
        >
          <i class="bi bi-play-circle-fill"></i>
        </router-link>

        <i
          class="bi bi-plus-circle Movie_categories_card_bottom_icon"
          v-on:click="addToWatchLater(i._id)"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
import UserApi from "../../services/user.service";
import swal from "sweetalert";
export default {
  name: "MovieCardList",
  data(){
    return{
      media_type:"Movies"
    }
  },
  props: {
    data: Array,
  },
  methods: {
    async addToWishList(movie_id) {
      await UserApi.addToWishList({
        media_type: this.media_type,
        media_id: movie_id,
      })
        .then(() => {
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
.Movie_categories_card {
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
.Movie_categories_card_bottom_icon {
  margin-top: 8px;
  margin-bottom: 5px;
  width: fit-content;
  transition: all 0.35s;
}
.Movie_categories_card_bottom_icon:hover {
  color: #d81f26;
}

.categories_card_main:hover .categories_card_bottom {
  opacity: 1;
  cursor: pointer;
}
</style>