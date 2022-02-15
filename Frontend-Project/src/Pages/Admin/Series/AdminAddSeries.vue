<template>
  <div class="index__body">
    <AdminNavBar style="z-index: 20" />
    <div class="container-fluid index__body_mid">
      <!-- Form -->
      <h1 class="form_title display-5">Add Series</h1>
      <form class="add_movie_form" style="z-index: 2">
        <!-- movie name -->
        <input
          class="form-control mb-2"
          type="text"
          placeholder="Enter Series Name"
          id="movie_series_name"
        />

        <label for="language">Select Primary language : </label>
        <select name="language" id="">
          <option v-for="lang in language" :key="lang._id">
            {{ lang.Spoken_Language }}
          </option>
        </select>

        <div class="d-flex row">
          <label for="">Selecte Genres for Series :</label>
          <div
            class="mb-2 form-check col-4"
            v-for="genre in Genres"
            :key="genre._id"
          >
            <input
              type="checkbox"
              name="checkbox_category"
              class="box form-check-input"
              :value="genre.GenresName"
            />
            <label class="form-check-label">{{ genre.GenresName }}</label>
          </div>
        </div>

        <!-- languages  -->
        <div class="row d-flex">
          <label for="" class="pb-3"
            >In which are the language Series is available ?</label
          >
          <div
            class="mb-2 form-check col-4"
            v-for="lang in language"
            :key="lang._id"
          >
            <input
              type="checkbox"
              name="checkbox_category"
              class="box form-check-input"
              :value="lang.Spoken_Language"
            />
            <label class="form-check-label">{{ lang.Spoken_Language }}</label>
          </div>
        </div>

        <label for="language mt-5">Select Production Companies : </label>
        <div class="d-flex row mb-5">
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
          <label
            class="
              add_movie_form_relese_date_btn
              btn btn-danger
              form-check-label
              m-2
            "
            >Release date
          </label>
          <input
            class="add_movie_form_relese_date_input form-control mb-2"
            type="date"
          />
        </div>

        <!-- Rating -->
        <div class="d-inline-flex w-100">
          <label
            class="
              add_movie_form_relese_date_btn
              btn btn-danger
              form-check-label
              me-2
            "
            >Rating</label
          >
          <input
            class="add_movie_form_relese_date_input form-control mb-2"
            type="number"
          />
        </div>
        <!-- director name -->
        <input
          class="form-control mb-2"
          type="text"
          placeholder="Director name"
          id="Director_name"
        />

        <!-- long discription -->
        <textarea
          class="form-control mb-2"
          placeholder="Long Description"
          id="LongDescription"
        ></textarea>

        <!-- select banner -->
        <label class="text-white" for="img"
          >Select banner<lable style="color: #f40612">*</lable>:</label
        >
        <input
          class="btn btn-outline-danger"
          id="image_file"
          type="file"
          accept="image/*"
        />

        <!-- select trailer -->
        <label class="text-white" for="video">Select Video:</label>
        <input
          class="btn btn-outline-danger"
          type="file"
          id="video"
          name="video"
          accept="video/*"
        /><br />

        <!-- subimt button -->
        <button
          class="btn btn-danger mt-3"
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
  mounted() {
    document.title = `NetflixAdmin - AddSeries`;
  },

  data() {
    return {
      language: [],
      Genres: [],
      companies: [],
    };
  },
  beforeCreate() {
    LanguageAPI.getAllSpokenLanguage().then((res) => {
      // console.log(res.data.languages)
      this.language = res.data.languages;
    });
    GenresAPI.getAllGenre().then((res) => {
      this.Genres = res.data;
      // console.log(res.data);
    });
    CompanyAPI.getAllCompany().then((res) => {
      this.companies = res.data.CompanyPlan;
      console.log(res.data.CompanyPlan);
    });
  },
};
</script>

<style scoped src="../../../Style/addmovie_series.css">
</style>