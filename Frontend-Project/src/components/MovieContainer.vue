<template>
  <div class="MovieContainer"></div>
</template>

<script>
import MovieApi from "../services/movie.service";

export default {
  name: "MovieContainer",
  props: {
    id: String,
  },
  created() {
    MovieApi.findMovieBySearch({
      queryperam: "_id",
      queryName: `${this.id}`,
    });
  },
};
</script>

<style>
</style>