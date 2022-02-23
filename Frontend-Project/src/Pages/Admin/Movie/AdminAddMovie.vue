<template>
  <div class="index__body">
    <AdminNavBar style="z-index: 20" />
    <div class="container-fluid index__body_mid">
      <!-- Form -->
      <h1 class="form_title display-5">Add Movie</h1>
      <form class="add_movie_form" style="z-index: 2" @submit="submit">
        <div>
        <!-- movie name -->
        <input
          class="form-control mb-2 p-2"
          style="border:none; color:lightgray"
          type="text"
          placeholder="Enter Movie Name"
          name="MovieName"
          v-model="Movie.MovieName"
        />

        <span v-if="errors.MovieName" class="ms-3 text-danger">{{
          errors.MovieName
        }}</span>
        </div>
        <label for="language" class="Page_title"
          >Select Primary language 
        </label>
        <select
          name="Original_language"
          id=""
          v-model="Movie.Original_language"
        >
          <option v-for="lang in language" :key="lang._id">
            {{ lang.Spoken_Language }}
          </option>
        </select>
        <span v-if="errors.Original_language" class="ms-3 text-danger">{{
          errors.Original_language
        }}</span>

        <div class="d-flex row ms-4 mt-2 mb-3">

          <label
            class="Page_title"
            style="margin-left: -25px; margin-bottom: 5px"
            >Selecte Genres for Series :</label
          >
          <div
            class="mb-2 form-check col-4"
            v-for="genre in Genres_array"
            :key="genre._id"
          >
            <input
              type="checkbox"
              name="Genres"
              class="box form-check-input input_checkbox"
              :value="genre._id"
              
              @change="handleChange"
            />
            <label class="form-check-label">{{ genre.GenresName }}</label>
          </div>
                    <span v-if="errors.Genres" class="ms-3 text-danger">{{
            errors.Genres
          }}</span>
        </div>

        <div class="d-flex row mt-2 mb-3" style="margin-left: -10px">

          <label
            class="Page_title"
            style="margin-left: 12px; margin-bottom: 5px"
            >Select Production Companies :
          </label>

          <div
            v-for="company in companies"
            :key="company._id"
            class="mb-2 form-check col-4"
          >
            <input
              type="checkbox"
              class="box form-check-input m-1 input_checkbox"
              :value="company._id"
              name="Production_companies"
              @change="handleChange"
            />
            <label class="form-check-label">{{ company.Name }}</label>
          </div>
                    <span v-if="errors.Production_companies" class="ms-3 text-danger">{{
            errors.Production_companies
          }}</span>
        </div>

        <!-- relese date -->
        <div class="d-inline-flex w-100">
          <input
            class="add_movie_form_relese_date_input form-control mb-2 p-2"
            type="date"
            name="ReleaseDate"
            v-model="Movie.ReleaseDate"
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
                  <span v-if="errors.ReleaseDate" class="ms-3 text-danger">{{
            errors.ReleaseDate
          }}</span>
        <!-- Discription -->
       
        <textarea
          class="form-control mb-2 p-2"
          placeholder="Description"
          id="LongDescription"
          style="width: 100%; height: 150px"
          name="Description"
          v-model="Movie.Description"
        ></textarea>
 <span v-if="errors.Description" class="ms-3 text-danger">{{
          errors.Description
        }}</span>
        <!-- subimt button -->
        <button
          class="btn btn-danger mt-3 p-2"
          style="background-color: #f40612"
          type="submit"
        >
          Go
        </button>
      </form>
      <div style="margin-top: 500px"></div>
    </div>
  </div>
</template>

<script>
import Notifications from "../../../mixin/notificationMixin"
import AdminNavBar from "../../../components/Admin/AdminNavBar.vue";
import LanguageAPI from "../../../services/spoken_language.service";
import GenresAPI from "../../../services/genre.service";
import CompanyAPI from "../../../services/company.service";
import { string, object, array } from "yup";
import { useField, useForm } from "vee-validate";
import MovieApi from "../../../services/movie.service";
export default {
  name: "AdminAddMovie",
  mixins:[Notifications],
  components: {
    AdminNavBar,
  },
  data() {
    let Movie = {
      MovieName: "",
      Original_language: "",
      Description: "",
      Genres: [],
      ReleaseDate: "",
      Production_companies: [],
    };
    const validationSchema = object({
      MovieName: string().required().min(3),
      Original_language: string().required(),
      Description: string().min(50).required(),
      Genres: array().required(),
      ReleaseDate: string().required(),
      Production_companies: array().required(),
    });

    const { handleSubmit, errors } = useForm({
      validationSchema,
      initialValues: {},
    });

    const { value: MovieName } = useField("MovieName");
    const { value: Original_language } = useField("Original_language");
    const { value: Description } = useField("Description");
    const { value: Genres} = useField("Genres");
    const { value: ReleaseDate } = useField("ReleaseDate");
    const { value: Production_companies } = useField("Production_companies");

    const handleChange = (event) => {
      
      const fieldName = event.target.name;
      const fieldValue = parseInt(event.target.value);
      const isChecked = event.target.checked;
      if(!Movie[fieldName].value && isChecked){
        Movie[fieldName].value = [fieldValue];
      }
      else {
         if(isChecked){
           Movie[fieldName].value.push(fieldValue);
         }
         else {
           let index = Movie[fieldName].value.indexOf(fieldValue);
           Movie[fieldName].value.splice(index,1);
         }
      }   
    };

    Movie.MovieName = MovieName;
    Movie.Original_language = Original_language;
    Movie.Description = Description;
    Movie.Genres = Genres;
    Movie.ReleaseDate = ReleaseDate;
    Movie.Production_companies = Production_companies;

    const submit = handleSubmit((values) => {
      this.error = "";
      this.createMovie(values);
    },(anyError)=>{
      console.log(anyError);
    });
    return {
      language: [],
      Genres_array: [],
      companies: [],
      // MovieName,
      // Original_language,
      // Spoken_languages,
      // Description,
      // Genres,
      // ReleaseDate,
      // Production_companies,
      handleChange,
      Movie,
      error: "",
      errors,
      submit,
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
      this.Genres_array = res.data;
    });
    CompanyAPI.getAllCompany().then((res) => {
      this.companies = res.data.CompanyList;
    });
  },
  methods: {
    async createMovie(movie_data) {
      await MovieApi.createAnMovie(movie_data).then((res) => {
        console.log(res);
        Notifications("Successfully created movie", "success")
      });
    },
  },
};
</script>

<style scoped src="../../../Style/addmovie_series.css">
</style>