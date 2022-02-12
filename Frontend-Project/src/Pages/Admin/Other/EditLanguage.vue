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
              >Edit Language</label
            >
            <input
              class="form_input form-control m-3 p-2"
              type="text"
              placeholder="Name"
              :error="errors.GenreName"
              :modelValue="GenreName"
              @change="handleChangeGenre"
            />
            <span v-if="errors.GenreName" class="ms-3 form_error_massage">{{
              errors.GenreName
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
import LanguageApi from "../../../services/spoken_language.service";
export default {
  name: "AdminEditLanguage",
  components: {
    AdminNavBar,
    Footer,
  },
  props: {
    id: String,
  },
  created() {
    document.title = `NetflixAdmin - EditLanguage`;
  },
  data() {
    const validationSchema = object({
      GenreName: string().required(),
    });

    const { handleSubmit, setFieldValue, errors } = useForm({
      validationSchema,
      initialValues: {},
    });

    const handleChangeGenre = (event) => {
      setFieldValue("GenreName", event.target.value);
    };

    const { value: GenreName } = useField("GenreName");

    const submit = handleSubmit((value) => {
      this.error = "";
      this.AddLanguage(value);
    });

    return {
      GenreName,
      submit,
      handleChangeGenre,
      errors,
      error: "",
    };
  },

  methods: {
    async AddLanguage(data1) {
      await LanguageApi.updateLanguage({ data1 })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
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