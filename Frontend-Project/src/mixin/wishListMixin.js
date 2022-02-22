import Notifications from "./notificationMixin";
import UserApi from "../services/user.service";

export default {
  data() {
    return {
      availableInWishList: false,
    };
  },
  computed: {
    heartIconClass() {
      return this.availableInWishList
        ? "bi-heart-fill text-danger"
        : "bi-heart text-light";
    },
  },
  updated() {
    let isAvailableInWishList = this.$store.getters.availableInWishList(
      parseInt(this.id),
      this.media_type
    );

    this.availableInWishList = isAvailableInWishList;
  },
  methods: {
    updateWishList() {
      if (this.availableInWishList) {
        this.removeFromWishList();
      } else {
        this.addToWishList();
      }
    },
    async removeFromWishList() {
      await UserApi.removeFromWishlist({
        media_type: this.media_type,
        media_id: this.id,
      })
        .then((res) => {
          console.log(res.data);
          this.availableInWishList = false;
          this.$store.dispatch("ADD_WISH_LIST", res.data.list);
          Notifications(`${this.media_type} removed from your wish list.`, "success");
        })
        .catch((err) => {
          console.log(err);
          this.availableInWishList = false;
          Notifications("Error while removing from your wish list.", "danger");
        });
    },
    async addToWishList() {
      await UserApi.addToWishList({
        media_type: this.media_type,
        media_id: this.id,
      })
        .then((res) => {
          this.$store.dispatch("ADD_WISH_LIST", res.data.wishlist);
          this.availableInWishList = true;
          Notifications(`${this.media_type} added to your wish list.`, "success");
        })
        .catch((err) => {
          this.availableInWishList = false;
          Notifications(err, "danger");
        });
    },
  },
};
