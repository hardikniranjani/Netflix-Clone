<template>
  <div class="My_Account">
    <div class="nav"><NavBar /></div>
    <div class="My_Account_body container">
      <div class="container-fluid index__body_mid">
        <!-- Form title -->
        <div style="z-index: 2">
          <h2 class="mb-4">My Account</h2>
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
              <div class="profile_form_input" style="z-index: 2; width: 500px">
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
                    class="btn btn-danger p-2 UserSaveButton"
                    type="submit"
                    style="background-color: #d81f26"
                  >
                    Save
                  </button>
                </div>
                <lable calss="form-control" style="color: white">Email</lable>
                <div class="d-flex">
                  <input
                    class="form-control mb-3 p-2 UserEmailFild"
                    id="profile_form_email"
                    type="email"
                    placeholder="Email"
                    :modelValue="Email"
                    @change="handleChangeEmail"
                  />
                  <lable
                    calss="form-control UserEmailFild_Name"
                    style="color: white"
                    >Change Email?</lable
                  >
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div class="subscritption_body container border mt-5 text-start">
        <div class="d-flex">
          <div class="subscritption_body_plan">My Plan</div>
          <div class="subscritption_body_details d-flex">
            <div
              class="subscritption_body_details_name border-start ps-3"
              v-if="this.$store.state.user.Subscription_plan_id"
            >
              <h3>
                {{ this.$store.state.user.Subscription_plan_id.Plan_name }}
                <span class="subscription_plan_details">{{
                  this.$store.state.user.Subscription_plan_id.Max_video_quality
                }}</span>
              </h3>
              <span>
                <span
                  class="
                    subscription_plan_details_2nd_line
                    border-end
                    me-2
                    pe-2
                  "
                >
                  <span
                    class="me-2"
                    style="color: #d81f26; font-weight: normal; font-size: 18px"
                    >Screens</span
                  >
                  <span
                    class="subscription_plan_details"
                    style="font-size: 20px"
                  >
                    {{
                      this.$store.state.user.Subscription_plan_id
                        .Number_of_screen_available
                    }}
                  </span>
                </span>

                <span
                  class="me-2"
                  style="color: #d81f26; font-weight: normal; font-size: 18px"
                >
                  Devices</span
                >
                <span
                  v-for="(i, index) in this.$store.state.user
                    .Subscription_plan_id.Devices"
                  :key="i"
                  class="subscription_plan_details_2nd_line_device"
                  >{{ i }}
                  <span
                    v-if="
                      index + 1 !=
                      this.$store.state.user.Subscription_plan_id.Devices.length
                    "
                    >,</span
                  >
                </span>
                
              </span>
            </div>
            <div
              class="subscritption_body_details_name border-start ps-3"
              v-else
            >
              No Active Plan
            </div>
            <div class="subscritption_body_details_plan border-start ps-3">
              <router-link class="nav_link" :to="{ name: 'SubscriptionPlan' }"
                >Upgrade Plan</router-link
              >
            </div>
          </div>
        </div>
        <div class="d-flex border-top mt-4 pt-4">
          <div class="list_body_name">My List</div>
          <div class="list_body_details border-start ps-3">
            <router-link class="nav_link" :to="{ name: 'WatchHistory' }"
              ><p>WatchHistory</p></router-link
            >
            <router-link class="nav_link" :to="{ name: 'WishList' }"
              ><p>WishList</p></router-link
            >
            <router-link class="nav_link" :to="{ name: 'WatchLater' }"
              ><p>WatchLater</p></router-link
            >
          </div>
        </div>
        
      </div>
    </div>

    <div class="footer"><Footer /></div>
  </div>
</template>

<script>
import NavBar from "../../components/NavBar.vue";
import Footer from "../../components/Footer.vue";
import UserApi from "../../services/user.service";
import { string, object } from "yup";
import { useField, useForm } from "vee-validate";
import { createAvatar } from "@dicebear/avatars";
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
    NavBar,
    Footer,
  },
  mounted() {
    document.title = `Netflix - User Account`;

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
.UserEmailFild,
.profile_form_name {
  margin-right: 10px;
  flex: 1;
  color: #cccccc;
  background-color: #333333;
  border: none;
}

.UserEmailFild:focus {
  color: #cccccc;
  background-color: #333333;
  border: none;
}

.profile_form_name:focus {
  color: #cccccc;
  background-color: #333333;
  border: none;
}
.UserEmailFild_Name {
  flex: 0.4;
}

.UserSaveButton {
  flex: 0.24;
}
.UserSaveButton {
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
  margin-left: 80px;
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
.footer {
  margin-top: 470px;
}

@media screen and (max-width: 788px) {
  .subscritption_body {
    margin-left: 0px;
    font-family: "Netflix Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
    box-shadow: 0px 0px 5px 5px #9c9c9ce3;
    border-radius: 8px;
    border: none;
    padding: 10px;
    padding-top: 10px;
  }
  .subscription_plan_details,
  .subscription_plan_details_2nd_line {
    font-size: 10px;
    font-weight: normal;
    color: #dfdfdf;
    transition: all 0.4s;
  }
  .subscription_plan_details_2nd_line_device {
    font-weight: normal;
    font-size: 11px;
    color: #d2d2d2;
    transition: all 0.4s;
    cursor: pointer;
  }
  .subscritption_body_plan,
  .list_body_name {
    padding-left: 0px;
    flex: 0.2;
  }
  .list_body_details {
    flex: 0.6;
  }
  .subscritption_body_details {
    flex: 0.81;
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
}
</style>