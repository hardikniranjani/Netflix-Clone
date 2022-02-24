<template>
  <div class="flex-column mb-3 dropdown">
    <input
      autocomplete="off"
      type="search"
      class="form-control logInInput text-white"
      placeholder="Search"
      id="searchfield"
      name="searchfield"
      v-model="Search"
    />
    <div
      class="card position-fixed reasult_card"
      v-if="searchData.length > 0"
      style="width: 18rem"
      aria-labelledby="searchfield"
    >
      <router-link
        class="card-body d-flex text-decoration-none justify-content-between"
        v-for="data in searchData"
        :key="data._id"
        :to="{
          name: 'MoviePage',
          params: { id: data._id },
        }"
        @click="searchBoxResult()"
      >
        <p class="card-title text-primary">{{ data.MovieName }}</p>
        <img :src="data.backdrop_path" class="reasult_card_image" />
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
        if (this.Search.length > 0) {
          return (
            data.MovieName.toLowerCase().indexOf(this.Search.toLowerCase()) !=
            -1
          );
        }
      }).slice(0, 5);
    },
  },
  methods: {
    searchBoxResult() {
      this.Search = "";
    },
  },
  async mounted() {
    await Movie.getAllMovie()
      .then((res) => {
        console.log(res.data);
        this.Datalist = res.data;
      })
      .catch((e) => e);
    this.searchData;
    window.addEventListener("scroll", function () {
      this.document
        .querySelector(".logInInput")
        .classList.toggle("Border_active", this.window.scrollY > 0);
    });
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
.logInInput {
  border:none;
  width: 18rem !important;
  background-color: #000000b4;
   transition: transform 400ms;
}
.logInInput.Border_active {
  border-bottom: 1px solid #fafafae3;
}
.reasult_card {
  background-color: #141414a8;
}
.reasult_card_image {
  width: 80px !important;
  height: 50px !important;
  object-fit: contain;
  object-fit: cover;
}
</style>
