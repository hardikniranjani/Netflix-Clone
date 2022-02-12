<template>
  <div class="categories">
    <div class="categories_card_main" v-for="i in data" :key="i">
      <router-link :to="{ name: 'SeriesPage', params: { id: i._id } }">
        <img class="User_Series_categories_card" :src="i.Banner" />
      </router-link>
      <div class="categories_card_bottom">
        <div class="categories_card_bottom_icon">
            <CloseIcon v-on:click="removeList(i._id)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserApi from "../../services/user.service";
import { CloseIcon } from "@iconicicons/vue";
export default {
  name: "UserSeriesCardList",
  data() {
    return {
      type: "Series",
    };
  },
  components: {
    CloseIcon,
  },
  props: {
    data: Array,
  },
  methods: {
    async removeList(data1) {
      await UserApi.removeFromWishlist({
        media_id: data1,
        media_type: this.type,
      })
        .then((res) => {
          console.log(res.data);
          location.reload();
        })
        .catch((err) => {
          console.log(err.message);
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
.User_Series_categories_card {
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