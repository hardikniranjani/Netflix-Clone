import Notifications from "./notificationMixin";
import UserApi from "../services/user.service";

export default {
  computed: {
    availableInWishList() {
      return this.$store.getters.availableInWishList(
        parseInt(this.id),
        this.media_type
      );
    },
    heartIconClass() {
      return this.availableInWishList
        ? "bi-heart-fill text-danger"
        : "bi-heart text-light";
    },
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
          this.$store.dispatch("ADD_WISH_LIST", res.data.list);
          Notifications(
            `${this.media_type} removed from your wish list.`,
            "success"
          );
        })
        .catch((err) => {
          console.log(err);
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

          Notifications(
            `${this.media_type} added to your wish list.`,
            "success"
          );
        })
        .catch((err) => {
          Notifications(err, "danger");
        });
    },
  },
};
