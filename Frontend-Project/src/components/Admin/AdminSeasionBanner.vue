<template>
  <div id="banner1">
    <div id="banner__fadeLeft">
      <div id="banner__contents">
        <div id="banner__contents_details">
          <h1 id="banner__title">{{ Name }}</h1>
          <button id="banner__button" click="">Add Episode</button>
          <p v-if="Description" id="banner__description">
            {{ Description }}
          </p>
          <h1 v-else id="banner__description">No Description</h1>
          <h4>Total Episodes: {{totalEpisode}}</h4>
        </div>
      </div>
      <div id="banner__fadeBottom"></div>
    </div>
  </div>
</template>

<script>
import UserApi from "../../services/user.service";
import swal from "sweetalert";
export default {
  name: "AdminSeasionBanner",
  data() {
    return {
      media_type: "Episode",
    };
  },
  props: {
    src: String,
    Name: String,
    Description: String,
    id: String,
    seasonData: {},
    totalEpisode:String
  },
  methods: {
    async addToWishList() {
      await UserApi.addToWishList({
        media_type: this.media_type,
        media_id: this.id,
      })
        .then(() => {
          swal("Successfully added to wish list!");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  updated() {
    var banner = document.getElementById("banner1");
    banner.style.backgroundImage = "url(" + this.src + ")";
  },
  mounted() {
    var banner = document.getElementById("banner1");
    banner.style.backgroundImage = "url(" + this.src + ")";
  },
};
</script>

<style scoped src="../../Style/Banner.css">
</style>

<style scoped>
#banner1 {
  color: white;
  object-fit: contain;
  height: 844px;
  background-size: cover;
}

#banner__contents_details {
  margin-top: -210px;
}

.GenrasList {
  text-decoration: none;
  color: inherit;
  transition: all 0.4s;
}

.GenrasList:hover {
  color: #d81f26;
}
</style>