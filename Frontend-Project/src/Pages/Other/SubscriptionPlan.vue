<template>
  <div class="SubscriptionPlan">
    <div class="nav"><NavBar /></div>
    <div class="SubscriptionPlan_body container">
      <h2 class="mb-5 ms-2 Subscription_title ">Subscription Plan</h2>
      <div class="AllPlans">
        <div v-for="i in Subscription" :key="i._id">
          <Container
            class="container_plan"
            :id="i._id"
            :Name="i.Plan_name"
            :Price="i.Monthly_price"
            :Screen="i.Number_of_screen_available"
            :Quality="i.Max_video_quality"
          />
        </div>
      </div>
    </div>
    <div class="footer"><Footer /></div>
  </div>
</template>

<script>
import Container from "../../components/container.vue";
import NavBar from "../../components/NavBar.vue";
import Footer from "../../components/Footer.vue";

import SubscriptionApi from "../../services/subscription.service";
export default {
  name: "SubscriptionPlan",
  created() {
    document.title = `Netflix - AllPlans`;
  },
  components: {
    NavBar,
    Footer,
    Container,
  },
  data() {
    return {
      Subscription: [],
    };
  },
  async mounted() {
    let subscription_res = await SubscriptionApi.getAllSubscription();
    console.log(subscription_res);
    this.Subscription = subscription_res.data.SubscriptionPlan;
  },
};
</script>

<style>
.SubscriptionPlan {
  width: 100%;
  height: 100%;
}
.AllPlans {
  display: flex;
  flex-wrap: wrap;
  text-decoration: none;
}
.container_plan {
  margin: 10px;
  margin-right: 100px;
}
.Subscription_title{
    transition: all 0.4s;
  cursor: pointer;
}
.Subscription_title:hover{
 color: #D81F26
}
.nav {
  margin-top: 0px;
}
.SubscriptionPlan_body {
  margin-top: 150px;
}
.footer {
  margin-top: 470px;
}
</style>