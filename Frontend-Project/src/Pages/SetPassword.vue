<template>
  <div class="login_main">
    <div class="login__body container-fluid">
      <div class="login__header container-fluid p-5 d-inline-flex mt-0">
        <img src="../assets/LogoRTX.png" v-on:click="home" />
        <button
          type="button"
          class="btn btn-danger"
          style="float: right; z-index: 2"
          v-on:click="login"
        >
          Login
        </button>
      </div>
      <form @submit="submit">
        <fieldset>
          <div class="login__body_form p-5 mb-5" style="z-index: 2">
            <h3 class="text-white mx-auto my-auto mb-3" style="z-index: 2">
              Set Password
            </h3>

            <input
              class="form-control my-3 ps-3"
              type="password"
              placeholder="Enter your Password"
              :error="errors.Password1"
              :modelValue="Password1"
              @change="handleChangePassword1"
            />
            <span>{{ errors.Password1 }}</span>

            <input
              class="form-control my-3 ps-3"
              type="password"
              placeholder="Confrom your Password"
              :error="errors.Password2"
              :modelValue="Password2"
              @change="handleChangePassword2"
            />
            <span>{{ errors.Password2 }}</span>

            <button class="btn btn-danger my-3">Submit</button>
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

export default {
  name: "SetPassword",
  components: {},
  created() {
    document.title = "Netflix - Set Password";
  },
  data() {
    const validationSchema = object({
      Password1: string().required(),
      Password2: string().required(),
    });

    const { handleSubmit, setFieldValue, errors } = useForm({
      validationSchema,
      initialValues: {},
    });

    const handleChangePassword1 = (event) => {
      setFieldValue("Password1", event.target.value);
    };
        const handleChangePassword2 = (event) => {
      setFieldValue("Password2", event.target.value);
    };

    const { value: Password1 } = useField("Password1");
    const { value: Password2 } = useField("Password2");

    const submit = handleSubmit((value) => {
      this.error = "";
      this.LoginUser(value);
    });

    return {
      Password1,
      Password2,
      submit,
      errors,
      handleChangePassword1,
      handleChangePassword2,
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
  },
};
</script>

<style scoped src="../Style/login.css">
</style>