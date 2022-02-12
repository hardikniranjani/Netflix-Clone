<template>
  <div>
    <video style="width: 100vw; height: 100vh" controls :key="this.src">
      <source src="" type="video/mp4" />
    </video>
  </div>
</template>

<script>
// import EpisodeApi from "../../services/episode.service";
export default {
  name: "EpisodeVideo",
  data() {
    return {
      src: "",
    };
  },
  props: {
    id: String,
    episodeid: String,
    seasonid: String,
  },
  methods: {
    getInstance(art) {
      console.log(art);
    },
  },
  // async mounted() {
  //   let Episode_res = await EpisodeApi.findEpisodeBySearch({
  //     series_id: this.id,
  //     season_id: this.seasonid,
  //     queryperam: "_id",
  //     queryName: `${this.episodeid}`,
  //   });
  //   this.src = Episode_res.data[0].Video_path;
  // },
};
</script>

<style>
</style>