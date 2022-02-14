<template>
  <div id="series_body">
    <div id="banner">
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
            <h4 id="leptop_view_title">Category</h4>
            <div class="d-flex" id="leptop_view_title">
              <div
                id="leptop_view_title"
                v-for="c in seriesData.Genres"
                :key="c"
              >
                <div class="ms-2 w-100">
                  <router-link
                    class="GenrasList"
                    style=""
                    :to="{ name: 'GenersContent', params: { id: c._id } }"
                  >
                    <div class="ms-2 me-2">{{ c.GenresName }}</div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="banner__fadeBottom"></div>
      </div>
    </div>
    <div class="mobile_view">
      <h4 class="ms-2">Category</h4>
      <div class="d-inline-flex  flex-wrap mb-3 ">
        <div v-for="c in seriesData.Genres" :key="c">
          <div class="ms-2 w-100">
            <router-link
              class="GenrasList"
              style=""
              :to="{ name: 'GenersContent', params: { id: c._id } }"
            >
              <div class="ms-2 me-2">{{ c.GenresName }}</div>
            </router-link>
          </div>
        </div>
      </div>
      <h4 class="ms-2">Description</h4>
      <p id="banner__description_mobile">
        {{ Description }}
      </p>
    </div>
  </div>
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

.mobile_view {
  display: none;
}
#banner__description {
  display: block;
}
#leptop_view_title {
  display: block;
}
@media screen and (max-width: 788px) {
  .mobile_view {
    display: block;
    margin-top: -120px;
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
  #series_body {
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
    max-width: 370px;
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