<template>
  <div v-if="this.$store.state.user.Name" class="categories_card_bottom">
    <i
      class="bi Home_Movie_categories_card_bottom_icon"
      :class="heartIconClass"
      @click="updateWishList"
    >
    </i>
    <router-link
      v-if="media_type == 'Movies'"
      class="link"
      id="banner__button_link"
      :to="{
        name: 'MovieVideo',
        params: { id: this.id },
      }"
    >
      <i
        class="bi bi-play-circle-fill Home_Movie_categories_card_bottom_icon"
      ></i>
    </router-link>
    <router-link
      v-if="media_type == 'Series'"
      class="link"
      :to="{
        name: 'EpisodeVideo',
        params: {
          id: data.Seasons[0].Episodes[0].SeriesID,
          episodeid: data.Seasons[0].Episodes[0]._id,
          seasonid: data.Seasons[0].Episodes[0].SeasonID,
        },
      }"
    >
      <i
        class="bi bi-play-circle-fill Home_Movie_categories_card_bottom_icon"
      ></i>
    </router-link>
    <i
      v-if="media_type == 'Movies'"
      class="bi Home_Movie_categories_card_bottom_icon"
      :class="classList"
      @click="updateWatchLater"
    ></i>
  </div>
</template>

<script>
import wishListMixin from "../mixin/wishListMixin";
import watchLaterMixin from "../mixin/watchLaterMixin";
export default {
  name: "IconComponent",

  mixins: [wishListMixin, watchLaterMixin],
  props: {
    media_type: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    data: {
      type: Object,
    },
  },
  // mounted (){
  //   console.log(this.data)
  // }
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
  color: #d81f26 !important;
}

.categories_card_main_movie:hover .categories_card_bottom {
  opacity: 1;
  cursor: pointer;
}
.link {
  text-decoration: none;
  color: inherit;
}
</style>