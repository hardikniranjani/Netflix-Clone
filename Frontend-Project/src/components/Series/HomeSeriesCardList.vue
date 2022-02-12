<template>
  <div class="categories">
    <div class="categories_card_main" v-for="i in data" :key="i">
      <router-link :to="{ name: 'SeriesPage', params: { id: i._id } }">
        <img class="Home_Series_categories_card" :src="i.backdrop_path" />
      </router-link>
      <div class="categories_card_bottom">
        <i class="bi bi-heart-fill Home_Series_categories_card_bottom_icon"  v-on:click="addToWishList(i._id)"></i>
      </div>
    </div>
  </div>
</template>

<script>
import UserApi from "../../services/user.service";
import swal from "sweetalert";
export default {
  name: "HomeSeriesCardList",
  data() {
    return {
      media_type: "Series",
    };
  },
  props: {
    data: Array,
  },
    methods: {
    async addToWishList(series_id) {
      await UserApi.addToWishList({
        media_type: this.media_type,
        media_id: series_id,
      })
        .then((res) => {
          console.log(res, "line 33 movie banner");
          swal("Successfully added to wish list!");
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
.Home_Series_categories_card {
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
.Home_Series_categories_card_bottom_icon {
  margin-top: 8px;
  margin-bottom: 5px;
  width: fit-content;
  transition: all 0.35s;
}
.Home_Series_categories_card_bottom_icon:hover {
  color: #d81f26;
}

.categories_card_main:hover .categories_card_bottom {
  opacity: 1;
  cursor: pointer;
}
</style>