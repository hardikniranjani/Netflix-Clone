import Http from "../httpcommon";
import store from "../store";
const { token } = store.state;

export default new (class Company_Service {
  getAllCompany() {
    return Http.get(`/company`);
  }

  getAnCompany({company_id}) {
    return Http.get(`/company/${company_id}`);
  }

  createCompany(company_data) {
    return Http.post(`/company`, company_data, {
      headers: {
        "x-access-token": company_data,
      },
    });
  }

  updateCompany(company_id, updated_company_data) {
    return Http.put(`/company/${company_id}`, updated_company_data, {
      headers: {
        "x-access-token": token,
      },
    });
  }

  deleteCompany({company_id}) {
    return Http.put(
      `/company/delete/${company_id}`,
      {},
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
  }

  HardDeleteAnCompany({ company_id }) {
    return Http.delete(`/company/${company_id}`, {
      headers: {
        "x-access-token": token,
      },
    });
  }

  
})();
