<template>
  <div class="mainContainer">
    <div class="upper">
      <h3 class="display-7 text-center pt-3 mb-4">{{ Name }}</h3>
    </div>
    <div class="mainContainer_body d-inline-flex">
      <p>
        Monthly Price:
        <span class="mainContainer_body_txt"
          ><i class="fa fa-rupee ms-1"></i>{{ Price }}
        </span>
      </p>
      <p>
        Max Quality:
        <span class="mainContainer_body_txt ms-1">{{ Quality }} </span>
      </p>
      <p>
        Devices:
        <span class="mainContainer_body_txt ms-1">
          <span v-for="(i, index) in device" :key="i"
            >{{ i }}
            <span v-if="index + 1 != device.length">,</span>
          </span>
        </span>
      </p>
    </div>
    <div class="mainContainer_lower mt-4">
      <button class="btn btn-outline-primary" @click="createOrder">
        Purchase
      </button>
    </div>
  </div>
</template>

<script>
// import SubscriptionApi from "../services/subscription.service";
import UserApi from "../services/user.service";
export default {
  name: "container",
  data(){
      return {
          app: document.getElementById("app"),
      }
  },
  props: {
    Name: String,
    Price: Number,
    Screen: Number,
    Quality: String,
    id: Number,
    device: [],
  },

  methods: {
    redirect() {
      this.$router.push({ name: "Subscription", params: { id: this.id } });
    },
    async subscription(data) {
      await UserApi.addSubscription({
        plan_id: this.id,
        data: data,
      })
        .then((res) => {
          console.log(res);
          alert(
            `Thank you for Purchaseing plan.`
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
        if (document.getElementById("payment_script")) {
          resolve(true);
          return;
        }
        const script = document.createElement("script");
        script.src = src;
        script.setAttribute("id", "payment_script");
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
        alert("Failed to load payment page.");
        return;
      }
      UserApi.createOrder(this.Price * 100)
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
.mainContainer {
  font-family: "Netflix Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  margin-right: 80px !important;
  margin-bottom: 80px !important;
  width: 280px;
  height: 300px;
  box-shadow: 0px 2px 4px 4px #fafafa;
  border: none;
  border-radius: 20px;
  color: lightgrey;
}

.mainContainer_body {
  padding-left: 10px;
  flex-direction: column;
}
.mainContainer_body > p {
  font-weight: bold;
}

.mainContainer_body_txt {
  font-weight: lighter;
  color: rgb(216, 31, 38);
}

.mainContainer_lower {
  align-items: center;
  text-align: center;
}

/* @media screen and (max-width: 788px) {
  .mainContainer{
    margin-left:20px;
  }
} */
</style>