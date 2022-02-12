<template>
  <div class="login_main">
    <div class="login__body container-fluid">
      <div class="login__header container-fluid p-5 d-inline-flex mt-0">
        <img src="../assets/LogoRTX.png" v-on:click="home" />
        <button
          type="button"
          class="btn btn-danger"
          style="float: right; z-index: 2"
          v-on:click="signup"
        >
          Sign Up
        </button>
      </div>
      <form @submit="submit">
        <fieldset>
          <div class="login__body_form p-5 mb-5" style="z-index: 2">
            <label class="text-white mx-auto my-auto mb-3" style="z-index: 2"
              >Login</label
            >
            <input
              class="form-control my-3 ps-3"
              type="email"
              placeholder="Email"
              :error="errors.Email"
              :modelValue="Email"
              @change="handleChangeEmail"
            />
            <span>{{ errors.Email }}</span>
            <input
              class="form-control my-3 ps-3"
              type="password"
              placeholder="Password"
              :error="errors.Password"
              :modelValue="Password"
              @change="handleChangePassword"
            />
            <span>{{ errors.Password }}</span>

            <button class="btn btn-danger my-3">Login</button>

            <p style="float: left; z-index: 2">
              Forgot your password ?
              <router-link
                style="text-decoration: none"
                :to="{ name: 'ForgotPassword' }"
                >Click Here
              </router-link>
            </p>
          </div>
        </fieldset>
      </form>

      <div class="login__footer">
        <p class="p-4 mb-0 text-white">@Ott Platform</p>
      </div>
    </div>
  </div>
</template>

<script>
import { string, object } from "yup";
import { useField, useForm } from "vee-validate";
import userService from "../services/user.service";

export default {
  name: "LoginPage",
  components: {},
  created() {
    document.title = "Netflix - Login";
  },
  data() {
    const validationSchema = object({
      Email: string().required().email(),
      Password: string().required(),
    });

    const { handleSubmit, setFieldValue, errors } = useForm({
      validationSchema,
      initialValues: {},
    });

    const handleChangeEmail = (event) => {
      setFieldValue("Email", event.target.value);
    };

    const handleChangePassword = (event) => {
      setFieldValue("Password", event.target.value);
    };

    const { value: Email } = useField("Email");
    const { value: Password } = useField("Password");

    const submit = handleSubmit((value) => {
      this.error = "";
      this.LoginUser(value);
    });

    return {
      Email,
      Password,
      submit,
      errors,
      handleChangeEmail,
      handleChangePassword,
      error: "",
    };
  },

  methods: {
    Submit() {
      console.log("Submitted");
    },
    signup() {
      this.$router.replace({ name: "IndexPage" });
    },
    home() {
      this.$router.replace({ name: "IndexPage" });
    },

    async LoginUser(data) {
      userService
        .getAnUser({ email: data.Email, password: data.Password })
        .then((res) => {
          console.log(res.data.Role);
          this.$store.dispatch("ADD_TOKEN", res.headers["x-access-token"]);
          this.$store.dispatch("ADD_USER", res.data);
          if (res.data.Role == "user") {
            this.$router.replace({ name: "HomePage" });
          } else {
            this.$router.replace({ name: "AdminHomePage" });
          }
        })
        .catch(() => {
          alert("Email or password is incorrect!");
        });
    },
  },
};
</script>

<style scoped src="../Style/login.css">
</style>