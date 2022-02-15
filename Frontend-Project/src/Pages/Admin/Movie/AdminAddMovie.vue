<template>
  <div class="index__body">
    <AdminNavBar style="z-index: 20" />
    <div class="container-fluid index__body_mid">
      <!-- Form -->
      <h1 class="form_title display-5">Add Movie</h1>
      <form class="add_movie_form" style="z-index: 2">
        <!-- movie name -->
        <input
          class="form-control mb-2 p-2"
          type="text"
          placeholder="Enter Movie Name"
          
        />

        <label for="language">Select Primary language : </label>
        <select name="language" id="">
          <option v-for="lang in language" :key="lang._id">
            {{ lang.Spoken_Language }}
          </option>
        </select>

        <div class="mb-2 form-check">
          <input
            type="checkbox"
            name="checkbox_category"
            class="box form-check-input"
            value="Anime"
          />
          <label class="form-check-label">Anime</label>
        </div> -->

        <label for="language">Select Primary language : </label>
        <select name="language" id="">
          <option v-for="lang in language" :key="lang._id">
            {{ lang.Spoken_Language }}
          </option>
        </select>

        <div class="d-flex row ms-4 mt-2 mb-3">
          <label style="margin-left: -25px; margin-bottom: 5px"
            >Selecte Genres for Series :</label
          >
          <div
            class="mb-2 form-check col-4"
            v-for="genre in Genres"
            :key="genre._id"
          >
            <input
              type="checkbox"
              name="checkbox_category "
              class="box form-check-input"
              :value="genre.GenresName"
            />
            <label class="form-check-label">{{ genre.GenresName }}</label>
          </div>
        </div>
        <div class="d-flex row mt-2 mb-3" style="margin-left: -12px">
          <label style="margin-left: 12px; margin-bottom: 5px"
            >Select Production Companies :
          </label>

          <div
            v-for="company in companies"
            :key="company._id"
            class="col-3 m-2"
          >
            <input
              type="checkbox"
              name="checkbox_category"
              class="box form-check-input m-1"
              :value="company.Name"
            />
            <label class="form-check-label">{{ company.Name }}</label>
          </div>
        </div>

        <!-- relese date -->
        <div class="d-inline-flex w-100">
          <input
            class="add_movie_form_relese_date_input form-control mb-2 p-2"
            type="date"
          />
          <label
            class="
              add_movie_form_relese_date_btn
              btn btn-danger
              form-check-label
              ms-2
            "
            >Release date
          </label>
        </div>
        <!-- Discription -->
        <textarea
          class="form-control mb-2 p-2"
          placeholder="Description"
          id="LongDescription"
          style="width: 100%; height: 150px"
        ></textarea>

        <!-- subimt button -->
        <button
          class="btn btn-danger mt-3 p-2"
          type="button"
          style="background-color: #f40612"
          onclick="add_image()"
        >
          Go
        </button>
      </form>
      <div style="margin-top: 500px"></div>
    </div>
  </div>
</template>

<script>
import AdminNavBar from "../../../components/Admin/AdminNavBar.vue";
import LanguageAPI from "../../../services/spoken_language.service";
import GenresAPI from "../../../services/genre.service";
import CompanyAPI from "../../../services/company.service";
export default {
  name: "AdminAddMovie",
  components: {
    AdminNavBar,
  },
  data() {
    return {
      language: [],
      Genres: [],
      companies: [],
    };
  },
  mounted() {
    document.title = `NetflixAdmin - AddMovies`;
  },
  beforeCreate() {
    LanguageAPI.getAllSpokenLanguage().then((res) => {
      this.language = res.data.languages;
    });
    GenresAPI.getAllGenre().then((res) => {
      this.Genres = res.data;
    });
    CompanyAPI.getAllCompany().then((res) => {
<<<<<<< Updated upstream
      this.companies = res.data.CompanyPlan;
      console.log(res.data.CompanyPlan);
=======
      this.companies = res.data.CompanyList;
>>>>>>> Stashed changes
    });
  },
};
</script>

<style scoped src="../../../Style/addmovie_series.css">
</style>