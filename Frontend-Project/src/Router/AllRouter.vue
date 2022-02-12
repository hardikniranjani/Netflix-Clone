<template>
  <div >
    <router-link :to="{ name: 'AdminLoginPage' }">AdminLoginPage</router-link><br />
    <router-link :to="{ name: 'IndexPage' }">IndexPage</router-link><br />
    <router-link :to="{ name: 'LogInPage' }">LogInPage</router-link><br />
    <router-link :to="{ name: 'ForgotPassword' }">ForgotPassword</router-link><br />
    <!-- <br /><br /> -->
    <!-- User Section -->
    <div class="all_router">
    <div>
    <h3>User Section</h3>
    <router-link :to="{ name: 'SignUpPage' }">SignUpPage</router-link><br />
    <router-link :to="{ name: 'UserAccount' }">UserAccount</router-link><br />
    <router-link :to="{ name: 'WatchHistory' }">WatchHistory</router-link><br />
    <router-link :to="{ name: 'WatchLater' }">WatchLater</router-link><br />
    <router-link :to="{ name: 'WishList' }">WishList</router-link><br />
                                                      
    <router-link :to="{ name: 'HomePage' }">HomePage</router-link><br />
    <router-link :to="{ name: 'SeriesHomePage' }">SeriesHomePage</router-link><br />
    <router-link :to="{ name: 'SeriesPage' }">SeriesPage</router-link><br />
    <router-link :to="{ name: 'Episode' }">Episode</router-link><br />


    <router-link :to="{ name: 'MovieHomePage' }">MovieHomePage</router-link><br />
    <router-link :to="{ name: 'MoviePage' }">MoviePage</router-link><br />
     <router-link :to="{ name: 'VideoComponent' }">VideoComponent</router-link><br />

    <router-link :to="{ name: 'GenersPage' }">GenersPage</router-link><br />
    <router-link :to="{ name: 'GenersContent' }">GenersContent</router-link><br />
    
    <router-link :to="{ name: 'SubscriptionPlan' }">SubscriptionPlan</router-link><br />
    <router-link :to="{ name: 'Subscription' }">Subscription</router-link><br />
    </div>
    <!-- <br /><br /> -->
    
    
    <!-- Admin Section -->
    <div>
    <h3>Admin Section</h3>
    <router-link :to="{ name: 'AdminSignUpPage' }">AdminSignUpPage</router-link><br />
    <router-link :to="{ name: 'AdminHomePage' }">AdminHomePage</router-link><br />
    <router-link :to="{ name: 'AdminAccount' }">AdminAccount</router-link><br />

    <router-link :to="{ name: 'ProductionCHomePage' }">ProductionCHomePage</router-link><br />
    <router-link :to="{ name: 'ProductionCPage' }">ProductionCPage</router-link><br />

    <router-link :to="{ name: 'SpokenLanguage' }">SpokenLanguage</router-link><br />
    <router-link :to="{ name: 'AdminSubscriptionPlan' }">AdminSubscriptionPlan</router-link><br />
    <router-link :to="{ name: 'AdminGenersPage' }">AdminGenersPage</router-link><br />

    <router-link :to="{ name: 'AdminSeriesHomePage' }">AdminSeriesHomePage</router-link><br />
    <router-link :to="{ name: 'AdminSeriesPage' }">AdminSeriesPage</router-link><br />

    <router-link :to="{ name: 'AdminMovieHomePage' }">AdminMovieHomePage</router-link><br />
    <router-link :to="{ name: 'AdminMoviePage' }">AdminMoviePage</router-link><br />
    <router-link :to="{ name: 'AdminSeriesPage' }">AdminSeriesPage</router-link><br />
    <router-link :to="{ name: 'AdminUserPage' }">AdminUserPage</router-link><br />
    <router-link :to="{ name: 'AdminOtherPage' }">AdminOtherPage</router-link><br />
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AllRouter",
};
</script>

<style>
.all_router{
  display:flex;
}
</style>