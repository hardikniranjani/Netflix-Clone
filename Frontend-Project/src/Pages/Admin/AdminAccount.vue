<template>
  <div class="My_Account">
    <div class="nav"><AdminNavBar /></div>
    <div class="My_Account_body container">
      <div class="container-fluid index__body_mid">
        <!-- Form title -->
        <div >
          <h2 class="mb-4">Admin Account</h2>
          <form
            class="profile_form border w-100 p-5 mb-3"
            @submit="submit"
            id="user_profile"
          >
            <div>
              <h2 class="text-light">Edit Profile</h2>
            </div>
            <div class="main_form d-inline-flex">
              <div>
                <div class="me-3 mt-2" id="Profile_image"></div>
              </div>

              <div class="profile_form_input" style=" width: 500px">
                <lable calss="form-control" style="color: white">Name</lable>
                <div class="d-flex">
                  <input
                    class="form-control mb-3 p-2 profile_form_name"
                    id="profile_form_name"
                    type="text"
                    placeholder="Name"
                    :modelValue="Name"
                    @change="handleChangeName"
                  />
                  <button
                    class="btn btn-danger p-2 AdminSaveButton"
                    type="submit"
                    style="background-color: #d81f26"
                  >
                    Save
                  </button>
                </div>
                <lable calss="form-control" style="color: white">Email</lable>
                <div class="d-flex">
                  <input
                    class="form-control mb-3 p-2 AdminEmailFild"
                    id="profile_form_email"
                    type="email"
                    placeholder="Email"
                    :modelValue="Email"
                    @change="handleChangeEmail"
                  />
                  <lable
                    calss="form-control AdminEmailFild_Name"
                    style="color: white"
                    >Change Email?</lable
                  >
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div class="subscritption_body container border mt-5 ms-5 text-start">
        <div class="d-flex pt-4">
          <div class="list_body_name">Movies</div>
          <div class="list_body_details border-start ps-3">
            <router-link class="nav_link" :to="{ name: 'AdminAddMovie' }"
              ><p>Add Movie</p></router-link
            >
            <router-link class="nav_link" :to="{ name: 'AdminMoviePage' }"
              ><p>Show Movies</p></router-link
            >
          </div>
        </div>
        <!-- <div class="list_body container border mt-4 ms-5 w-100"> -->
        <div class="d-flex border-top mt-4 pt-4">
          <div class="list_body_name">Series</div>
          <div class="list_body_details border-start ps-3">
            <router-link class="nav_link" :to="{ name: 'AdminAddSeries' }"
              ><p>Add Series</p></router-link
            >
            <router-link class="nav_link" :to="{ name: 'AdminSeriesList' }"
              ><p>Show Series</p></router-link
            >
          </div>
        </div>
        <!-- </div> -->
        <div class="d-flex border-top mt-4 pt-4">
          <div class="list_body_name">Users</div>
          <div class="list_body_details border-start ps-3">
            <router-link class="nav_link" :to="{ name: 'AdminUserPage' }"
              ><p>Show User</p></router-link
            >
          </div>
        </div>

        <div class="d-flex border-top mt-4 pt-4">
          <div class="list_body_name">Genres</div>
          <div class="list_body_details border-start ps-3">
            <router-link class="nav_link" :to="{ name: 'AdminAddGenres' }"
              ><p>Add Genres</p></router-link
            >
            <router-link class="nav_link" :to="{ name: 'AdminGenresPage' }"
              ><p>Show Genres</p></router-link>
          </div>
        </div>

        <div class="d-flex border-top mt-4 pt-4">
          <div class="list_body_name">Countries</div>
          <div class="list_body_details border-start ps-3">
            <router-link class="nav_link" :to="{ name: 'AdminAddCountry' }"
              ><p>Add Countries</p></router-link
            >
            <router-link class="nav_link" :to="{ name: 'AdminCountryPage' }"
              ><p>Show Countries</p></router-link
            >
          </div>
        </div>

        <div class="d-flex border-top mt-4 pt-4">
          <div class="list_body_name">Languages</div>
          <div class="list_body_details border-start ps-3">
            <router-link class="nav_link" :to="{ name: 'AdminAddLanguage' }"
              ><p>Add Languages</p></router-link
            >
            <router-link class="nav_link" :to="{ name: 'AdminLanguagePage' }"
              ><p>Show Languages</p></router-link
            >
          </div>
        </div>
      </div>
    </div>

    <div class="Admin_Account_footer"><Footer /></div>
  </div>
</template>

<script>
import AdminNavBar from "../../components/Admin/AdminNavBar.vue";
import Footer from "../../components/Footer.vue";
import UserApi from "../../services/user.service";
import { string, object } from "yup";
import { useField, useForm } from "vee-validate";
import { createAvatar } from "@dicebear/avatars";
// import * as style from "@dicebear/avatars-identicon-sprites";
import * as style from "@dicebear/adventurer-neutral";

