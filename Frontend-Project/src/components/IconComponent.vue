<template>
  <div class="categories_card_bottom">
    <i class="bi bi-heart-fill Home_Movie_categories_card_bottom_icon"> </i>
    <router-link
      class="Home_Movie_categories_card_bottom_icon"
      :to="{
        name: 'MovieVideo',
        params: { id: this.id },
      }"
    >
      <i
        class="bi bi-play-circle-fill Home_Movie_categories_card_bottom_icon"
      ></i>
    </router-link>

    <i
      v-if="media_type == 'Movies'"
      class="bi bi-plus-circle Home_Movie_categories_card_bottom_icon"
    ></i>
  </div>
</template>

<script>
export default {
  name: "IconComponent",
  props: {
    media_type: String,
    id: String,
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