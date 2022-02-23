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
              >Add Country</label
            >

            <input
              id="Number_input"
              class="form_input form-control ms-3 mt-2 p-2"
              type="number"
              placeholder="CountryCode"
              :error="errors.CountryCode"
              v-model="CountryCode"
              @change="handleChange"
              name="CountryCode"
            />
            <span v-if="errors.CountryCode" class="ms-3 form_error_massage">{{
              errors.CountryCode
            }}</span>

            <input
              class="form_input form-control m-3 p-2"
              type="text"
              placeholder="Name"
              name="CountryName"
              :error="errors.CountryName"
              v-model="CountryName"
              @change="handleChange"
            />
            <span v-if="errors.CountryName" class="ms-3 form_error_massage">{{
              errors.CountryName
            }}</span>

            <input
              class="form_input form-control m-3 p-2"
              type="text"
              placeholder="ShortForm"
              name="CountryShortForm"
              :error="errors.CountryShortForm"
              v-model="CountryShortForm"
              @change="handleChange"
            />
            <span
              v-if="errors.CountryShortForm"
              class="ms-3 form_error_massage"
              >{{ errors.CountryShortForm }}</span
            >

            <button class="form_input_button btn btn-danger m-3 p-2 w-100">
              Add
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
import CountryApi from "../../../services/country.service";
import Notifications from "../../../mixin/notificationMixin";
export default {
  name: "AdminAddCountry",
  mixins: [Notifications],
  components: {
    AdminNavBar,
    Footer,
  },
  created() {
    document.title = `NetflixAdmin - AddCountry`;
  },
  data() {
    const validationSchema = object({
      CountryCode: string(),
      CountryName: string(),
      CountryShortForm: string(),
    });

    const { handleSubmit, setFieldValue, errors } = useForm({
      validationSchema,
      initialValues: {},
    });

    const handleChange = (event) => {
      setFieldValue(event.target.name, event.target.value);
    };

    const { value: CountryCode } = useField("CountryCode");
    const { value: CountryName } = useField("CountryName");
    const { value: CountryShortForm } = useField("CountryShortForm");

    const submit = handleSubmit((value) => {
      this.error = "";
      this.AddCountry(value);
    });

    return {
      CountryCode,
      CountryName,
      CountryShortForm,
      submit,
      handleChange,
      errors,
      error: "",
    };
  },

  methods: {
    async AddCountry(data1) {
      await CountryApi.createCountry({ country_data: data1 })
        .then(() => {
          Notifications("Successfully Add Country ", "success");
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