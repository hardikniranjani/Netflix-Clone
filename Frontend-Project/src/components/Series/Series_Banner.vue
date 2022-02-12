<template>
  <header id="banner">
    <div id="banner__fadeLeft">
      <div id="banner__contents">
        <div id="banner__contents_details">
          <h1 id="banner__title">{{ Name }}</h1>
          <div id="banner__buttons">
            <button id="banner__button" v-on:click="addToWishList()">
              My List
            </button>
          </div>
          <p id="banner__description">
            {{ Description }}
          </p>
          <h4>Category</h4>
          <div class="d-flex">
            <div v-for="(c) in seriesData.Genres" :key="c">
              <div class="ms-2 w-100">
                
                  <router-link
                    class="GenrasList"
                    style=""
                    :to="{ name: 'GenersContent', params: { id: c._id } }"
                  >
                   <div class="ms-2 me-2"> {{ c.GenresName }} </div>
                  </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="banner__fadeBottom"></div>
    </div>
  </header>
</template>

<script>
import UserApi from "../../services/user.service";
import swal from "sweetalert";
export default {
  name: "Series_Banner",
  data() {
    return {
      media_type: "Series",
    };
  },
  props: {
    src: String,
    Name: String,
    Description: String,
    id: String,
    seriesData: {},
  },
  methods: {
    async addToWishList() {
      await UserApi.addToWishList({
        media_type: this.media_type,
        media_id: this.id,
      })
        .then((res) => {
          console.log(res, "line 38 series");
          swal("Successfully added to wish list!");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  updated() {
    var banner = document.getElementById("banner");
    banner.style.backgroundImage = "url(" + this.src + ")";
  },
  mounted() {
    var banner = document.getElementById("banner");
    banner.style.backgroundImage = "url(" + this.src + ")";
  },
};
</script>

<style scoped src="../../Style/Banner.css">
</style>

<style scoped>
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