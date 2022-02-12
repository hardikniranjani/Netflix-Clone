<template>
  <div class="MoviePage">
    <div class="nav"><NavBar /></div>
    <div class="Episode_body ms-5">
      <h3>{{ Episode.EpisodeName }}</h3>
      <video style="width: 600px; height: 400px" controls :key="src">
        <source :src="src" type="video/mp4" />
      </video>
      <div>
        <h3 class="display-5">Description</h3>
        {{ Episode.ShortDescription }}
      </div>
    </div>
    <div class="Episode_footer"><Footer /></div>
  </div>
</template>

<script>
import NavBar from "../../components/NavBar.vue";
import Footer from "../../components/Footer.vue";
import EpisodeApi from "../../services/episode.service";

export default {
  name: "Episode",
  created() {
    document.title = `Netflix - Episode`;
  },

  data() {
    return {
      Episode: [],
      src: "",
    };
  },
  props: {
    id: String,
    episodeid: String,
    seasonid: String,
  },
  components: {
    NavBar,
    Footer,
  },
  async mounted() {
    // let Allmovies_res = await MovieApi.getAllMovie();
    //   this.AllMovies = Allmovies_res.data;

    let Episode_res = await EpisodeApi.findEpisodeBySearch({
      series_id: this.id,
      season_id: this.seasonid,
      queryperam: "_id",
      queryName: `${this.episodeid}`,
    });
    console.log(Episode_res.data);
    this.Episode = Episode_res.data[0];
    this.src = Episode_res.data[0].Video_path;
  },
};
</script>

<style>
* {
  background-color: #fcfcfc00;
}
.MoviePage {
  width: 100%;
  height: 100%;
}
.nav {
  margin-top: 0px;
}
.Episode_body {
  margin-top: 50px;
}
.Episode_footer {
  margin-top: 50px;
}
</style>