<template>
  <div class="main_class">
    <div class="nav"><AdminNavBar /></div>
    <div class="main_classbody">
      <form class="container" style="object-fit: contain" @submit="submit">
        <fieldset>
          <div class="p-5 mb-5" style="z-index: 2">
            <label
              class="form_title text-white mx-auto my-auto mb-3 ms-3"
              style="z-index: 2"
              >Edit Genres</label
            >
            <h4 class="ms-3 mt-3">Name</h4>
            <input
              id="Name_input"
              class="form_input form-control ms-3 p-2"
              type="text"
              placeholder="Name"
              :error="errors.Name"
              :modelValue="Name"
              @change="handleChangeName"
            />
            <span v-if="errors.Name" class="ms-3 form_error_massage">{{
              errors.Name
            }}</span>

            <button class="form_input_button btn btn-danger m-3 p-2 w-100">
              Edit
            </button>
          </div>
        </fieldset>
      </form>
    </div>
    <div class="footer"><Footer /></div>
  </div>
</template>

<script>
import { string, object } from "yup";
import { useField, useForm } from "vee-validate";
import AdminNavBar from "../../../components/Admin/AdminNavBar.vue";
import Footer from "../../..//components/Footer.vue";
import GenresApi from "../../../services/genre.service";
export default {
  name: "AdminEditGenres",
  components: {
    AdminNavBar,
    Footer,
  },
  props: {
    id: String,
  },
  created() {
    document.title = `NetflixAdmin - EditGenres`;
  },
  data() {
    const validationSchema = object({
      Name: string().required(),
    });

    const { handleSubmit, setFieldValue, errors } = useForm({
      validationSchema,
      initialValues: {},
    });

    const handleChangeName = (event) => {
      setFieldValue("Name", event.target.value);
    };

    const { value: Name } = useField("Name");

    const submit = handleSubmit((value) => {
      this.error = "";
      this.EditGenres(value);
    });

    return {
      Name,
      submit,
      handleChangeName,
      errors,
      error: "",
    };
  },

  methods: {
    async EditGenres(data1) {
      await GenresApi.updateGenre({ genres: data1.GenreName })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  async mounted() {
    await GenresApi.getGenre({
      genre_id: this.id,
    })
      .then((res) => {
        console.log(res.data);
        document.getElementById("Name_input").value = res.data.GenresName;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped src="../../../Style/login.css">
</style>

<style>
.main_class {
  width: 100%;
  height: 100%;
}
.nav {
  margin-top: 0px;
}
.main_classbody {
  margin-top: 200px;
}
.footer {
  margin-top: 470px;
}
</style>