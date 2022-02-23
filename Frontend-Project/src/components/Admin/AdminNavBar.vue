<template>
  <div class="nav admin_navbar navbar navbar-expand-lg w-100">
    <div class="nav__left">
      <img
        class="nav_logo"
        src="../../assets/logo.svg"
        alt="netflix_logo"
        v-on:click="home"
      />
      <nav class="navbar navbar-expand-lg navbar-light p-0">
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="link" :to="{ name: 'AdminHomePage' }">
                <a
                  class="nav_1 nav-link"
                  style="color: rgba(221, 221, 221, 0.87)"
                  aria-current="page"
                  >Home</a
                >
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="link" :to="{ name: 'AdminMoviePage' }">
                <a
                  class="nav_2 nav-link"
                  style="color: rgba(221, 221, 221, 0.87); cursor: pointer"
                  >Movies</a
                ></router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="link" :to="{ name: 'AdminSeriesList' }">
                <a
                  class="nav_3 nav-link"
                  style="color: rgba(221, 221, 221, 0.87); cursor: pointer"
                >
                  Series
                </a>
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>

    <div class="nav__right">
      <!-- Profile -->
      <div
        class="ms-3 mt-2"
        id="Profile_image1"
        v-on:click="AdminAccount"
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
  </div>
</template>

<script>
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/adventurer-neutral";

export default {
  name: "AdminNavBar",
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
    this.navActive();
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
      this.$router.push({ name: "AdminMoviePage" });
    },
    AdminAccount() {
      this.$router.push({ name: "AdminAccount" });
    },
    logout() {
      this.$store.dispatch("REMOVE_TOKEN");
      this.$router.replace({ name: "LogInPage" });
    },
    navActive() {
      window.addEventListener("scroll", function () {
        var nav = document.querySelector(".admin_navbar");
        nav.classList.toggle("nav_active", window.scrollY > 0);
      });
    },
  },
};
</script>

<style scoped src="../../Style/navbar.css">
</style>

<style scoped>
.logout_btn {
  margin-left: 15px;
}

.admin_navbar {
  margin-left: -20px;
  padding-left: 100px;
}
.admin_navbar.nav_active {
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
  margin-right: 20px;
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
</style>