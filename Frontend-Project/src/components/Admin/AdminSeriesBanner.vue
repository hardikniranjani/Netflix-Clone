<template>
  <header id="banner">
    <div id="banner__fadeLeft">
      <div id="banner__contents">
        <div id="banner__contents_details">
          <h1 id="banner__title">{{ Name }}</h1>
          <button id="banner__button" click="">Add Seasion</button>
          <p id="banner__description">
            {{ Description }}
          </p>
          <h4>Category</h4>
          <div class="d-flex">
            <div v-for="c in seriesData.Genres" :key="c">
              <div class="ms-2 w-100">
                <div class="ms-2 me-2">{{ c.GenresName }}</div>
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
export default {
  name: "AdminSeriesBanner",
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