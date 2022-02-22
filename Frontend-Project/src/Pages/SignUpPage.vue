<template>
  <div class="signup_main">
    <div class="signup__body container-fluid">
      <div class="signup__header container-fluid p-5 d-inline-flex mt-0">
        <img src="../assets/LogoRTX.png" v-on:click="home" />
        <button
          type="button"
          class="btn btn-danger"
          style="float: right; z-index: 2"
          v-on:click="login"
        >
          Log in
        </button>
      </div>
      <form @submit="submit">
        <fieldset>
          <div class="signup__body_form p-5 mb-5">
            <label class="text-white mx-auto my-auto mb-3" style="z-index: 2"
              >Sign up</label
            >
            <input
              class="form-control my-3 ps-3"
              type="text"
              placeholder="Name"
              :error="errors.Name"
              :modelValue="Name"
              @change="handleChangeName"
            />
            <span>{{ errors.Name }}</span>
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
            <button class="btn btn-danger my-3">Sign up</button>
          </div>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
import { string, object } from "yup";
import { useField, useForm } from "vee-validate";
import userService from "../services/user.service";

export default {
  name: "SignUpPage",
  props: {
    token: String,
  },
  created() {
    document.title = "Netflix - Signup";
  },
  data() {
    const validationSchema = object({
      Name: string().required().min(2).matches(/^[A-z]+$/,"Must have characters only"),
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
      this.SignupUser(value);
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
    login() {
      this.$router.replace({ name: "LogInPage" });
    },
    home() {
      this.$router.replace({ name: "IndexPage" });
    },
    async SignupUser(data) {
      userService
        .createAnUser(
          {
            name: data.Name,
            email: data.Email,
            password: data.Password,
          },
          this.token
        )
        .then((res) => {
          console.log(res.headers["x-access-token"]);
          alert("Registered Successfully!");
          this.$store.dispatch("ADD_USER", res.data);
          this.$store.dispatch("ADD_TOKEN", res.headers["x-access-token"]);
          this.$router.replace({ name: "SubscriptionPlan" });
        })
        .catch((err) => {
          console.error(err);
          this.$router.replace({ name: "PageNotFound" });
        });
    },
  },
};
</script>

<style scoped src="../Style/signup.css">
</style>