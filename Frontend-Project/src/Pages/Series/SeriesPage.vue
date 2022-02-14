<template>
  <div class="SeriesPage">
    <div class="nav"><NavBar /></div>
    <SeriesBanner
      :src="src"
      :Name="Series.SeriesName"
      :Description="Series.Description"
      :id="this.id"
      :seriesData="Series"
    />
    <div class="Series_body">
      <div class="body_content">
        <div v-for="season in Seasons" :key="season._id">
          <h3>{{ season.SeasonName }}</h3> 
          <div class="Series_body_episodeList">
            <EpisodeCardList :data="season.Episodes" />
          </div>
        </div>
      </div>
    </div>
    <div class="Series_footer"><Footer /></div>
  </div>
</template>
<script>
import NavBar from "../../components/NavBar.vue";
import Footer from "../../components/Footer.vue";
import SeriesApi from "../../services/series.service";
import SeriesBanner from "../../components/Series/Series_Banner.vue";
import EpisodeCardList from "../../components/Series/EpisodeCardList.vue";

export default {
  name: "SeriesPage",
  created() {
    document.title = `Netflix - Series`;
  },
  data() {
    return {
      Series: [],
      Seasons: [],
      src: "",
    };
  },
  props: {
    id: String,
  },
  components: {
    NavBar,
    Footer,
    SeriesBanner,
    EpisodeCardList,
  },
  async mounted() {
    await SeriesApi.findSeriesBySearch({
      queryperam: "_id",
      queryName: `${this.id}`,
    })
      .then((res) => {
        console.log(res, "line-67 seriesPage");
        this.Series = res.data[0];
        this.Seasons = res.data[0].Seasons;
        console.log(this.Seasons);
        this.src = res.data[0].backdrop_path;
      })
      .catch((err) => {
        console.log(err);
        this.$router.replace({ name: "PageNotFound" });
      });
  },
};
</script>

<style>
* {
  background-color: #fcfcfc00;
}
.Series_body_episodeList {
  display: flex;
  overflow-y: hidden;
  overflow-x: hidden;
  overflow: scroll;
}

.SeriesPage {
  width: 100vw;
  height: 100%;
  overflow-x: hidden;
}
.nav {
  margin-top: 0px;
}
.Series_body {
  margin-top: 0px;
}
.Series_footer {
  margin-top: 470px;
}
.body_content {
  margin-top: -100px;
}

@media screen and (max-width: 788px) {
  .Series_body{
    margin-top: -180px;
  }
}
</style>