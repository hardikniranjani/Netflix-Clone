<template>
  <div class="index_main">
    <div class="index__body container-fluid">
      <div class="index__header container-fluid p-5 d-inline-flex mt-0">
        <img src="../assets/Logo1.png" v-on:click="home" />

        <button
          type="button"
          class="btn btn-danger"
          style="float: right; z-index: 2"
          v-on:click="login"
        >
          Login
        </button>
      </div>
      <div class="container index__body_mid">
        <h1 class="head1 display-3 mx-auto my-auto text-white">
          Unlimited movies, TV shows and more.
        </h1>
        <h4 class="head2 mx-auto my-auto text-white mt-2">
          Watch anywhere. Cancel anytime.
        </h4>
        <div class="index__body_mid_signup_main" style="z-index: 2">
          <p class="head3 lead mx-auto my-auto text-white mt-3 mb-3">
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>
          <div v-if="showAlert">
            <Alert :message="alertMsg" :typeAlert="typeOfAlert" />
          </div>
          <form @submit="submit">
            <fieldset>
              <div
                class="index__body_mid_signup d-inline-flex"
                style="z-index: 2"
              >
                <input
                  class="form-control"
                  type="email"
                  placeholder="Email"
                  :error="errors.Email"
                  :modelValue="Email"
                  @change="handleChangeEmail"
                />

                <button class="btn btn-danger p-3 text-white">
                  Get Started >
                </button>
              </div>
              <span
                class="index__body_mid_signup_error"
                v-html="errors.Email"
              ></span>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
    <div class="index__footer">
      <p
        class="w-100 h-100 p-4 mb-0 text-white"
        style="background-color: #000000; z-index: 2; text-align: center"
      >
        @Ott Platform
      </p>
    </div>
  </div>
</template>

<script>
import { string, object } from "yup";
import { useField, useForm } from "vee-validate";
import UserApi from "../services/user.service";
import Alert from "../components/AlertMessage.vue";
export default {
  name: "indexPage",
  components: {
    Alert,
  },

  created() {
    document.title = "Netflix";
  },
  data() {
    const validationSchema = object({
      Email: string()
        .required()
        .email()
        .matches(
          /^[A-z0-9]{1,}[@][A-z]{1,}[.][a-z]{1,3}$/gi,
          `<pre>Email must have following values :
      1)@ 2).com </pre>`
        ),
    });
    const { handleSubmit, setFieldValue, errors } = useForm({
      validationSchema,
      initialValues: {},
    });

    const handleChangeEmail = (event) => {
      setFieldValue("Email", event.target.value);
    };

    const { value: Email } = useField("Email");

    const submit = handleSubmit(() => {
      UserApi.signUpEmail(Email.value)
        .then((res) => {
          this.alertMsg = res.data;
          this.typeOfAlert = "primary";
          this.showAlert = true;
        })
        .catch((err) => {
          this.typeOfAlert = "danger";
          this.alertMsg = err.response.data;
          this.showAlert = true;
        })
        .finally(() => {
          setTimeout(() => {
            this.showAlert = false;
            this.alertMsg = "";
          }, 5 * 1000);
        });
      this.error = "";
      // this.$router.replace({ name: "SignUpPage" });
    });
    return {
      Email,
      handleChangeEmail,
      submit,
      errors,
      error: "",
      loading: false,
      showAlert: false,
      typeOfAlert: "",
      alertMsg: "",
    };
  },
  methods: {
    login() {
      this.$router.replace({ name: "LogInPage" });
    },
    signup() {
      this.$router.replace({ name: "SignUpPage" });
    },
    home() {
      this.$router.replace({ name: "IndexPage" });
    },
  },
};
</script>

<style scoped src="../Style/index.css">
</style>