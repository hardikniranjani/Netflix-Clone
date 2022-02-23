import Notifications from './notificationMixin';
import UserApi from "../services/user.service";
export default {
  
  computed: {
    availableInWatchLater(){
      return this.$store.getters.availableInWatchLater(
        parseInt(this.id),
        "Movies"
      );
    },
    classList() {
      return this.availableInWatchLater
        ? "bi-bookmark-check text-danger"
        : "bi-bookmark text-light";
    },
  },
  methods: {
    async addToWatchLater() {
      await UserApi.addToWatchLater({
        media_type: this.media_type,
        media_id: this.id,
      })
        .then((res) => {
          
          this.$store.dispatch("ADD_WATCH_LATER", res.data.updatedLibrary);
          Notifications("Successfully added to watch later!", "success");
        })
        .catch((err) => {
          
          console.log(err);
          Notifications("Error while adding to watch later.", "danger");
        });
    },
    async removeFromWatchLater() {
      await UserApi.removeFromWatchLater({
        media_type: this.media_type,
        media_id: this.id,
      }).then((res) => {
        
        this.$store.dispatch("ADD_WATCH_LATER", res.data.list);
        
        Notifications("Removed from watch later !!", "success");
      });
    },
    updateWatchLater() {
      if (this.availableInWatchLater) {
        this.removeFromWatchLater();
      } else {
        this.addToWatchLater();
      }
    },
  },
};