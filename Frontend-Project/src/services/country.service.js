import Http from "../httpcommon";
import store from "../store";
const { token } = store.state;

export default new (class Country_Service {
  createCountry(country_data) {
    return Http.post("/country", country_data, {
      headers: {
        "x-access-token": token,
      },
    });
  }

  bulkwrite(country_data_array) {
    return Http.post(`/country/addcountry`, country_data_array, {
      headers: {
        "x-access-token": token,
      },
    });
  }

  getAllCountry() {
    return Http.get("/country");
  }

  getCountry({ country_id }) {
    return Http.get(`/country/${country_id}`);
  }

  updateCountry({ country_id, country_data }) {
    console.log(country_data, "country_service - line 31");
    return Http.put(`/country/${country_id}`, country_data, {
      headers: {
        "x-access-token": token,
      },
    });
  }

  deleteCountry({ country_id }) {
    return Http.put(
      `/country/delete/${country_id}`,
      {},
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
  }

  HardDeleteCountry(country_id) {
    return Http.delete(`/country/${country_id}`, {
      headers: {
        "x-access-token": token,
      },
    });
  }
})();
