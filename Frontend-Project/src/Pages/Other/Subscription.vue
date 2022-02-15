<template>
  <div class="Subscription">
    <div class="nav"><NavBar /></div>
    <div class="Subscription_body container">
      <div class="Subscription_body_upper text-center mb-4 mt-3">
        <h2 class="Subscription_title">{{ Subscription.Plan_name }}</h2>
      </div>
      <div class="Subscription_body_middle container">
        <p>
          Monthly Price:
          <span class="Subscription_txt">
            {{ Subscription.Monthly_price }}
          </span>
        </p>
        <p>
          Available Screen:
          <span class="Subscription_txt">
            {{ Subscription.Number_of_screen_available }}
          </span>
        </p>
        <p>
          Max Video Quality:
          <span class="Subscription_txt">
            {{ Subscription.Max_video_quality }}
          </span>
        </p>
        <div class="d-flex">
          <p>
            Devices:
            <span
              v-for="(i, index) in Subscription.Devices"
              :key="i"
              class="Subscription_txt"
              >{{ i }}
              <span v-if="index + 1 != Subscription.Devices.length">,</span>
            </span>
          </p>
        </div>
      </div>
      <div class="Subscription_body_lower mb-4">
        <button class="btn btn-danger ms-2" @click="createOrder">
          Purchase
        </button>
      </div>
    </div>
    <div class="footer"><Footer /></div>
  </div>
</template>

<script>
import NavBar from "../../components/NavBar.vue";
import Footer from "../../components/Footer.vue";

import SubscriptionApi from "../../services/subscription.service";
import UserApi from "../../services/user.service";

export default {
  name: "Subscription",
  created() {
    document.title = `Netflix - Plan`;
  },
  data() {
    return {
      Subscription: {},
      Devices: "",
      app: document.getElementById("app"),
    };
  },
  components: {
    NavBar,
    Footer,
  },
  props: {
    id: String,
  },
  async mounted() {

    await SubscriptionApi.getSubscription({
      subscription_id: this.id,
    })
      .then((res) => {
        this.Subscription = res.data;
        this.Devices = this.Subscription.Devices;
      })
      .catch((err) => {
        console.log(err);
        this.$router.replace({ name: "PageNotFound" });
      });
  },
  methods: {
    async subscription(data) {
      await UserApi.addSubscription({
        plan_id: this.Subscription._id,
        data: data,
      })
        .then((res) => {
          alert(
            `Thank you for Purchaseing ${this.Subscription.Plan_name} plan`
          );
          this.$store.dispatch("ADD_USER", res.data);
          this.$router.replace({ name: "HomePage" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async loadRazorPay(src) {
      return new Promise((resolve) => {
        if (document.getElementById("payment")) {
          resolve(true);
          return;
        }
        const script = document.createElement("script");
        script.src = src;
        script.setAttribute("id", "payment");
        (script.onload = () => {
          resolve(true);
        }),
          (script.onerror = () => {
            resolve(false);
          }),
          this.app.appendChild(script);
      });
    },
    async createOrder() {
      const result = this.loadRazorPay(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!result) {
        alert("Failed to load payment script");
        return;
      }
      UserApi.createOrder(this.Subscription["Monthly_price"] * 100)
        .then((res) => {
          return res.data;
        })
        .then((res) => {
          const user = this.$store.state.user;
          var options = {
            key: "rzp_test_tmBFD5ntKbWxWP", // Enter the Key ID generated from the Dashboard
            amount: res.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: res.currency,
            name: "Ottplatform.com",
            description: "Purchase a subscription",
            image:
              "https://res.cloudinary.com/dmrt2ngec/image/upload/v1643437449/assets/ICO_o6wrx4.png",
            order_id: res.id, //This is a sample Order ID. Pass the `id` obtained in the previous step
            handler: (response) => this.subscription(response),
            //     callback_url: "/is-order-complete",
            prefill: {
              name: user.Name,
              email: user.Email,
              contact: "9999999999",
            },
            //     notes: {
            //       address: "Netflix Corporate Office",
            //     },
            theme: {
              color: "#3399cc",
            },
          };
          const paymentObject = new window.Razorpay(options);
          paymentObject.open();
        });
    },
  },
};
</script>

<style>
.Subscription {
  width: 100%;
  height: 100%;
}

.nav {
  margin-top: 0px;
}
.Subscription_body {
  border: 1px solid #fafafa;
  width: 100%;
  height: 100%;
  margin-top: 200px;
}
.Subscription_body_middle > p {
  font-size: 20px;
}
.Subscription_body_middle > div > p {
  font-size: 20px;
}
.Subscription_txt {
  margin-left: 10px;
  font-weight: bold;
  font-size: 22px;
  color: #fafafa;
  transition: all 0.4s;
  cursor: pointer;
}

.Subscription_txt:hover {
  color: #d81f26;
}
.Subscription_title {
  transition: all 0.4s;
  cursor: pointer;
}

.Subscription_title:hover {
  color: #d81f26;
}
.footer {
  margin-top: 470px;
}
</style>
