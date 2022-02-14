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
              >Edit Country</label
            >
            <h4 class="ms-3 mt-2">Code</h4>
            <input
              id="Number_input"
              class="form_input form-control ms-3 mt-2 p-2"
              type="number"
              placeholder="CountryCode"
              :error="errors.CountryCode"
              :modelValue="CountryCode"
              @change="handleChangeCountryCode"
            />
            <span v-if="errors.CountryCode" class="ms-3 form_error_massage">{{
              errors.CountryCode
            }}</span>

            <h4 class="ms-3 mt-3">Name</h4>
            <input
              id="Name_input"
              class="form_input form-control ms-3 mt-2 p-2"
              type="text"
              placeholder="Name"
              :error="errors.CountryName"
              :modelValue="CountryName"
              @change="handleChangeCountryName"
            />
            <span v-if="errors.CountryName" class="ms-3 form_error_massage">{{
              errors.CountryName
            }}</span>

            <h4 class="ms-3 mt-3">ShortForm</h4>
            <input
              id="ShortForm_input"
              class="form_input form-control ms-3 mt-2 p-2"
              type="text"
              placeholder="ShortForm"
              :error="errors.CountryShortForm"
              :modelValue="CountryShortForm"
              @change="handleChangeCountryShortForm"
            />
            <span v-if="errors.CountryShortForm" class="ms-3 form_error_massage">{{
              errors.CountryShortForm
            }}</span>

            <button
              class="form_input_button btn btn-danger mt-3 ms-3 p-2 w-100"
            >
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
import CountryApi from "../../../services/country.service";
export default {
  name: "AdminEditCountry",
  components: {
    AdminNavBar,
    Footer,
  },
  props: {
    id: String,
  },
  created() {
    document.title = `NetflixAdmin - EditCountry`;
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

    const handleChangeCountryCode = (event) => {
      setFieldValue("CountryCode", event.target.value);
    };
    const handleChangeCountryName = (event) => {
      setFieldValue("CountryName", event.target.value);
    };
    const handleChangeCountryShortForm = (event) => {
      setFieldValue("CountryShortForm", event.target.value);
    };

    const { value: CountryCode } = useField("CountryCode");
    const { value: CountryName } = useField("CountryName");
    const { value: CountryShortForm } = useField("CountryShortForm");

    const submit = handleSubmit((value) => {
      this.error = "";
      this.EditCountry(value);
    });

    return {
      CountryCode,
      CountryName,
      CountryShortForm,
      submit,
      handleChangeCountryCode,
      handleChangeCountryName,
      handleChangeCountryShortForm,
      errors,
      error: "",
    };
  },

  methods: {
    async EditCountry(data1) {
      console.log(this.id);
      await CountryApi.updateCountry({ country_id: this.id, country_data:data1 })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  async mounted() {
    await CountryApi.getCountry({
      country_id: this.id,
    })
      .then((res) => {
        document.getElementById("Number_input").value = res.data.CountryCode;
        document.getElementById("Name_input").value = res.data.CountryName;
        document.getElementById("ShortForm_input").value = res.data.CountryShortForm;
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