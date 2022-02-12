<template>
  <header id="banner">
    <div id="banner__fadeLeft">
      <div id="banner__contents">
        <div id="banner__contents_details">
          <h1 id="banner__title">{{ Name }}</h1>
          <div id="banner__buttons">
            <router-link
              :to="{
                name: 'MovieVideo',
                params: { id: this.id },
              }"
            >
              <button id="banner__button">Play</button>
            </router-link>
            <button id="banner__button" v-on:click="addToWishList()">
              My List
            </button>
            <button id="banner__button" v-on:click="addToWatchLater()">
              WatchLater
            </button>
          </div>
          <p id="banner__description">
            {{ Description }}
          </p>

          <h4>Category</h4>
          <div v-for="c in movieData.Genres" :key="c">
            <li>
              <router-link
                class="GenrasList"
                style=""
                :to="{ name: 'GenersContent', params: { id: c._id } }"
              >
                {{ c.GenresName }}
              </router-link>
            </li>
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
  name: "Movie_Banner",
  data() {
    return {
      Banner_Movie: {},
      media_type: "Movies",
    };
  },
  props: {
    src: String,
    Name: String,
    Description: String,
    id: String,
    movieData: {},
  },
  methods: {
    async addToWishList() {
      await UserApi.addToWishList({
        media_type: this.media_type,
        media_id: this.id,
      })
        .then((res) => {
          console.log(res, "line 33 movie banner");
          swal("Successfully added to wish list!");
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async addToWatchLater() {
      await UserApi.addToWatchLater({
        media_type: this.media_type,
        media_id: this.id,
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
  margin-top: -170px;
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