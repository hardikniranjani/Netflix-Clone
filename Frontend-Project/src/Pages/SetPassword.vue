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
            <AlertMessage
            v-if="showAlert"
            :message="msg"
            :typeAlert="typeAlert"
            :icon="icon"
          />
            <h3 class="text-white mx-auto my-auto mb-3" style="z-index: 2">
              Set Password
            </h3>

            <input
              class="form-control my-3 ps-3"
              type="password"
              placeholder="Enter Password"
              :error="errors.Password1"
              :modelValue="Password1"
              @change="handleChangePassword1"
            />
            <span  v-if="errors.Password1"> <ul>
                <li :class="lengthOfPassword(Password1)">
                  Minimum 8 and Maximum 10 characters are required.
                </li>
                <li :class="upperCaseOfPassword(Password1)">
                  Atleast One Upper Case character is required.
                </li>
                <li :class="lowerCaseOfPassoword(Password1)">Atleast One Lower Case character is required.</li>
                <li :class="digitOfPassword(Password1)">Atleast One Number is required.</li>
                <li :class="specialCharOfPassword(Password1)">Atleast One Special Character is required.</li>
              </ul></span>

            <input
              class="form-control my-3 ps-3"
              type="password"
              placeholder="Confirm Password"
              :error="errors.Password2"
              :modelValue="Password2"
              @change="handleChangePassword2"
            />
           <span  v-if="errors.Password2"> <ul>
                <li :class="lengthOfPassword(Password2)">
                  Minimum 8 and Maximum 10 characters are required.
                </li>
                <li :class="upperCaseOfPassword(Password2)">
                  Atleast One Upper Case character is required.
                </li>
                <li :class="lowerCaseOfPassoword(Password2)">Atleast One Lower Case character is required.</li>
                <li :class="digitOfPassword(Password2)">Atleast One Number is required.</li>
                <li :class="specialCharOfPassword(Password2)">Atleast One Special Character is required.</li>
              </ul></span>
            <div v-if="loading">
              <img
                class="my-2"
                :src="require('../../public/loading.gif')"
                style="width: 100%; height: 30px"
              />
            </div>
            <button v-else class="btn btn-danger my-3">Submit</button>
          </div>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
import { string, object } from "yup";
import { useField, useForm } from "vee-validate";
import UserApi from "../services/user.service";
import AlertMessage from "../components/AlertMessage.vue";
import passwordMixin from "../mixin/passwordMixin";
export default {
  name: "SetPassword",
  mixins : [passwordMixin],
  components: {
    AlertMessage,
  },
  props: {
    token: String,
  },
  created() {
    document.title = "Netflix - Set Password";
  },
  data() {
    const validationSchema = object({
      Password1: string().required().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-+_!@#$%^&*., ?])[A-Za-z\d-+_!@#$%^&*., ?]{8,10}$/),
      Password2: string().required().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-+_!@#$%^&*., ?])[A-Za-z\d-+_!@#$%^&*., ?]{8,10}$/),
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
      
      if (Password1.value !== Password2.value) {
        this.showAlert = true;
        this.msg = "Password and Confirm Password must be same.";
        this.icon = "warning";
        this.typeAlert = "danger";
        setTimeout(this.clearAlert, 8 * 1000);
        return;
      }
      this.error = "";
      this.SetPassword(value.Password1);
    });

    return {
      Password1,
      Password2,
      submit,
      errors,
      handleChangePassword1,
      handleChangePassword2,
      error: "",
      showAlert: false,
      msg: "",
      typeAlert: "",
      icon: "",
      loading : false
    };
  },
  methods: {
    login() {
      this.$router.replace({ name: "LogInPage" });
    },
    home() {
      this.$router.replace({ name: "IndexPage" });
    },
    async SetPassword(password) {
      this.loading = true;
      await UserApi.changePassword({ token: this.token, password: password })
        .then((res) => {
          this.Password1 = "";
          this.Password2 = "";
          this.msg = res.data.msg;
          this.icon = "warning";
          this.typeAlert = "danger";
          this.showAlert = true;
          setTimeout(() => {
            this.$router.replace({ name: "LogInPage" })
          }, 4*1000);
        })
        .catch((err) => {
          this.msg = err.response.data.msg;
          this.icon = "warning";
          this.typeAlert = "danger";
          this.showAlert = true;
          this.Password1 = "";
          this.Password2 = "";
          setTimeout(this.clearAlert, 5 * 1000);
        }).finally(()=>{
          this.loading =false;
        })
    },
    clearAlert() {
      this.msg = "";
      this.icon = "";
      this.typeAlert = "";
      this.showAlert = false;
    },
  },
};
</script>

<style scoped src="../Style/login.css">
</style>