<template>
  <div>
    <div
      class="
        text-center
        align-center
        display-5
        border
        d-flex
        justify-content-between
      "
    >
      <div class="ms-2 pb-2">
        <button class="btn btn-danger" style="background-color: #d81f26">
          Add Subscription
        </button>
      </div>
      <div class="me-3">Search bar</div>
    </div>
    <table class="table table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Plan Name</th>
          <th scope="col">Monthly Price</th>
          <th scope="col">Max Resolution</th>
          <th scope="col">Total Screens</th>
          <th scope="col">Edit</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(subsciption, i) in SubscriptionPlan" :key="subsciption._id">
          <th scope="row">{{ i + 1 }}</th>
          <td>{{ subsciption.Plan_name }}</td>
          <td>{{ subsciption.Monthly_price }}</td>
          <td>{{ subsciption.Max_video_quality }}</td>
          <td>{{ subsciption.Number_of_screen_available }}</td>
          <td class="table_td">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-pen-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"
              />
            </svg>
          </td>
          <td class="table_td">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-trash-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
              />
            </svg>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import SubscriptionApi from "../../../services/subscription.service";
export default {
  name: "AdminSubscriptionPlanPage",
  data() {
    return {
      SubscriptionPlan: [],
    };
  },
  created() {
    document.title = `NetflixAdmin - Subscription`;

    SubscriptionApi.getAllSubscription().then((res) => {
      this.SubscriptionPlan = res.data.SubscriptionPlan;
    });
  },
};
</script>

<style>
.table {
  background-color: #141414;
  color: #d2d2d2;
}
</style>