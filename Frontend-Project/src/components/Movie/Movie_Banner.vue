<template>
  <div id="movie_body">
    <div id="banner">
      <div id="banner__fadeLeft">
        <div id="banner__contents">
          <div id="banner__contents_details">
            <h1 id="banner__title">{{ Name }}</h1>
            <div id="banner__buttons">
              <router-link
                id="banner__button_link"
                :to="{
                  name: 'MovieVideo',
                  params: { id: this.id },
                }"
              >
                <button id="banner__button"><i class="bi bi-play-fill me-1"></i>Play</button>
              </router-link>
              <button id="banner__button" @click="updateWishList()">
                <i class="bi text-danger" :class="heartIconClass"></i>
              </button>
              <button id="banner__button" @click="updateWatchLater()">
                <i class="bi" :class="classList" ref="watchLater"></i>
              </button>
            </div>
            <p id="banner__description">
              {{ Description }}
            </p>
            <h4 id="leptop_view_title">Category</h4>
            <div id="leptop_view_title" v-for="c in movieData.Genres" :key="c">
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
    </div>
    <div class="mobile_view">
      <h4 class="ms-3">Description</h4>
      <p class="ms-3" id="banner__description_mobile">
        {{ Description }}
      </p>
      <h4 class="ms-3">Category</h4>
      <div class="ms-3" v-for="c in movieData.Genres" :key="c">
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
</template>

<script>
import UserApi from "../../services/user.service";
export default {
  name: "Movie_Banner",
  data() {
    return {
      Banner_Movie: {},
      media_type: "Movies",
      availableInWatchLater: false,
      availableInWishList: false,
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
    Mynotification(text, type) {
      this.$notify({
        text: text,
        type: type,
        duration: 5000,
        speed: 1000,
      });
    },
    async removeFromWishList() {
      await UserApi.removeFromWishlist({
        media_type: this.media_type,
        media_id: this.id,
      })
        .then((res) => {
          console.log(res.data);
          this.availableInWishList = false;
          this.$store.dispatch("ADD_WISH_LIST", res.data.list);
          this.Mynotification("Movie removed from your wish list.", "success");
        })
        .catch(() => {
          this.availableInWishList = false;
          this.Mynotification(
            "Error while removing from your wish list.",
            "danger"
          );
        });
    },
    async addToWishList() {
      await UserApi.addToWishList({
        media_type: this.media_type,
        media_id: this.id,
      })
        .then((res) => {
          this.$store.dispatch("ADD_WISH_LIST", res.data.wishlist);
          this.availableInWishList = true;
          this.Mynotification("Movie added to your wish list.", "success");
        })
        .catch((err) => {
          this.availableInWishList = false;
          this.Mynotification(err, "danger");
        });
    },
    async addToWatchLater() {
      await UserApi.addToWatchLater({
        media_type: this.media_type,
        media_id: this.id,
      })
        .then((res) => {
          this.availableInWatchLater = true;
          this.$store.dispatch("ADD_WATCH_LATER", res.data.updatedLibrary);
          this.Mynotification("Successfully added to watch later!", "success");
        })
        .catch((err) => {
          this.availableInWatchLater = true;
          console.log(err);
          this.Mynotification("Error while adding to watch later.", "danger");
        });
    },
    async removeFromWatchLater() {
      await UserApi.removeFromWatchLater({
        media_type: this.media_type,
        media_id: this.id,
      }).then((res) => {
        this.availableInWatchLater = false;
        this.$store.dispatch("ADD_WATCH_LATER", res.data.list);
        this.availableInWatchLater = false;
        this.Mynotification("Removed from watch later !!", "success");
      });
    },
    updateWatchLater() {
      if (this.availableInWatchLater) {
        this.removeFromWatchLater();
      } else {
        this.addToWatchLater();
      }
    },
    updateWishList() {
      if (this.availableInWishList) {
        this.removeFromWishList();
      } else {
        this.addToWishList();
      }
    },
  },

  computed: {
    classList() {
      return this.availableInWatchLater
        ? "bi-bookmark-check text-danger"
        : "bi-bookmark text-light";
    },
    heartIconClass() {
      return this.availableInWishList
        ? "bi-heart-fill text-danger"
        : "bi-heart text-light";
    },
  },

  async updated() {
    var banner = document.getElementById("banner");
    banner.style.backgroundImage = "url(" + this.src + ")";
    let isAvailableInWatchLater = this.$store.getters.availableInWatchLater(
      parseInt(this.id),
      "Movies"
    );
    // console.log(isAvailable, this.$refs["watchLater"]["classList"].value);
    this.availableInWatchLater = isAvailableInWatchLater;

    let isAvailableInWishList = this.$store.getters.availableInWishList(
      parseInt(this.id),
      "Movies"
    );  

    this.availableInWishList = isAvailableInWishList;
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

.mobile_view {
  display: none;
}

@media screen and (max-width: 788px) {
  .mobile_view {
    display: block;
    margin-top: -12px;
  }
  #banner__description {
    display: none;
  }
  #leptop_view_title {
    display: none;
  }
  #banner__contents {
    height: 25%;
    width: 50vw;
  }
  #banner__contents_details {
    margin-top: -250px;
    margin-left: -50px;
  }
  #movie_body {
    width: 100vw;
    height: 851px;
  }
  #banner {
    height: 544px;
    color: white;
    object-fit: contain;
    background-position: center center;
    background-size: cover;
  }
  #banner__title {
    font-family: "Netflix Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 1.3rem;
    font-weight: 800;
    padding-bottom: 0.3rem;
  }
  #banner__description_mobile {
    line-height: 1.5;
    padding-top: 0rem;
    padding-left: 0.4rem;
    font-size: 0.7rem;
    max-width: 390px;
    height: 80px;
    overflow: hidden;
  }
  #banner__button {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    cursor: pointer;
    color: white;
    outline: none;
    border: none;
    font-weight: 500;
    border-radius: 0.2vw;
    margin-bottom: 1rem;
    margin-right: 1rem;
    background-color: rgba(51, 51, 51, 0.5);
    padding-bottom: 0.5rem;
  }
  #banner__fadeBottom {
    margin-top: -75px;
    width: 100vw;
    height: 5.5rem;
    background: linear-gradient(
      180deg,
      transparent,
      rgba(37, 37, 37, 0.61),
      #111
    );
  }
  #banner__button_link {
    text-decoration: none;
    color: inherit;
  }
}
</style>