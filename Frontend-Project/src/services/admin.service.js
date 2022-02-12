import Http from "../httpcommon";
import store from "../store/index";
export default new (class Admin_Service {
  deleteAnUserByAdmin(id) {
    return Http.delete(`/user/deleteuser/${id}`, {
      headers: { "x-access-token": store.state.token },
    });
  }

  getAllUsers() {
    return  Http.get("/user/getallusers", {
      headers: { "x-access-token": store.state.token },
    });
  }

  getAllDeletedUsers() {
    return Http.get("/user/softdeleteduser", {
      headers: { "x-access-token": store.state.token },
    });
  }
})();
