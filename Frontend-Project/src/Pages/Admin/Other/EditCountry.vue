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
              v-model="country.CountryCode"
              @change="handleChange"
              name="CountryCode"
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
              v-model="country.CountryName"
              @change="handleChange"
              name="CountryName"
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
              v-model="country.CountryShortForm"
              @change="handleChange"
              name="CountryShortForm"
            />

            <span
              v-if="errors.CountryShortForm"
              class="ms-3 form_error_massage"
              >{{ errors.CountryShortForm }}</span
            >

            <button
              class="form_input_button btn btn-danger mt-3 ms-3 p-2 w-100"
              :class="[checkValuesChanged ? 'active' : 'disabled']"
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
import { string, object, number } from "yup";
import { useField, useForm } from "vee-validate";
import AdminNavBar from "../../../components/Admin/AdminNavBar.vue";
import Footer from "../../..//components/Footer.vue";
import CountryApi from "../../../services/country.service";
import Notifications from "../../../mixin/notificationMixin";

export default {
  name: "AdminEditCountry",
  mixins:[Notifications],
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
      CountryCode: number(),
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
      this.EditCountry(value);
    });

    return {
      country: {
        CountryCode,
        CountryName,
        CountryShortForm,
      },
      submit,
      handleChange,
      errors,
      error: "",
      previousValues: {
        CountryCode,
        CountryName,
        CountryShortForm,
      },
    };
  },
  computed: {
    checkValuesChanged() {
      let change = false;
      for (const property in this.previousValues) {
        if (this.country[property] !== this.previousValues[property]) {
          change = true;
        }
      }
      return change;
    },
  },

  methods: {
    async EditCountry(data1) {
      await CountryApi.updateCountry({
        country_id: this.id,
        country_data: data1,
      })
        .then(() => {
          Notifications("Successfully Update Country data", "success")
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
        this.country = { ...res.data };
        this.previousValues = { ...res.data };
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