export default {
  name: "UserAccount",

  data() {
    const validationSchema = object({
      Name: string().required().min(2),
    });
    const { handleSubmit, setFieldValue } = useForm({
      validationSchema,
      initialValues: {},
    });

    const handleChangeName = (event) => {
      setFieldValue("Name", event.target.value);
    };

    const { value: Name } = useField("Name");

    const submit = handleSubmit((value) => {
      this.updateUser(value);
    });

    return {
      Name,
      handleChangeName,
      submit,
    };
  },
  components: {
    AdminNavBar,
    Footer,
  },
  mounted() {
    document.title = `NetflixAdmin - Account`;

    //store data in profile form
    document.getElementById("profile_form_name").placeholder =
      this.$store.state.user.Name;
    document.getElementById("profile_form_email").placeholder =
      this.$store.state.user.Email;

    let svg = createAvatar(style, {
      seed: `${this.$store.state.user.Name}`,
    });
    document.getElementById("Profile_image").innerHTML = svg;

    // dispatch avatar data in store
    this.$store.dispatch("AVATAR", svg);
  },

  updated() {
    let svg = createAvatar(style, {
      seed: `${this.$store.state.user.Name}`,
    });
    document.getElementById("Profile_image").innerHTML = svg;
    document.getElementById("profile_form_name").placeholder =
      this.$store.state.user.Name;
    document.getElementById("profile_form_email").placeholder =
      this.$store.state.user.Email;

    // dispatch avatar data in store
    this.$store.dispatch("AVATAR", svg);
  },
  methods: {
    async updateUser(data) {
      UserApi.updateAnUser({
        name: data.Name,
        email: this.$store.state.user.Email,
      })
        .then((res) => {
          alert("Update Successfully!");
          this.$store.dispatch("ADD_USER", res.data);
          document.getElementById("user_profile").reset();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped src="../../Style/profile.css">
</style>
<style>
.AdminEmailFild,
.profile_form_name {
  margin-right: 10px;
  flex: 1;
  color: #cccccc;
  background-color: #333333;
  border: none;
}

.AdminEmailFild:focus {
  color: #cccccc;
  background-color: #333333;
  border: none;
}

.profile_form_name:focus {
  color: #cccccc;
  background-color: #333333;
  border: none;
}
.AdminEmailFild_Name {
  flex: 0.4;
}

.AdminSaveButton {
  flex: 0.24;
}
.AdminSaveButton {
  height: fit-content;
}
.My_Account {
  width: 100%;
  height: 100%;
}
.nav {
  margin-top: 0px;
}

#Profile_image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
}
.subscription_plan_details,
.subscription_plan_details_2nd_line {
  font-size: 16px;
  font-weight: normal;
  color: #dfdfdf;
  transition: all 0.4s;
}

.subscription_plan_details:hover {
  color: #d81f26;
  cursor: pointer;
}
.subscription_plan_details_2nd_line_device {
  font-weight: normal;
  font-size: 16px;
  color: #d2d2d2;
  transition: all 0.4s;
  cursor: pointer;
}
.subscription_plan_details_2nd_line_device:hover {
  color: #d81f26;
}
.subscritption_body,
.list_body {
  font-family: "Netflix Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  box-shadow: 0px 0px 5px 5px #9c9c9ce3;
  border-radius: 8px;
  border: none;
  padding: 20px;
  padding-top: 10px;
}

.subscritption_body_plan,
.list_body_name {
  padding-left: 0px;
  flex: 0.4;
}

.list_body_details {
  flex: 0.6;
}
.subscritption_body_details {
  flex: 0.61;
}

.subscritption_body_details_name {
  flex: 1;
  font-size: 20px;
  font-weight: bold;
  color: rgb(216, 31, 38);
}
.subscritption_body_details_plan {
  flex: 0.19;
}

.nav_link {
  text-decoration: none;
  color: inherit;
  transition: 0.5s;
}
.nav_link:hover {
  color: rgb(216, 31, 38);
}

.My_Account_body {
  margin-top: 150px;
}
.index__body_mid {
  margin-top: 150px;
}
.Admin_Account_footer {
  margin-left: 170px !important;
  margin: 40px auto !important;
}
</style>

<style>
.card-2{
    position: relative;
    display: inline-grid;
    grid-template-columns: 50% 40%;
    text-align: left;
    align-items: center;
    padding: 25px 45px 50px;
}

.footer_main{
    max-width: 70%;
    margin: 1rem auto;
    overflow: auto;
}

.footer_main ,
.footer_main a{
    color: #999999;
    font-size: 0.9rem;
}

.footer_main p{
    margin-bottom: 1.5rem;
}

.footer_main .footer-cols{
    display: grid;
    grid-template-columns: repeat(4 , 1fr);
    grid-gap: 2rem;
}

.footer_main li{
    line-height: 2.4;
}
.footer-cols > ul > li> a{
  text-decoration: none;
}
.footer-cols > ul > li> a:hover{
  text-decoration: underline;

}

@media screen and (max-width: 788px) {
  /* .footer_main{
    max-width: 100%;
    margin: 0rem auto;
  } */
  .footer_main {
    max-width: 100%;
  
    margin: 0rem 2rem;
    overflow: auto;
  }
  .footer_main,
  .footer_main a {
    color: #999999;
    font-size: 0.7rem;
  }

  .footer_main p {
    margin-bottom: 1.5rem;
  }

  .footer_main .footer-cols {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
  }

  .footer_main li {
    line-height: 1.4;
  }
}
@media screen and (min-width: 766px) {
.footer_main .footer-cols {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
  }
}
@media screen and (min-device-width: 988px)  {
  .footer_main .footer-cols {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
  }
}
@media only screen and (min-width: 1200px) {
  .footer_main .footer-cols {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1rem;
  }
}
</style>