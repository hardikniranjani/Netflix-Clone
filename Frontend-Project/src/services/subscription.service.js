import Http from '../httpcommon';
import store from '../store';
const { token } = store.state;

export default new (class Subscription_Service {
  getAllSubscription() {
    return Http.get(`/subscription`);
  }

  getSubscription({ subscription_id }) {
    return Http.get(`/subscription/${subscription_id}`);
  }

  createSubscription({ subscription_plan }) {
    return Http.post(`/subscription`, subscription_plan, {
      headers: {
        "x-access-token": token,
      },
    });
  }
  deleteSubscription({ subscription_id }) {
    return Http.put(
      `/subscription/delete/${subscription_id}`,
      {},
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
  }
  updateSubscription({ subscription_id }) {
    return Http.put(
      `/subscription/${subscription_id}`,
      {},
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
  }

  HardDeleteSubscription({ subscription_id }) {
        return Http.delete(
          `/subscription/${subscription_id}`,
          {},
          {
            headers: {
              "x-access-token": token,
            },
          }
        );
  }
})();