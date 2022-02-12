import Http from "../httpcommon";
import store from "../store/index";
export default new (class User {
  getAnUser(data) {
    return Http.post("/user/login", data);
  }

  signUpEmail(email) {
    return Http.post("/user/signupEmail", { email: email });
  }

  createAnUser(data, token) {
    return Http.post("/user/signup", data, {
      headers: {
        "x-access-token": token,
      },
    });
  }

  forgotPasword(email){
    return Http.post('user/forgotPassword',JSON.stringify(email));
  }

  changePassword({token,password}){
    return Http.post('user/changePassword',{password},{
      headers : {
        "x-access-token" : token
      }
    })
  }

  createAnAdmin(data) {
    return Http.post("/user/create_admin", data);
  }

  updateAnUser(data) {
    return Http.put("/user/update", data, {
      headers: { "x-access-token": store.state.token },
    });
  }

  createOrder(amount) {
    return Http.post(
      `/user/order?amount=${amount}`,
      {},
      {
        headers: {
          "x-access-token": store.state.token,
        },
      }
    );
  }

  deleteAnUser() {
    return Http.put(
      "/user/delete",
      {},
      {
        headers: { "x-access-token": store.state.token },
      }
    );
  }

  showWatchHistory() {
    return Http.get("/user/watch_history", {
      headers: {
        "x-access-token": store.state.token,
      },
    });
  }

  addToWatchHistory({ media_id, media_type, media_duartion }) {
    return Http.post(
      `/user/watch_history?media_id=${media_id}&media_type=${media_type}&media_duartion=${media_duartion}`,
      {},
      {
        headers: {
          "x-access-token": store.state.token,
        },
      }
    );
  }

  removeFromHistory({ media_id, media_type }) {
    return Http.put(
      `/user/removeonehistory?media_id=${media_id}&media_type=${media_type}`,
      {},
      {
        headers: {
          "x-access-token": store.state.token,
        },
      }
    );
  }

  deleteWatchHistory() {
    return Http.delete("/user/delete_history", {
      headers: {
        "x-access-token": store.state.token,
      },
    });
  }

  showWatchLater() {
    return Http.get(`user/watch_later`, {
      headers: {
        "x-access-token": store.state.token,
      },
    });
  }

  addToWatchLater({ media_id, media_type }) {
    return Http.post(
      `/user/watch_later?media_id=${media_id}&media_type=${media_type}`,
      {},
      {
        headers: {
          "x-access-token": store.state.token,
        },
      }
    );
  }

  removeFromWatchLater({ media_id, media_type }) {
    return Http.put(
      `user/remove_watch_later?media_id=${media_id}&media_type=${media_type}`,
      {},
      {
        headers: {
          "x-access-token": store.state.token,
        },
      }
    );
  }

  deleteWatchLater() {
    return Http.delete("user/remove", {
      headers: {
        "x-access-token": store.state.token,
      },
    });
  }

  getWishList() {
    return Http.get("user/wishlist", {
      headers: {
        "x-access-token": store.state.token,
      },
    });
  }

  addToWishList({ media_id, media_type }) {
    return Http.post(
      `user/wishlist?media_id=${media_id}&media_type=${media_type}`,
      {},
      {
        headers: {
          "x-access-token": store.state.token,
        },
      }
    );
  }
  removeFromWishlist({ media_id, media_type }) {
    return Http.put(
      `user/removefromwishlist?media_id=${media_id}&media_type=${media_type}`,
      {},
      {
        headers: {
          "x-access-token": store.state.token,
        },
      }
    );
  }
  deleteWishList() {
    return Http.delete("user/wishlist", {
      headers: {
        "x-access-token": store.state.token,
      },
    });
  }
  addSubscription({ plan_id, data }) {
    return Http.post(
      `user/addsubscription?plan_id=${plan_id}`,
      { data },
      {
        headers: {
          "x-access-token": store.state.token,
        },
      }
    );
  }
})();
