<template>
  <div>
    <img class="categories_card" :src="src" />
    <div class="categories_card_bottom">
      <div class="categories_card_bottom_icon">
        <CloseIcon v-on:click="remove(i.movie_id)" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "card",
  props: {
    src: String,
  },
};
</script>

<style scoped src="../Style/card.css">
</style>

<style>

.categories_card_bottom {
  display: flex;
  justify-content: space-around;
  text-align: center;
  background-color: #1f1f1f49;
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