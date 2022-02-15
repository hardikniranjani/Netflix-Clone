<template>
  <div class="Admin__Home">
    <div class="container-fluid">
      <AdminNavBar />
    </div>
    <div class="Admin__Home__Body">
      <div class="Admin__Home__Sidebar ">
        <div class="text-center align-center display-5 border pb-2">List</div>
        <div class="Admin_SideBar">
          <router-link
            class="Admin_SideBar_span"
            :to="{ name: 'AdminMoviePage' }"
          >
            Movies
          </router-link>
          <router-link
            class="Admin_SideBar_span"
            :to="{ name: 'AdminSeriesList' }"
          >
            Series
          </router-link>
          <router-link
            class="Admin_SideBar_span"
            :to="{ name: 'AdminUserPage' }"
          >
            Users
          </router-link>
          <router-link
            class="Admin_SideBar_span"
            :to="{ name: 'AdminGenresPage' }"
          >
            Genres
          </router-link>
          <router-link
            class="Admin_SideBar_span"
            :to="{ name: 'AdminCountryPage' }"
          >
            Country
          </router-link>
          <router-link
            class="Admin_SideBar_span"
            :to="{ name: 'AdminLanguagePage' }"
          >
            Language
          </router-link>
          <router-link
            class="Admin_SideBar_span"
            :to="{ name: 'AdminCompanyPage' }"
          >
            Company
          </router-link>
          <router-link
            class="Admin_SideBar_span"
            :to="{ name: 'AdminSubscriptionPlanPage' }"
          >
            Subscription
          </router-link>
        </div>
      </div>
      <div class="Admin__Home__Content ms-3">
        <router-view></router-view>
      </div>
    </div>
  </div>
  <div class="Admin_footer"><Footer /></div>
</template>

<script>
import AdminNavBar from "../../components/Admin/AdminNavBar.vue";
import Footer from "../../components/Footer.vue";

export default {
  name: "AdminHome",
  data() {
    return {
      flag: false,
    };
  },
  components: {
    AdminNavBar,
    Footer,
  },

  created() {
    document.title = `NetflixAdmin - Home`;
    if (this.$router) {
      this.flag == true;
    } else {
      this.flag == false;
    }
  },
  updated() {
    if (this.$router) {
      this.flag == true;
    } else {
      this.flag == false;
    }
  },
};
</script>

<style>
.table {
  background-color: #141414;
  color: #d2d2d2;
}
.Admin__Home {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
}
.Admin__Home__Body {
  margin-top: 100px;
  display: flex;
}
.Admin_SideBar {
  display: flex;
  flex-direction: column;
}
.Admin_SideBar_span {
  text-decoration: none;
  color: inherit;
  text-align: center;
  transition: all 0.4s;
  padding: 10px;
}
.Admin_SideBar_span:hover {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  background-color: #d81f26;
}

.Admin__Home__Sidebar {
  object-fit: contain;
  width: 150px;
  flex: 0.1;
}

.Admin__Home__Content {
  flex: 1;
}
.router-link-exact-active {
  color: #fafafa;
  background-color: #d81f26;
}

.Admin_footer {
  margin-top: 77px;
}
</style>