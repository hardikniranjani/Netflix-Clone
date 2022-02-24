<template>
  <div id="movie_body">
    <div id="banner">
      <div id="banner__fadeLeft">
        <div id="banner__contents">
          <div id="banner__contents_details">
            <h1 id="banner__title">{{ Name }}</h1>
            <div id="banner__buttons">
              <!-- mobile view -->
              <span class="mobile_view">
                <router-link
                  id="banner__button_link"
                  :to="{
                    name: 'MovieVideo',
                    params: { id: this.id },
                  }"
                >
                  <button
                    v-if="this.$store.state.user.Name"
                    id="banner__button"
                  >
                    <i class="bi bi-play-fill me-1"></i>
                  </button>
                </router-link>
                <router-link
                  id="banner__button_link"
                  :to="{
                    name: 'LogInPage',
                  }"
                >
                  <button
                    v-if="!this.$store.state.user.Name"
                    id="banner__button"
                  >
                    <i class="bi bi-play-fill me-1"></i>
                  </button>
                </router-link>
              </span>
              <!-- leptop view -->
              <span id="leptop_view_title">
                <router-link
                  id="banner__button_link"
                  :to="{
                    name: 'MovieVideo',
                    params: { id: this.id },
                  }"
                >
                  <button
                    v-if="this.$store.state.user.Name"
                    id="banner__button"
                  >
                    <i class="bi bi-play-fill me-1"></i>Play
                  </button>
                </router-link>
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
                            <div class="d-flex
                                justify-content-center">
                            <button
                              class="
                                btn btn-danger
                                align-center
                                form_input_button">
                              Login
                            </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </form>
                </div>
                <button
                  v-if="!this.$store.state.user.Name"
                  id="banner__button"
                  data-toggle="modal"
                  data-target="#modalLoginForm"
                >
                  <i class="bi bi-play-fill me-1"></i>Play
                </button>
              </span>

              <button
                v-if="this.$store.state.user.Name"
                id="banner__button"
                @click="updateWishList()"
              >
                <i class="bi" :class="heartIconClass"></i>
              </button>
              <button
                v-if="this.$store.state.user.Name"
                id="banner__button"
                @click="updateWatchLater()"
              >
                <i class="bi" :class="classList" ref="watchLater"></i>
              </button>
            </div>
            <p id="banner__description">
              {{ Description }}
            </p>
            <h4 id="leptop_view_title">Category</h4>
            <div id="leptop_view_title" v-for="c in movieData.Genres" :key="c">
              <li>
                <router-link
                  class="GenrasList"
                  style=""
                  :to="{ name: 'GenersContent', params: { id: c._id } }"
                >
                  {{ c.GenresName }}
                </router-link>
              </li>
            </div>
          </div>
        </div>
        <div id="banner__fadeBottom"></div>
      </div>
    </div>
    <div class="mobile_view">
      <h4 class="ms-3">Description</h4>
      <p class="ms-3" id="banner__description_mobile">
        {{ Description }}
      </p>
      <h4 class="ms-3">Category</h4>
      <div class="ms-3" v-for="c in movieData.Genres" :key="c">
        <li>
          <router-link
            class="GenrasList"
            style=""
            :to="{ name: 'GenersContent', params: { id: c._id } }"
          >
            {{ c.GenresName }}
          </router-link>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
import { string, object } from "yup";
import userService from "../../services/user.service";
import { useField, useForm } from "vee-validate";
import wishListMixin from "../../mixin/wishListMixin";
import watchLaterMixin from "../../mixin/watchLaterMixin";
import Notifications from "../../mixin/notificationMixin"
export default {
  name: "Movie_Banner",
  mixins: [wishListMixin, watchLaterMixin,Notifications],
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
      Banner_Movie: {},
      media_type: "Movies",
    };
  },
  props: {
    src: String,
    Name: String,
    Description: String,
    id: String,
    movieData: {},
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
          Notifications("Email or Password wrong", "danger")
        });
    },
  },

  async updated() {
    var banner = document.getElementById("banner");
    banner.style.backgroundImage = "url(" + this.src + ")";
  },
  mounted() {
    var banner = document.getElementById("banner");
    banner.style.backgroundImage = "url(" + this.src + ")";
  },
};
</script>

<style scoped src="../../Style/Banner.css">
</style>

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

<style scoped>
#banner__contents_details {
  margin-top: -170px;
}

.GenrasList {
  text-decoration: none;
  color: inherit;
  transition: all 0.4s;
}

.GenrasList:hover {
  color: #d81f26;
}

.mobile_view {
  display: none;
}

@media screen and (max-width: 788px) {
  .mobile_view {
    display: block;
    margin-top: -22px;
  }
  #banner__description {
    display: none;
  }
  #leptop_view_title {
    display: none;
  }
  #banner__button {
    margin-top: 50px !important;
  }
  #banner__contents {
    height: 25%;
    width: 50vw;
  }
  #banner__contents_details {
    margin-top: -250px;
    margin-left: -50px;
  }
  #movie_body {
    width: 100vw;
    height: 851px;
  }
  #banner {
    height: 544px;
    color: white;
    object-fit: contain;
    background-position: center center;
    background-size: cover;
  }
  #banner__title {
    margin-top: 50px;
    margin-bottom: 20px;
    font-family: "Netflix Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 1.3rem;
    font-weight: 800;
    padding-bottom: 0.3rem;
  }
  #banner__description_mobile {
    line-height: 1.5;
    padding-top: 0rem;
    padding-left: 0.4rem;
    font-size: 0.7rem;
    max-width: 390px;
    height: 80px;
    overflow: hidden;
  }
  #banner__button {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    cursor: pointer;
    color: white;
    outline: none;
    border: none;
    font-weight: 500;
    border-radius: 0.2vw;
    margin-bottom: 1rem;
    margin-right: 1rem;
    background-color: rgba(51, 51, 51, 0.5);
    padding-bottom: 0.5rem;
  }
  #banner__fadeBottom {
    margin-top: -75px;
    width: 100vw;
    height: 5.5rem;
    background: linear-gradient(
      180deg,
      transparent,
      rgba(37, 37, 37, 0.61),
      #111
    );
  }
  #banner__button_link {
    text-decoration: none;
    color: inherit;
  }
}
</style>