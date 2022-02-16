<template>
  <nav
    class="nav navbar navbar-expand-lg navbar-light w-100"
    style="z-index: 4"
  >
    <img
      class="nav_logo"
      src="../assets/logo.svg"
      alt="netflix_logo"
      v-on:click="home"
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
      <span class="navbar-toggler-icon"></span>
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

        <li class="nav-item">
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
        <form class="form-inline my-2 my-lg-0 form_input">
        </form>
        <div class="navbar_bottom ">
          <div
            class="ms-3 mt-2"
            id="Profile_image1"
            v-on:click="userAccount"
            v-html="user_icon"
          ></div>
          <button
            type="button"
            class="logout_btn btn btn-danger mt-2"
            style="background-color: #d81f26"
            v-on:click="logout()"
          >
            Logout
          </button>
        </div>
      </span>
      <span class="mobile_view">
        <div class="navbar_bottom_mobile">
          
          <li class="nav-item">
          <router-link class="link" :to="{ name: 'UserAccount' }">
          <a
            class="nav_3 nav-link my_account"
            style="color: rgba(221, 221, 221, 0.87); cursor: pointer ; "
            >My Account</a
          >
          </router-link>
          </li>
          
          <button
            type="button"
            class="logout_btn_mobile btn btn-danger mt-2"
            style="background-color: #d81f26"
            v-on:click="logout()"
          >
            Logout
          </button>
        </div>
      </span>
    </div>
  </nav>
</template>

<script>
import { createAvatar } from "@dicebear/avatars";
// import * as style from "@dicebear/avatars-identicon-sprites";
import * as style from "@dicebear/adventurer-neutral";

export default {
  name: "NavBar",
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

  updated() {
    let svg = createAvatar(style, {
      seed: `${this.$store.state.user.Name}`,
    });
    this.user_icon = svg;
    this.$store.dispatch("AVATAR", svg);
  },
  methods: {
    home() {
      this.$router.push({ name: "HomePage" });
    },
    userAccount() {
      this.$router.push({ name: "UserAccount" });
    },
    logout() {
      this.$store.dispatch("REMOVE_TOKEN");
      this.$router.replace({ name: "IndexPage" });
    },
  },
};
</script>

<style scoped src="../Style/navbar.css">
</style>

<style scoped>
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
  margin-left: 500px;
}
.navbar_bottom {
  margin-top: -10px;
  margin-left:180px !important; ;
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
    background-color: #141414d2;
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
  .nav_3{
    width: 130px;
  }
  .my_account{
    margin-top:30px !important;
    margin-left:-5px !important;
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
</style>