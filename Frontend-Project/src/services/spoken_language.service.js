import Http from '../httpcommon';
import store from '../store';
const { token } = store.state;
export default new (class Language_service {
  getAllSpokenLanguage() {
    return Http.get("/languages");
  }

  getSpokenLanguage({ language_id }) {
    return Http.get(`/languages/${language_id}`);
  }

  createSpokenLanguage(data){
    return Http.post("/languages", data, {
      headers: {
        "x-access-token": token,
      },
    });
  }

  updateLanguage({language_id,data}){
    return Http.put(`/languages/${language_id}`, data, {
      headers: {
        "x-access-token": token,
      },
    });
  }

  deleteLanguage({ language_id }){
    return Http.put(
      `/languages/delete/${language_id}`,
      {},
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
  }

  HardDeleteLanguage({ language_id }){
    return Http.delete(`/languages/${language_id}`, {
      headers: {
        "x-access-token": token,
      },
    });
  }
  
})();