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
              >Edit User</label
            >
            <input
              class="form_input form-control my-3 ps-3"
              type="text"
              placeholder="Name"
              :error="errors.Name"
              :modelValue="Name"
              @change="handleChangeName"
            />
            <span v-if="errors.Name" class="ms-3 form_error_massage">{{
              errors.Name
            }}</span>
            <input
              class="form_input form-control my-3 ps-3"
              type="email"
              placeholder="Email"
              :error="errors.Email"
              :modelValue="Email"
              @change="handleChangeEmail"
            />
            <span v-if="errors.Email" class="ms-3 form_error_massage">{{
              errors.Email
            }}</span>
            <input
              class="form_input form-control my-3 ps-3"
              type="password"
              placeholder="Password"
              :error="errors.Password"
              :modelValue="Password"
              @change="handleChangePassword"
            />
            <span v-if="errors.Password" class="ms-3 form_error_massage">{{
              errors.Password
            }}</span>

            <button class="form_input_button btn btn-danger mt-3 p-2 w-100">
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
import userApi from "../../../services/user.service";
export default {
  name: "AdminEditUser",
  components: {
    AdminNavBar,
    Footer,
  },
  created() {
    document.title = `NetflixAdmin - EditUser`;
  },
  data() {
    const validationSchema = object({
      Name: string().required().min(2),
      Email: string().required().email(),
      Password: string().required(),
    });

    const { handleSubmit, setFieldValue, errors } = useForm({
      validationSchema,
      initialValues: {},
    });

    const handleChangeName = (event) => {
      setFieldValue("Name", event.target.value);
    };

    const handleChangeEmail = (event) => {
      setFieldValue("Email", event.target.value);
    };

    const handleChangePassword = (event) => {
      setFieldValue("Password", event.target.value);
    };

    const { value: Name } = useField("Name");
    const { value: Email } = useField("Email");
    const { value: Password } = useField("Password");


    const submit = handleSubmit((value) => {
      this.error = "";
      this.EditUser(value);
      console.log(`${value.Email}`);
    });

    return {
      Name,
      Email,
      Password,
      submit,
      errors,
      handleChangeEmail,
      handleChangePassword,
      handleChangeName,
      error: "",
    };
  },

  methods: {
    async EditUser(data1) {
      await userApi.updateAnUser({ data1 })
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