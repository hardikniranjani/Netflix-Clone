<template>
  <nav class="nav navbar navbar-expand-lg w-100 user_navbar" style="z-index: 4">
    <img
      class="nav_logo"
      src="../assets/logo.svg"
      alt="netflix_logo"
      @click="home"
    />
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarTogglerDemo02"
      aria-controls="navbarTogglerDemo02"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon usernav_ico" style="color: white"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item">
          <router-link class="link" :to="{ name: 'HomePage' }">
            <a
              class="nav_1 nav-link"
              style="color: rgba(221, 221, 221, 0.87); cursor: pointer"
              aria-current="page"
              >Home</a
            >
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="link" :to="{ name: 'MovieHomePage' }">
            <a
              class="nav_2 nav-link"
              style="color: rgba(221, 221, 221, 0.87); cursor: pointer"
              >Movies</a
            >
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="link" :to="{ name: 'SeriesHomePage' }">
            <a
              class="nav_3 nav-link"
              style="color: rgba(221, 221, 221, 0.87); cursor: pointer"
              >Series</a
            >
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="link" :to="{ name: 'GenersPage' }">
            <a
              class="nav_3 nav-link"
              style="color: rgba(221, 221, 221, 0.87); cursor: pointer"
              >Genres</a
            >
          </router-link>
        </li>

        <li v-if="isLoggedIn" class="nav-item">
          <router-link class="link" :to="{ name: 'WishList' }">
            <a
              class="nav_3 nav-link"
              style="color: rgba(221, 221, 221, 0.87); cursor: pointer"
              >WishList</a
            >
          </router-link>
        </li>
      </ul>
      <span class="d-flex justify-content-between leptop_view">
        <form class="form-inline my-2 my-lg-0 form_input"></form>
        <div class="navbar_bottom">
          <div
           v-if="isLoggedIn"
            class="ms-3 mt-2"
            id="Profile_image1"
            @click="userAccount"
            v-html="user_icon"
          ></div>
          <button
            type="button"
            class="logout_btn btn btn-danger mt-2"
            style="background-color: #d81f26"
            @click="loginOrlogout"
          >
            {{logButton}}
          </button>
        </div>
      </span>
      <span class="mobile_view">
        <div class="navbar_bottom_mobile">
          <li v-if="isLoggedIn" class="nav-item">
            <router-link class="link" :to="{ name: 'UserAccount' }">
              <a
                class="nav_3 nav-link my_account"
                style="color: rgba(221, 221, 221, 0.87); cursor: pointer"
                >My Account</a
              >
            </router-link>
          </li>

          <button
            type="button"
            class="logout_btn_mobile btn btn-danger mt-5"
            style="background-color: #d81f26"
            @click="loginOrlogout"
          >
            {{logButton}}
          </button>
        </div>
      </span>
    </div>
  </nav>
</template>

<script>
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/adventurer-neutral";

export default {
  name: "NavBar",
  computed :  {
    isLoggedIn(){
      let user = this.$store.state.user;
      return user._id ? true : false;
    },
    logButton(){
      return this.isLoggedIn ? "Logout" : "Login";
    }
  },
  data() {
    const user_icon = this.$store.state.avatar;
    return {
      user_icon,
    };
  },
  created() {
    let svg = createAvatar(style, {
      seed: `${this.$store.state.user.Name}`,
    });
    this.user_icon = svg;
    this.$store.dispatch("AVATAR", svg);
  },
  mounted() {
    this.navActive();
    this.logInOut_btn();
  },
  updated() {
    let svg = createAvatar(style, {
      seed: `${this.$store.state.user.Name}`,
    });
    this.user_icon = svg;
    this.$store.dispatch("AVATAR", svg);
    this.navActive();
    this.logInOut_btn();
  },
  methods: {
    home() {
      this.$router.push({ name: "HomePage" });
    },
    login(){
       this.$router.push({ name: "LogInPage" });
    },
    userAccount() {
      this.$router.push({ name: "UserAccount" });
    },
    logout() {
      this.$store.dispatch("REMOVE_TOKEN");
      this.$router.replace({ name: "IndexPage" });
    },
    navActive() {
      window.addEventListener("scroll", function () {
        var nav = document.querySelector(".user_navbar");
        nav.classList.toggle("nav_active", window.scrollY > 0);
      });
    },
    loginOrlogout(){
      if(this.isLoggedIn){
        this.logout();
      }else {
        this.login();
      }
    },
    logInOut_btn(){
      if(!this.$store.state.user.Name){
          
        var button = document.querySelector(".logout_btn");
        button.classList.toggle("logInOut_btn");
      
      }
    }
  },
};
</script>

<style scoped src="../Style/navbar.css">
</style>

<style scoped>
.nav {
  padding-left: 70px;
}

.user_navbar.nav_active {
  background-color: #000000ec;
}
#Profile_image1 {
  border-radius: 8px;
  width: 40px;

  border-radius: 6px;
  cursor: pointer;
}
.nav__right {
  margin-top: -10px;
}
.Profile_dropdown {
  margin-top: 7px;
}

.router-link-exact-active {
  color: #fafafa;
  font-weight: bold;
  text-decoration: none;
  color: inherit;
}

.link {
  text-decoration: none;
  color: inherit;
}

.form_input {
  margin-left: 450px;
}
.navbar_bottom {
  margin-top: -10px;
  margin-left: 180px !important;
  display: flex;
}

.logout_btn {
  margin-left: 10px;
}
.mobile_view {
  display: none;
}
.search_input_leptop {
  background-color: #1414141c;
  color: #cacaca;
  border: none;
  box-shadow: 0px 2px 4px 5px #14141462;
}

@media screen and (max-width: 788px) {
  .nav {
    padding-left: 20px;
    background-color: #000000ec;
  }
  .usernav_ico {
    border: 1px solid black;
    border-radius: 5px;
  }

  .usernav_ico:focus {
    border: none;
  }
  .navbar_bottom_mobile {
    display: flex;
    margin-left: -10px;
  }
  .leptop_view {
    display: none !important;
  }

  .form_input_mobile {
    display: flex;
    width: 280px;
    flex-wrap: wrap;
    flex-direction: column;
  }
  .nav_3 {
    width: 130px;
  }
  .my_account {
    margin-top: 30px !important;
    margin-left: -5px !important;
  }
  .navbar_bottom_mobile {
    margin-top: 10px;
    display: flex;
    width: 20px;
    flex-wrap: wrap;
    flex-direction: column;
  }
  .logout_btn_mobile {
    margin-left: 10px;
  }
  .mobile_view {
    margin-top: -40px;
    display: flex;
    flex-direction: column;
  }
  .search_input_mobile {
    background-color: #141414c0;
    color: #cacaca;
    border: none;
    box-shadow: 0px 2px 4px 5px #b9b9b962;
  }
}

@media screen and (min-width: 788px) {
  .form_input {
    margin-left: 120px;
  }
  .logInOut_btn{
    margin-left: 150px;
  }
}

@media screen and (min-width: 1365px) {
  .form_input {
    margin-left: 450px;
  }
}
@media screen and (min-width: 1439px) {
.form_input {
  margin-left: 520px;
}
}
@media screen and (min-width: 1465px) {
.form_input {
  margin-left: 740px;
}
}
@media screen and (min-width: 1565px) {
.form_input {
  margin-left: 780px;
}
}
@media screen and (min-width: 1665px) {
.form_input {
  margin-left: 880px;
  
}
}
@media screen and (min-width: 1765px) {
.form_input {
  margin-left: 880px;
}
}
@media screen and (min-width: 2420px) {
  .form_input {
    margin-left: 1600px;
  }
}
</style>