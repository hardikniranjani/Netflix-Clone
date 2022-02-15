<template>
  <div>
    <video style="width: 100vw; height: 100vh" controls :key="this.src">
      <source src="" type="video/mp4" />
    </video>
  </div>
</template>

<script>
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
};
</script>

<style>
</style>