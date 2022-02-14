<template>
  <div class="nav" style="z-index: 20">
    <div class="nav__left">
      <img
        class="nav_logo"
        src="../assets/logo.svg"
        alt="netflix_logo"
        v-on:click="home"
      />
      <nav class="navbar navbar-expand-lg navbar-light p-0">
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
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
        </div>
      </nav>
    </div>

    <div class="nav__right">
      <div>
        <input type="search" name="" placeholder="search..." id="">
      </div>
      <div
        class="ms-3 mt-2"
        id="Profile_image1"
        v-on:click="userAccount"
        v-html="user_icon"
      ></div>
      <!-- dropdown menu -->
      <div class="dropdown Profile_dropdown">
        <button
          class="dropdown_profile btn w-100 dropdown-toggle"
          type="button"
          style="color: rgba(221, 221, 221, 0.87)"
          data-bs-toggle="dropdown"
        ></button>
        <div
          class="dropdown-menu align-center"
          style="background-color: #00000054"
        >
          <p class="text-white text-center">
            Hello! {{ this.$store.state.user.Name }}
          </p>
          <button
            type="button"
            class="logout_btn btn btn-danger"
            style="background-color: #d81f26"
            v-on:click="logout()"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { createAvatar } from "@dicebear/avatars";
// import * as style from "@dicebear/avatars-identicon-sprites";
import * as style from "@dicebear/adventurer-neutral";

export default {
  name: "NavBar2",
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
.logout_btn {
  margin-left: 35px;
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

.link{
  text-decoration: none; 
  color: inherit;
}
</style>