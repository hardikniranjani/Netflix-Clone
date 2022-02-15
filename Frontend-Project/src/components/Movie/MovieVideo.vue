<template>
  <div>
    <video
      ref="myvideo"
      style="width: 100vw; height: 100vh"
      id="video"
      controls
      :key="this.src"
    >
      <source :src="src" type="video/mp4" />
    </video>
  </div>
</template>

<script>
import MovieApi from "../../services/movie.service";
import UserApi from "../../services/user.service";
import { mapGetters } from "vuex";

export default {
  name: "MovieVideo",
  data() {
    return {
      src: "",
    };
  },

  beforeUnmount() {
    const duration = this.$refs.myvideo["currentTime"];
    UserApi.addToWatchHistory({
      media_id: this.id,
      media_type: "Movies",
      media_duartion: duration,
    }).then((res) => {
      this.$store.dispatch("ADD_HISTORY",res.data.History);
    });
  },
  props: {
    id: String,
  },
  methods: {
    getInstance(art) {
      console.log(art);
    },
  },
  async updated() {
   
    this.$refs.myvideo["currentTime"] = parseInt(this.$store.getters.mediaDuration(
      this.id,
      "Movies"
    ));
  },
  async mounted() {
    let Movie_res = await MovieApi.findMovieBySearch({
      queryperam: "_id",
      queryName: `${this.id}`,
    });
    this.src = Movie_res.data[0].Video_path;
  },
  Computed: {
    ...mapGetters(["mediaDuration"]),
  },
};
</script>

<style>
</style>