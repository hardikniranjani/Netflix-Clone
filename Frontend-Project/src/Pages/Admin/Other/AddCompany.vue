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
              >Add Company</label
            >

            <input
              class="form_input form-control m-3 p-2"
              type="number"
              placeholder="Name"
              :error="errors.Name"
              :modelValue="Name"
              @change="handleChangeName"
            />
            <span v-if="errors.Name" class="ms-3 form_error_massage">{{
              errors.Name
            }}</span>

            <input
              class="form_input form-control m-3 p-2"
              type="text"
              placeholder="Origin Country"
              :error="errors.Origin_country"
              :modelValue="Origin_country"
              @change="handleChangeOrigin_country"
            />
            <span
              v-if="errors.Origin_country"
              class="ms-3 form_error_massage"
              >{{ errors.Origin_country }}</span
            >

            <input
              class="form_input form-control m-3 p-2"
              type="text"
              placeholder="Founded"
              :error="errors.Founded"
              :modelValue="Founded"
              @change="handleChangeFounded"
            />
            <span v-if="errors.Founded" class="ms-3 form_error_massage">{{
              errors.Founded
            }}</span>

            <input
              class="form_input form-control m-3 p-2"
              type="text"
              placeholder="Founders"
              :error="errors.Founders"
              :modelValue="Founders"
              @change="handleChangeFounders"
            />
            <span v-if="errors.Founders" class="ms-3 form_error_massage">{{
              errors.Founders
            }}</span>

            <input
              class="form_input form-control m-3 p-2"
              type="text"
              placeholder="CEO"
              :error="errors.CEO"
              :modelValue="CEO"
              @change="handleChangeCEO"
            />
            <span v-if="errors.CEO" class="ms-3 form_error_massage">{{
              errors.CEO
            }}</span>

            <input
              class="form_input form-control m-3 p-2"
              type="text"
              placeholder="Address"
              :error="errors.Address"
              :modelValue="Address"
              @change="handleChangeAddress"
            />
            <span v-if="errors.Address" class="ms-3 form_error_massage">{{
              errors.Address
            }}</span>

            <input
              class="form_input form-control m-3 p-2"
              type="text"
              placeholder="Headquaters"
              :error="errors.Headquaters"
              :modelValue="Headquaters"
              @change="handleChangeHeadquaters"
            />
            <span v-if="errors.Headquaters" class="ms-3 form_error_massage">{{
              errors.Headquaters
            }}</span>

            <input
              class="form_input form-control m-3 p-2"
              type="text"
              placeholder="Description"
              :error="errors.Description"
              :modelValue="Description"
              @change="handleChangeDescription"
            />
            <span v-if="errors.Description" class="ms-3 form_error_massage">{{
              errors.Description
            }}</span>

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
import CompanyApi from "../../../services/company.service";
export default {
  name: "AdminAddCompany",
  components: {
    AdminNavBar,
    Footer,
  },
  created() {
    document.title = `NetflixAdmin - AddCompany`;
  },
  data() {
    const validationSchema = object({
      Name: string().required(),
      Origin_country: string().required(),
      Founded: string().required(),
      Founders: string().required(),
      CEO: string().required(),
      Address: string().required(),
      Headquaters: string().required(),
      Description: string().required(),
    });

    const { handleSubmit, setFieldValue, errors } = useForm({
      validationSchema,
      initialValues: {},
    });

    const handleChangeName = (event) => {
      setFieldValue("Name", event.target.value);
    };

    const handleChangeOrigin_country = (event) => {
      setFieldValue("Origin_country", event.target.value);
    };
    const handleChangeFounded = (event) => {
      setFieldValue("Founded", event.target.value);
    };
    const handleChangeFounders = (event) => {
      setFieldValue("Founders", event.target.value);
    };
    const handleChangeCEO = (event) => {
      setFieldValue("CEO", event.target.value);
    };
    const handleChangeAddress = (event) => {
      setFieldValue("Address", event.target.value);
    };
    const handleChangeHeadquaters = (event) => {
      setFieldValue("Headquaters", event.target.value);
    };
    const handleChangeDescription = (event) => {
      setFieldValue("Description", event.target.value);
    };

    const { value: Name } = useField("Name");

    const { value: Origin_country } = useField("Origin_country");
    const { value: Founded } = useField("Founded");
    const { value: Founders } = useField("Founders");
    const { value: CEO } = useField("CEO");

    const { value: Address } = useField("Address");
    const { value: Headquaters } = useField("Headquaters");
    const { value: Description } = useField("Description");

    const submit = handleSubmit((value) => {
      this.error = "";
      this.AddCompany(value);
    });

    return {
      Name,
      Origin_country,
      Founded,
      Founders,
      CEO,
      Address,
      Headquaters,
      Description,
      submit,
      handleChangeName,
      handleChangeOrigin_country,
      handleChangeFounded,
      handleChangeFounders,
      handleChangeCEO,
      handleChangeAddress,
      handleChangeHeadquaters,
      handleChangeDescription,
      errors,
      error: "",
    };
  },

  methods: {
    async AddCompany(data1) {
      await CompanyApi.createCompany({ data1 })
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