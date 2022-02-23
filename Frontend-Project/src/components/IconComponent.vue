<template>
  <div class="categories_card_bottom">
    <i class="bi Home_Movie_categories_card_bottom_icon" :class="heartIconClass" @click="updateWishList"> </i>

    <i
      class="bi bi-play-circle-fill Home_Movie_categories_card_bottom_icon"
    ></i>

    <i
      v-if="media_type == 'Movies'"
      class="bi  Home_Movie_categories_card_bottom_icon"
      :class="classList"
      @click="updateWatchLater"
    ></i>
  </div>
</template>

<script>
import wishListMixin from '../mixin/wishListMixin';
import watchLaterMixin from '../mixin/watchLaterMixin';
export default {
  name: "IconComponent",
  
  mixins : [wishListMixin,watchLaterMixin],
  props: {
    media_type: {
      type : String,
      required : true
    },
    id : {
      type : Number,
      required : true
    },
  },
  
};
</script>

<style>
.categories_card_bottom {
  width: 105%;
  display: flex !important;
  justify-content: space-around !important;
  /* justify-content: space-between !important; */
  text-align: center !important;
  background-color: #1f1f1f49;
  padding-bottom: 5px;
  transition: all 0.4s;
  opacity: 0;
}

.Home_Movie_categories_card_bottom_icon {
  display: flex !important;
  justify-content: space-around !important;
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