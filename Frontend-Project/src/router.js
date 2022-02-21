import { createWebHistory, createRouter } from "vue-router";
import store from "./store";

import indexPage from "./Pages/indexPage.vue";
import LoginPage from "./Pages/LoginPage.vue";
import SignUpPage from "./Pages/SignUpPage.vue";
import ForgotPassword from "./Pages/ForgotPassword.vue";
import SetPassword from "./Pages/SetPassword.vue";

import PageNotFound from "./Pages/PageNotFound.vue";

// Admin
import AdminMain from "./Pages/Admin/AdminMain.vue";
import AdminAccount from "./Pages/Admin/AdminAccount.vue";
import AdminHome from "./Pages/Admin/AdminHome.vue";

// Admin - Movie
import AdminMoviePage from "./Pages/Admin/Movie/AdminMoviePage.vue";
import AdminAddMovie from "./Pages/Admin/Movie/AdminAddMovie.vue";

// Admin - Series
import AdminAddSeries from "./Pages/Admin/Series/AdminAddSeries.vue";
import AdminSeriesList from "./Pages/Admin/Series/AdminSeriesList.vue";
import AdminSeries from "./Pages/Admin/Series/AdminSeries.vue";
import AdminSeason from "./Pages/Admin/Series/AdminSeason.vue";

// Admin - User
import AdminUserPage from "./Pages/Admin/User/AdminUserPage.vue";
import AdminEditUser from "./Pages/Admin/User/EditUser.vue";

// Admin - Other
import AdminGenresPage from "./Pages/Admin/Other/AdminGenresPage.vue";         
import AdminCountryPage from "./Pages/Admin/Other/AdminCountryPage.vue";         
import AdminLanguagePage from "./Pages/Admin/Other/AdminLanguagePage.vue";         
import AdminCompanyPage from "./Pages/Admin/Other/AdminCompanyPage.vue";         
import AdminSubscriptionPlanPage from "./Pages/Admin/Other/AdminSubscriptionPlanPage.vue";         

import AdminAddCountry from "./Pages/Admin/Other/AddCountry.vue";         
import AdminAddGenres from "./Pages/Admin/Other/AddGenres.vue";         
import AdminAddLanguage from "./Pages/Admin/Other/AddLanguage.vue";         
import AdminAddCompany from "./Pages/Admin/Other/AddCompany.vue";         

import AdminEditCountry from "./Pages/Admin/Other/EditCountry.vue";         
import AdminEditGenres from "./Pages/Admin/Other/EditGenres.vue";         
import AdminEditLanguage from "./Pages/Admin/Other/EditLanguage.vue";         
import AdminEditCompany from "./Pages/Admin/Other/EditCompany.vue";         

// User         
import UserMain from "./Pages/User/UserMain.vue";         
import UserAccount from "./Pages/User/UserAccount.vue";         

import HomePage from "./Pages/User/HomePage.vue";         

import WatchHistory from "./Pages/User/WatchHistory.vue";         
import WatchLater from "./Pages/User/WatchLater.vue";         
import WishList from "./Pages/User/WishList.vue";

// Series
import SeriesHomePage from "./Pages/Series/SeriesHomePage.vue";
import SeriesPage from "./Pages/Series/SeriesPage.vue";
import EpisodeVideo from "./components/Series/EpisodeVideo.vue";

// Movies
import MovieHomePage from "./Pages/Movie/MovieHomePage.vue";
import MoviePage from "./Pages/Movie/MoviePage.vue";
import MovieVideo from "./components/Movie/MovieVideo.vue";

// Other
import GenersPage from "./Pages/Other/GenersPage.vue";
import GenersContent from "./Pages/Other/GenersContent.vue";

import SubscriptionPlan from "./Pages/Other/SubscriptionPlan.vue";
import Subscription from "./Pages/Other/Subscription.vue";

