<template>
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
        Unlimited movies, TV shows and more.<span class="index_expolre" @click="homepage">Explore></span>
      </h1>

      <h4 class="head2 mx-auto my-auto text-white mt-2">
        Watch anywhere. Cancel anytime.
      </h4>
      <div class="index__body_mid_signup_main" style="z-index: 2">
        <p class="head3 lead mx-auto my-auto text-white mt-3 mb-3">
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <div v-if="showAlert">
          <Alert
            class="Alert_massage"
            v-if="alertMsg"
            :message="alertMsg"
            :typeAlert="typeOfAlert"
            :icon="icon"
          />
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
              <div v-if="loading">
                <img
                  class="my-2"
                  :src="require('../../public/loading.gif')"
                  style="width: 100%; height: 40px"
                />
              </div>
              <button
                v-else
                class="btn btn-danger p-3 text-white signup_button"
              >
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
  <section class="style-cards">
    <div class="card-1">
      <div class="desc-1">
        <h1>Enjoy on your TV.</h1>
        <h3>
          Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray
          players and more.
        </h3>
      </div>
      <img src="../assets/tv.png" alt="Netflix TV" />
      <video class="video-1" autoplay="" playsinline="" muted="" loop="">
        <source src="../assets/One.mp4" type="video/mp4" />
      </video>
    </div>
    <div class="card-2">
      <img src="../assets/3.jpg" alt="Netflix Mobile" />
      <div class="desc-2">
        <h1>Download your shows to watch offline.</h1>
        <h3>Save your favourites easily and always have something to watch.</h3>
      </div>
    </div>
    <div class="card-3">
      <div class="desc-3">
        <h1>Watch everywhere.</h1>
        <h3>
          Stream unlimited movies and TV shows on your phone, tablet, laptop,
          and TV.
        </h3>
      </div>
      <img src="../assets/tv.png" alt="Netflix TV" />
      <video class="video-1" autoplay="" playsinline="" muted="" loop="">
        <source src="../assets/Two.mp4" type="video/mp4" />
      </video>
    </div>
    <div class="card-2">
      <img src="../assets/Child_Index.png" alt="Netflix Mobile" />
      <div class="desc-2">
        <h1>Create profiles for children.</h1>
        <h3>
          Send children on adventures with their favourite characters in a space
          made just for them—free with your membership.
        </h3>
      </div>
    </div>
  </section>
  <section class="lastsec">
    <div class="faq">
      <h1>Frequently Asked Questions</h1>
      <ul class="questions">
        <li>What is Netflix?</li>
        <li>How much does Netflix cost?</li>
        <li>Where can I watch?</li>
        <li>How do I cancel?</li>
        <li>What can I watch on Netflix?</li>
        <li>Is Netflix good for kids?</li>
      </ul>
      <p>Ready to watch? Click here to create or restart your membership.</p>
      <div class="input">
        <a href="#" class="btn btn-danger"><button>GET STARTED ></button></a>
      </div>
    </div>
  </section>
  <div class="card-1 mt-5 mb-0 w-100"></div>
  <footer class="footer">
    <p class="footer" style="margin-left: 30px">
      Questions? Call 000-800-040-1843
    </p>
    <div class="footer-cols">
      <ul>
        <li><a href="#">FAQ</a></li>
        <li><a href="#">Privacy</a></li>
      </ul>
      <ul>
        <li><a href="#">Help Centre</a></li>
        <li><a href="#">Jobs</a></li>
      </ul>
      <ul>
        <li><a href="#">Account</a></li>
        <li><a href="#">Legal Notices</a></li>
      </ul>
      <ul>
        <li><a href="#">Terms of Use</a></li>
        <li><a href="#">Contact Us</a></li>
      </ul>
    </div>
  </footer>
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
      this.loading = true;
      UserApi.signUpEmail(Email.value)
        .then((res) => {
          this.alertMsg = res.data.msg;
          this.typeOfAlert = "primary";
          this.showAlert = true;
          this.icon = "success";
        })
        .catch((err) => {
          this.alertMsg = err.response.data;
          this.typeOfAlert = "danger"; 
          this.showAlert = true;
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
      this.error = "";
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
      icon: "",
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
    homepage(){
      this.$router.push({ name: "HomePage" });
    }
  },
};
</script>

<style scoped src="../Style/index.css">
</style>

<style scoped src="../Style/main_index.css">
</style>

<style scoped>
.index_expolre{
  /* color: #fafafa; */
  color:#E50914;
  font-weight:bold;
  font-size:1.3rem;
  transition: 0.3s;
}
.index_expolre:hover{
  
  color:#E50914;
  cursor: pointer;
  font-weight: 600px;
}
.Alert_massage{
  height:10px;
}
 @media screen and (max-width: 788px) {
   .index_expolre{
  color:#E50914;
  font-size:0.9rem;
  transition: 0.3s;
}
.index_expolre:hover{
  color:#E50914;
  cursor: pointer;
  font-weight: 600px;
}
 }
</style>