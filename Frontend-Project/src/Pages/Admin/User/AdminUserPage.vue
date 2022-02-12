<template>
  <div>
    <div class="text-center align-center display-5 border">Search bar</div>
    <table class="table table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">User Name</th>
          <th scope="col">User Email</th>
          <th scope="col">Edit</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, i) in Users.allUser" :key="user._id">
          <th scope="row">{{ i + 1 }}</th>
          <td>{{ user.Name }}</td>
          <td>{{ user.Email }}</td>
          <td class="table_td">
            <router-link class="nav_link" :to="{ name: 'AdminEditUser', params: { id: user._id }}">
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
            </router-link>
          </td>
          <td class="table_td">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-person-x-fill"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminApi from "../../../services/admin.service";
// import UserApi from "../../services/user.service";
export default {
  name: "AdminMoviePage",
  data() {
    return {
      Users: [],
    };
  },
  created() {
    document.title = `NetflixAdmin - Users`;

    AdminApi.getAllUsers().then((res) => {
      console.log(res);
      this.Users = res.data;
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