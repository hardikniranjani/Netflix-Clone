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
              placeholder="Code"
              :error="errors.Code"
              :modelValue="Code"
              @change="handleChangeCode"
            />
            <span v-if="errors.Code" class="ms-3 form_error_massage">{{
              errors.Code
            }}</span>

            <h4 class="ms-3 mt-3">Name</h4>
            <input
              id="Name_input"
              class="form_input form-control ms-3 mt-2 p-2"
              type="text"
              placeholder="Name"
              :error="errors.Name"
              :modelValue="Name"
              @change="handleChangeName"
            />
            <span v-if="errors.Name" class="ms-3 form_error_massage">{{
              errors.Name
            }}</span>

            <h4 class="ms-3 mt-3">Monthly Price</h4>
            <input
              id="Monthly_price_input"
              class="form_input form-control ms-3 mt-2 p-2"
              type="text"
              placeholder="Monthly Price"
              :error="errors.Monthly_price"
              :modelValue="Monthly_price"
              @change="handleChangeMonthly_price"
            />
            <span v-if="errors.Monthly_price" class="ms-3 form_error_massage">{{
              errors.Monthly_price
            }}</span>

            <h4 class="ms-3 mt-3">Available Screen</h4>
            <input
              id="Number_of_screen_available_input"
              class="form_input form-control ms-3 mt-2 p-2"
              type="text"
              placeholder="Available Screen"
              :error="errors.Number_of_screen_available"
              :modelValue="Number_of_screen_available"
              @change="handleChangeNumber_of_screen_available"
            />
            <span v-if="errors.Number_of_screen_available" class="ms-3 form_error_massage">{{
              errors.Number_of_screen_available
            }}</span>

            <h4 class="ms-3 mt-3">Max video quality</h4>
            <input
              id="Max_video_quality_input"
              class="form_input form-control ms-3 mt-2 p-2"
              type="text"
              placeholder="Max video quality"
              :error="errors.Max_video_quality"
              :modelValue="Max_video_quality"
              @change="handleChangeMax_video_quality"
            />
            <span v-if="errors.Max_video_quality" class="ms-3 form_error_massage">{{
              errors.Max_video_quality
            }}</span>

            <h4 class="ms-3 mt-3">Devices</h4>
            <input
              id="Devices_input"
              class="form_input form-control ms-3 mt-2 p-2"
              type="text"
              placeholder="Devices"
              :error="errors.Devices"
              :modelValue="Devices"
              @change="handleChangeDevices"
            />
            <span v-if="errors.Devices" class="ms-3 form_error_massage">{{
              errors.Devices
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
  name: "AdminEditSubscription",
  components: {
    AdminNavBar,
    Footer,
  },
  props: {
    id: String,
  },
  created() {
    document.title = `NetflixAdmin - EditPlan`;
  },
  data() {
    const validationSchema = object({
      Code: string().required(),
      Name: string().required(),
      ShortForm: string().required(),
    });

    const { handleSubmit, setFieldValue, errors } = useForm({
      validationSchema,
      initialValues: {},
    });

    const handleChangeCode = (event) => {
      setFieldValue("Code", event.target.value);
    };
    const handleChangeName = (event) => {
      setFieldValue("Name", event.target.value);
    };
    const handleChangeShortForm = (event) => {
      setFieldValue("ShortForm", event.target.value);
    };

    const { value: Code } = useField("Code");
    const { value: Name } = useField("Name");
    const { value: ShortForm } = useField("ShortForm");

    const submit = handleSubmit((value) => {
      this.error = "";
      this.EditCountry(value);
    });

    return {
      Code,
      Name,
      ShortForm,
      submit,
      handleChangeCode,
      handleChangeName,
      handleChangeShortForm,
      errors,
      error: "",
    };
  },

  methods: {
    async EditCountry(data1) {
      await CountryApi.updateCountry({ data1 })
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
        document.getElementById("ShortForm_input").value =
          res.data.CountryShortForm;
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