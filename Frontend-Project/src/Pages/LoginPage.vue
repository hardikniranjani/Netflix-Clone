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
            <Alert
              v-if="alertMsg"
              :message="alertMsg"
              :typeAlert="typeOfAlert"
              :icon="icon"
            />
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
            <div v-if="loading">
              <img
                class="my-2"
                :src="require('../../public/loading.gif')"
                style="width: 100%; height: 40px"
              />
            </div>
            <button v-else class="btn btn-danger my-3">Login</button>

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
        
      
    </div>
  </div>
</template>

<script>
import { string, object } from "yup";
import { useField, useForm } from "vee-validate";
import userService from "../services/user.service";
import Alert from "../components/AlertMessage.vue";
export default {
  name: "LoginPage",
  components: {
    Alert,
  },
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
      icon: "",
      typeOfAlert: "",  
      alertMsg: "",
      showAlert: false,
      loading: false,
    };
  },

  methods: {
    splitDate(date) {
      return date.split("/");
    },
    signup() {
      this.$router.replace({ name: "IndexPage" });
    },
    home() {
      this.$router.replace({ name: "IndexPage" });
    },
    compareDates(expiryDate) {
      let currentDateArray = this.splitDate(new Date().toLocaleDateString());
      let expiryDateArray = this.splitDate(
        new Date(expiryDate).toLocaleDateString()
      );
      let year = currentDateArray[2] <= expiryDateArray[2];
      let month = currentDateArray[0] <= expiryDateArray[0];
      let date = currentDateArray[1] <= expiryDateArray[1];

      
      if (year && month && date) {
        return true;
      }
      return false;
    },
    async LoginUser(data) {
      this.loading = true;
      userService
        .getAnUser({ email: data.Email, password: data.Password })
        .then((res) => {
          // let flag = this.compareDates(res.data.Plan_Expiry_Date_Time);
          let flag = true;  
          if (flag) {
            this.$store.dispatch("ADD_TOKEN", res.headers["x-access-token"]);
            this.$store.dispatch("ADD_USER", res.data);
            if (res.data.Role == "admin") {
              this.$router.replace({ name: "AdminMoviePage" });
            } else { 
              this.$router.replace({ name: "HomePage" });
            }
          } else {
            this.$router.replace({ name: "SubscriptionPlan" });
          }
        })
        .catch((err) => {
          console.log(err);
          this.alertMsg = "Email or password is incorrect!";
          this.showAlert = true;
          this.typeOfAlert = "danger";
          this.icon = "warning";
        })
        .finally(() => {
          this.loading = false;
          setTimeout(() => {
            this.showAlert = false;
            this.alertMsg = "";
            this.icon = "";
            this.typeOfAlert = "";
          }, 5 * 1000);
        });
    },
  },
};
</script>

<style scoped src="../Style/login.css">
</style>