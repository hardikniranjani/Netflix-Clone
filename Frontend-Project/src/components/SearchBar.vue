<template>
  <div class="flex-column mb-3 dropdown">
    <input
      type="search"
      class="form-control w-100 border-0 border-bottom rounded-0 logInInput bodyclr0 text-white"
      placeholder="Search"
      id="searchfield"
      name="searchfield"
      v-model="Search"
    />
    <div
      class="card position-fixed bodyclr1"
      v-if="searchData.length > 0"
      style="width: 18rem"
      aria-labelledby="searchfield"
    >
      <router-link
        class="card-body d-flex text-decoration-none justify-content-between"
        v-for="data in searchData"
        :key="data._id"
        :to="{
          name: 'Details',
          params: { id: data._id },
        }"
        @click="searChBox()"
      >
        <p class="card-title text-primary">{{ data.MovieName }}</p>
        <img :src="data.backdrop_path" width="50" height="50" />
      </router-link>
    </div>
  </div>
</template>

<script>
import Movie from "../services/movie.service";
export default {
  name: "SearchBar",
  data() {
    return {
      Datalist: [],
      Search: "",
    };
  },
  computed: {
    searchData() {
      return this.Datalist.filter((data) => {
        if (this.Search.length > 1) {
          return (
            data.Name.toLowerCase().indexOf(this.Search.toLowerCase()) != -1
          );
        }
      }).slice(0, 5);
    },
  },
  methods: {
    searChBox() {
      this.Search = "";
    },
  },
  async mounted() {
    this.Datalist = await Movie.getAllMovie()
      .then((res) => res.data)
      .catch((e) => e);
    this.searchData;
  },
};
</script>

<style scoped>
.margin {
  margin-left: 30px;
}
.form-control {
  transition: transform 400ms;
}
.form-control :focus {
  padding-left: -100px;
}
.card {
  z-index: 3 !important;
}
</style>