const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: "PageNotFound",
    component: PageNotFound,
  },
  {
    path: "/",
    name: "IndexPage",
    component: indexPage,
  },
  {
    path: "/login",
    name: "LogInPage",
    component: LoginPage,
  },
  {
    path: "/forgotpassword",
    name: "ForgotPassword",
    component: ForgotPassword,
  },
  {
    path: "/setpassword/:token",
    name: "SetPassword",
    component: SetPassword,
    props: true,
  },
  {
    path: "/signup/:token",
    name: "SignUpPage",
    component: SignUpPage,
    props: true,
  },
  {
    path: "/home",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/homeseries",
    name: "SeriesHomePage",
    component: SeriesHomePage,
  },
  {
    path: "/homeseries/series/:id",
    name: "SeriesPage",
    component: SeriesPage,
    props: true,
  },
  {
    path: "/homeseries/series/:id/:seasonid/episode/:episodeid/play",
    name: "EpisodeVideo",
    component: EpisodeVideo,
    props: true,
    meta: {
      requiredAuth: true,
    },
  },
  {
    path: "/homemovie",
    name: "MovieHomePage",
    component: MovieHomePage,
  },
  {
    path: "/homemovie/movie/:id",
    name: "MoviePage",
    component: MoviePage,
    props: true,
  },
  {
    path: "/homemovie/movie/:id/play",
    name: "MovieVideo",
    component: MovieVideo,
    props: true,
    meta: {
      requiredAuth: true,
    },
  },

  {
    path: "/geners",
    name: "GenersPage",
    component: GenersPage,
  },
  {
    path: "/geners/:id",
    name: "GenersContent",
    component: GenersContent,
    props: true,
  },
  {
    path: "/subscription",
    name: "SubscriptionPlan",
    component: SubscriptionPlan,
  },
  {
    path: "/subscription/:id",  
    name: "Subscription",       
    component: Subscription,    
    props: true,
  },
  // user section

  {
    path: "/useraccount",
    name: "UserMain",
    component: UserMain,
    children: [
      {
        path: "",
        name: "UserAccount",
        component: UserAccount,
        meta: {
          requiredAuth: true,
        },
      },
      {
        path: "watchhistory",
        name: "WatchHistory",
        component: WatchHistory,
        meta: {
          requiredAuth: true,
        },
      },

      {
        path: "watchlater",
        name: "WatchLater",
        component: WatchLater,
        meta: {
          requiredAuth: true,
        },
      },
      {
        path: "wishlist",
        name: "WishList",
        component: WishList,
        meta: {
          requiredAuth: true,
        },
      },
    ],
  },

  // admin part
  {
    path: "/admin",
    name: "AdminMain",
    component: AdminMain,
    children: [
      {
        path: "",
        name: "AdminAccount",
        component: AdminAccount,
      },
      {
        path: "signup",
        name: "AdminSignUpPage",
        component: SignUpPage,
      },
      {
        path: "home",
        name: "AdminHomePage",
        component: AdminHome,
        children: [
          {
            path: "movielist",
            name: "AdminMoviePage",
            component: AdminMoviePage,
          },
          {
            path: "serieslist",
            name: "AdminSeriesList",
            component: AdminSeriesList,
          },
          {
            path: "userlist",
            name: "AdminUserPage",
            component: AdminUserPage,
          },
          {
            path: "genreslist",
            name: "AdminGenresPage",
            component: AdminGenresPage,
          },
          {
            path: "languagelist",
            name: "AdminLanguagePage",
            component: AdminLanguagePage,
          },
          {
            path: "countrylist",
            name: "AdminCountryPage",
            component: AdminCountryPage,
          },
          {
            path: "companylist",
            name: "AdminCompanyPage",
            component: AdminCompanyPage,
          },
          {
            path: "planlist",
            name: "AdminSubscriptionPlanPage",
            component: AdminSubscriptionPlanPage,
          },
        ],
      },
      {
        path: "subcription",
        name: "AdminSubscriptionPlan",
        component: SubscriptionPlan,
      },
      // admin add part
      {
        path: "addmovie",
        name: "AdminAddMovie",
        component: AdminAddMovie,
      },
      {
        path: "addseries",
        name: "AdminAddSeries",
        component: AdminAddSeries,
      },

      {
        path: "addcountry",
        name: "AdminAddCountry",
        component: AdminAddCountry,
      },
      {
        path: "addgenres",
        name: "AdminAddGenres",
        component: AdminAddGenres,
      },
      {
        path: "addlanguage",
        name: "AdminAddLanguage",
        component: AdminAddLanguage,
      },
      {
        path: "addcompany",
        name: "AdminAddCompany",
        component: AdminAddCompany,
      },
      // admin edit part

      {
        path: "edituser/:id",
        name: "AdminEditUser",
        component: AdminEditUser,
        props: true,
      },
      {
        path: "editmovie/:id",
        name: "AdminEditMovie",
        component: AdminAddMovie,
        props: true,
      },
      {
        path: "editseries/:id",
        name: "AdminEditSeries",
        component: AdminAddSeries,
        props: true,
      },

      {
        path: "editcountry/:id",
        name: "AdminEditCountry",
        component: AdminEditCountry,
        props: true,
      },
      {
        path: "editgenres/:id",
        name: "AdminEditGenres",
        component: AdminEditGenres,
        props: true,
      },
      {
        path: "editlanguage/:id",
        name: "AdminEditLanguage",
        component: AdminEditLanguage,
        props: true,
      },
      {
        path: "editcompany/:id",
        name: "AdminEditCompany",
        component: AdminEditCompany,
        props: true,
      },

      // admin page
      {
        path: "series/:id",
        name: "AdminSeries",
        component: AdminSeries,
        props: true,
      },
      {
        path: "series/:id/season/:seasonId",
        name: "AdminSeason",
        component: AdminSeason,
        props: true,
      },
      {
        path: "movie/:id",
        name: "AdminMovieHomePage",
        component: MoviePage,
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  // scrollBehavior(to, from, savedPosition) {
  //   return savedPosition || { top: 0 };
  // },
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to) => {
  if (to.meta.requiredAuth && !store.state.user.Name) {
    return { name: "LogInPage" };
  }
});
export default router;
