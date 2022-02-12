<template>
  <div class="Admin__Home">
    <div class="container-fluid">
      <AdminNavBar />
    </div>
    <div class="Admin__Home__Body">
      <div class="Admin__Home__Sidebar w-100">
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
        <div>
          <!-- <div class="text-center align-center display-5 border">
            Search bar
          </div> -->
        </div>
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
  width: 350px;
  flex: 0.4;
}

.Admin__Home__Content {
  flex: 0.8;
}
.router-link-exact-active {
  color: #fafafa;
  background-color: #d81f26;
}

/* .Admin_footer {
   position:absolute;
   left: 0;
   bottom: -217px;
   bottom:0;
   width: 100vw;
} */
.Admin_footer {
  margin-top: 77px;
}
</style>