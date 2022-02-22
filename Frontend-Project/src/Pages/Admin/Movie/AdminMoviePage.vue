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
      <div class="ms-2 mb-2">
        <router-link class="nav_link" :to="{ name: 'AdminAddMovie' }">
          <button class="btn btn-danger" style="background-color: #d81f26">
            Add Movie
          </button>
        </router-link>
      </div>
      <div class="me-3 mb-2">Search bar</div>
    </div>
    <table class="table table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Movie</th>
          <th scope="col">Movie Name</th>
          <th scope="col">Banner</th>
          <th scope="col">Video</th>
          <th scope="col">BackDrop Banner</th>
          <th scope="col">Edit</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(movie, i) in pageList" :key="movie._id">
          <th scope="row">{{ indexs(i) }}</th>

          <td>
            <router-link
              :to="{
                name: 'MovieVideo',
                params: { id: movie._id },
              }"
            >
              <img
                class="Home_Movie_categories_card"
                :src="movie.backdrop_path"
                :alt="movie.MovieName"
              />
            </router-link>
          </td>
          <td>{{ movie.MovieName }}</td>
          <td>
            <UploadFile
              :media_type="media_Banner"
              Content_Type="Movie"
              :id="movie._id"
              @mediaChange="ChangedMediaData"
            />
          </td>
          <td>
            <UploadFile
              :media_type="media_video"
              Content_Type="Movie"
              :id="movie._id"
            />
          </td>
          <td>
            <UploadFile
              :media_type="media_BackDrop"
              Content_Type="Movie"
              :id="movie._id"
              @mediaChange="ChangedMediaData"
              
            />
          </td>
          <td class="table_td">
            <router-link class="nav_link" :to="{ name: 'AdminAddMovie' }">
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
  <div class="d-flex justify-content-center">
    <Pagination
      v-if="pageNumbers.length > 0"
      @changePage="changePageNData($event)"
      :pageNumbers="pageNumbers"
      :currentPageIndex="currentPageIndex"
    />
  </div>
</template>

<script>
import UploadFile from "../../../components/Admin/UploadFile.vue";
import MoviesApi from "../../../services/movie.service";
import Pagination from "../../../components/Pagination.vue";
export default {
  name: "AdminMoviePage",
  data() {
    return {
      Movies: [],
      pageList: [],
      currentPageIndex: 1,
      dataPerPage: 5,
      pageNumbers: [],
      media_video: "Video",
      media_Banner: "Banner",
      media_BackDrop: "BackDrop",
      Content_Type: "Movie",
    };
  },
  methods: {
    changePageNData(newPageNumber) {
      this.pageList = this.Movies.slice(
        this.dataPerPage * (newPageNumber - 1),
        newPageNumber * this.dataPerPage
      );
      this.currentPageIndex = newPageNumber;
    },
    makePartition() {
      let currentPartition = this.Movies.length / this.dataPerPage;
      let pagePartition =
        currentPartition % 1 == 0
          ? currentPartition
          : Math.ceil(currentPartition);
      this.pageNumbers = Array.from({ length: pagePartition }, (_, i) => i + 1);
    },
    async GetAllMovies() {
      await MoviesApi.getAllMovie().then((res) => {
        this.Movies = res.data;
        this.pageList = this.Movies.slice(0, this.dataPerPage);
        this.makePartition();
      });
    },
    ChangedMediaData(mediaName, mediaPath, mediaId) {
      let MovieData = this.Movies.filter((obj) => {
        return obj._id == mediaId;
      });
      MovieData[0][mediaName] = mediaPath;
    },
  },

  components: {
    Pagination,
    UploadFile,
  },
  created() {
    document.title = `NetflixAdmin - Movies`;
    this.GetAllMovies();
  },


  computed: {
    indexs() {
      return (idx) => {
        if (this.currentPageIndex == 1) {
          return idx + 1;
        } else {
          return (this.currentPageIndex - 1) * this.dataPerPage + idx + 1;
        }
      };
    },
  },
};
</script>

<style>
.table {
  background-color: #000000 !important;
  color: #d2d2d2;
}

.table_td {
  transition: all 0.4s;
  width: min-content;
}
.table_td:hover {
  cursor: pointer;
  color: #d81f26;
  /* background-color: #d81f26; */
}
.nav_link:hover {
  cursor: pointer;
}
</style>