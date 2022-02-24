<template>
  <div class="SeriesPage">
    <div class="nav"><NavBar /></div>

    <SeriesBanner
      :src="src"
      :Name="Series.SeriesName"
      :Description="Series.Description"
      :id="this.id"
      :seriesData="Series"
    />
    <div class="Series_body">
      <div class="body_content">
        <div v-for="season in Seasons" :key="season._id">
          <h3 class="Home_List_Title">{{ season.SeasonName }}</h3>
          <div class="Series_body_episodeList">
            <!-- Login model for non login user -->
            <div
              class="modal fade"
              id="modalLoginForm"
              tabindex="1"
              role="dialog"
              aria-labelledby="myModalLabel"
            >
              <form @submit="submit">
                <fieldset>
                  <div class="modal-dialog" role="document">
                    <div class="modal-content form_input_model">
                      <div class="modal-body mx-3">
                        <div class="d-flex">
                          <h4
                            class="
                              modal-title
                              w-100
                              font-weight-bold
                              text-white
                              d-flex
                              justify-content-center
                              my-3
                            "
                          >
                            Login
                          </h4>
                          <i
                            class="bi bi-x-lg close form_input_close_btn"
                            aria-label="Close"
                            data-dismiss="modal"
                          ></i>
                        </div>
                        <div class="md-form">
                          <input
                            class="form-control my-3 ps-3 form_input"
                            type="email"
                            placeholder="Email"
                            :error="errors.Email"
                            :modelValue="Email"
                            @change="handleChangeEmail"
                          />
                          <span>{{ errors.Email }}</span>
                        </div>

                        <div class="md-form mb-1">
                          <input
                            class="form-control my-3 ps-3 form_input"
                            type="password"
                            placeholder="Password"
                            :error="errors.Password"
                            :modelValue="Password"
                            @change="handleChangePassword"
                          />
                          <span>{{ errors.Password }}</span>
                        </div>
                        <div class="d-flex justify-content-center">
                          <button
                            class="
                              btn btn-danger
                              align-center
                              form_input_button
                            "
                          >
                            Login
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>

            <EpisodeCardList
              v-if="!this.$store.state.user.Name"
              id="banner__button"
              data-toggle="modal"
              data-target="#modalLoginForm"
              class="Home_List_Title"
              :data="season.Episodes"
            />

            <EpisodeCardList
              v-if="this.$store.state.user.Name"
              class="Home_List_Title"
              :data="season.Episodes"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="Series_footer"><Footer /></div>
  </div>
</template>
<script>
import { string, object } from "yup";
import userService from "../../services/user.service";
import { useField, useForm } from "vee-validate";
import NavBar from "../../components/NavBar.vue";
import Footer from "../../components/Footer.vue";
import SeriesApi from "../../services/series.service";
import SeriesBanner from "../../components/Series/Series_Banner.vue";
import EpisodeCardList from "../../components/Series/EpisodeCardList.vue";
import Notifications from "../../mixin/notificationMixin";

export default {
  name: "SeriesPage",
  mixins: [Notifications],
  created() {
    document.title = `Netflix - Series`;
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
      Series: [],
      Seasons: [],
      src: "",
    };
  },
  props: {
    id: String,
  },
  components: {
    NavBar,
    Footer,
    SeriesBanner,
    EpisodeCardList,
  },
  async mounted() {
    await SeriesApi.findSeriesBySearch({
      queryperam: "_id",
      queryName: `${this.id}`,
    })
      .then((res) => {
        this.Series = res.data[0];
        this.Seasons = res.data[0].Seasons;

        this.src = res.data[0].backdrop_path;
      })
      .catch((err) => {
        console.log(err);
        this.$router.replace({ name: "PageNotFound" });
      });
  },
  methods: {
    async LoginUser(data) {
      this.loading = true;
      userService
        .getAnUser({ email: data.Email, password: data.Password })
        .then((res) => {
          this.$store.dispatch("ADD_TOKEN", res.headers["x-access-token"]);
          this.$store.dispatch("ADD_USER", res.data);
          location.reload();
          if (res.data.Role == "user") {
            this.$router.replace({ name: "HomePage" });
          } else {
            this.$router.replace({ name: "AdminMoviePage" });
          }
        })
        .catch((err) => {
          console.log(err);
          Notifications("Email or Password wrong", "danger");
        });
    },
  },
};
</script>

<style scoped>
.form_input {
  z-index: 2;
  height: 50px;
  color: #8c8c80;
  background-color: #3333331f;
  border: none;
}
.form_input:focus {
  background-color: #333333b4;
  color: #8c8c80;
  border: none;
  outline: none;
}
.form_input_button {
  transition: all 0.4s;
  height: 40px;
}

.form_input_button:hover {
  background-color: #f40612;
}

.form_input_close_btn {
  cursor: pointer;
}
.form_input_model {
  margin-top: 100px;
  background-color: #000000cb;
}
</style>

<style>
* {
  background-color: #fcfcfc00;
}
.Series_body_episodeList {
  display: flex;
  overflow-y: hidden;
  overflow-x: hidden;
  overflow: scroll;
}

.SeriesPage {
  width: 100vw;
  height: 100%;
  overflow-x: hidden;
}
.nav {
  margin-top: 0px;
}
.Series_body {
  margin-top: 0px;
}
.Series_footer {
  margin-top: 70px;
}
.body_content {
  margin-top: -100px;
}

@media screen and (max-width: 788px) {
  .Series_body {
    margin-top: -180px;
  }
}
</style>