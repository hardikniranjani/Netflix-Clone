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
            <div>
              <AlertMessage
                v-if="showAlert"
                :message="msg"
                :typeAlert="typeAlert"
                :icon="icon"
              />
            </div>

            <h2 class="text-white mx-auto my-auto mb-3" style="z-index: 2">
              Forgot Password
            </h2>

            <input
              class="form-control my-3 ps-3"
              type="email"
              placeholder="Enter your Email Id"
              :error="errors.Email"
              :modelValue="Email"
              @change="handleChangeEmail"
            />
            <span>{{ errors.Email }}</span>

            <div v-if="loading">
              <img
                class="my-2"
                :src="require('../../public/loading.gif')"
                style="width: 100%; height: 20px"
              />
            </div>
            <button v-else class="btn btn-danger my-3">Submit</button>
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
import UserApi from "../services/user.service";
import AlertMessage from "../components/AlertMessage.vue";
// import Loader from "../components/Loader.vue";
export default {
  name: "ForgotPassword",
  components: {
    AlertMessage,
    // Loader,
  },
  created() {
    document.title = "Netflix - Forgot Password";
  },
  data() {
    const validationSchema = object({
      Email: string().required().email(),
    });

    const { handleSubmit, setFieldValue, errors } = useForm({
      validationSchema,
      initialValues: {},
    });

    const handleChangeEmail = (event) => {
      setFieldValue("Email", event.target.value);
    };

    const { value: Email } = useField("Email");

    const submit = handleSubmit((value) => {
      this.error = "";
      this.loading = true;
      UserApi.forgotPasword({ email: value.Email })
        .then((res) => {
          this.showAlert = true;
          this.icon = "success";
          this.msg = res.data.msg;
          this.typeAlert = "success";
          // this.clearAlert();
        })
        .catch((err) => {
          this.showAlert = true;
          this.icon = "warning";
          this.msg = err.response.data.msg;
          this.typeAlert = "danger";
          // this.clearAlert();
        })
        .finally(() => {
          this.loading = false;
        });
    });

    return {
      Email,
      submit,
      errors,
      handleChangeEmail,
      error: "",
      mail: true,
      showAlert: false,
      typeAlert: "",
      msg: "",
      loading: false,
      path: "../../public/Ellipsid.gif",
      icon: "",
    };
  },

  methods: {
    login() {
      this.$router.replace({ name: "LogInPage" });
    },
    home() {
      this.$router.replace({ name: "IndexPage" });
    },
    clearAlert() {
      setTimeout(() => {
        this.showAlert = false;
      }, 10 * 1000);
    },
  },
};
</script>

<style scoped src="../Style/login.css">
</style>