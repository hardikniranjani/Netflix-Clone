<template>
  <div class="index__body">
    <AdminNavBar  style="z-index: 20" />
    <div class="container-fluid index__body_mid">
      <!-- Form -->
      <h1 class="form_title display-5">Add Movie</h1>
      <form class="add_movie_form" style="z-index: 2">
        <!-- movie name -->
        <input
          class="form-control mb-2"
          type="text"
          placeholder="Movie/series Name"
          id="movie_series_name"
        />
        <!-- short discription -->
        <input
          class="form-control mb-2"
          type="text"
          placeholder="Short Description"
          id="Short_Description"
        />

        <div class="mb-2 form-check">
          <input
            type="checkbox"
            name="checkbox_category"
            class="box form-check-input"
            value="Anime"
          />
          <label class="form-check-label">Anime</label>
        </div>
        <div class="mb-2 form-check">
          <input
            type="checkbox"
            name="checkbox_category"
            class="box form-check-input"
            value="Classic"
          />
          <label class="form-check-label">Classic</label>
        </div>
        <div class="mb-2 form-check">
          <input
            type="checkbox"
            name="checkbox_category"
            class="box form-check-input"
            value="Dramas"
          />
          <label class="form-check-label">Dramas</label>
        </div>
        <div class="mb-2 form-check">
          <input
            type="checkbox"
            name="checkbox_category"
            class="box form-check-input"
            value="Action"
          />
          <label class="form-check-label">Action</label>
        </div>
        <div class="mb-2 form-check">
          <input
            type="checkbox"
            name="checkbox_category"
            class="box form-check-input"
            value="Adventure"
          />
          <label class="form-check-label">Adventure</label>
        </div>
        <div class="mb-2 form-check">
          <input
            type="checkbox"
            name="checkbox_category"
            class="box form-check-input"
            value="Comedy"
          />
          <label class="form-check-label">Comedy</label>
        </div>
        <div class="mb-2 form-check">
          <input
            type="checkbox"
            name="checkbox_category"
            class="box form-check-input"
            value="Crime and mystery"
          />
          <label class="form-check-label">Crime and mystery</label>
        </div>
        <div class="mb-2 form-check">
          <input
            type="checkbox"
            name="checkbox_category"
            class="box form-check-input"
            value="Documentaries "
          />
          <label class="form-check-label">Documentaries </label>
        </div>
        <div class="mb-2 form-check">
          <input
            type="checkbox"
            name="checkbox_category"
            class="box form-check-input"
            value="Romance"
          />
          <label class="form-check-label">Romance</label>
        </div>
        <div class="mb-2 form-check">
          <input
            type="checkbox"
            name="checkbox_category"
            class="box form-check-input"
            value="Thriller"
          />
          <label class="form-check-label">Thriller</label>
        </div>

        <!-- relese date -->
        <div class="d-inline-flex w-100">
          <input
            class="add_movie_form_relese_date_input form-control mb-2"
            type="date"
          />
          <label
            class="
              add_movie_form_relese_date_btn
              btn btn-danger
              form-check-label
              ms-2
            "
            >Release date
          </label>
        </div>

        <!-- Rating -->
        <div class="d-inline-flex w-100">
          <label
            class="
              add_movie_form_relese_date_btn
              btn btn-danger
              form-check-label
              me-2
            "
            >Rating</label
          >
          <input
            class="add_movie_form_relese_date_input form-control mb-2"
            type="number"
          />
        </div>
        <!-- director name -->
        <input
          class="form-control mb-2"
          type="text"
          placeholder="Director name"
          id="Director_name"
        />

        <!-- long discription -->
        <textarea
          class="form-control mb-2"
          placeholder="Long Description"
          id="LongDescription"
        ></textarea>

        <!-- select banner -->
        <label class="text-white" for="img"
          >Select banner<lable style="color: #f40612">*</lable>:</label
        >
        <input
          class="btn btn-outline-danger"
          id="image_file"
          type="file"
          accept="image/*"
        />

        <!-- select trailer -->
        <label class="text-white" for="video">Select Video:</label>
        <input
          class="btn btn-outline-danger"
          type="file"
          id="video"
          name="video"
          accept="video/*"
        /><br />

        <!-- subimt button -->
        <button
          class="btn btn-danger mt-3"
          type="button"
          style="background-color: #f40612"
          onclick="add_image()"
        >
          Go
        </button>
      </form>
      <div style="margin-top: 500px"></div>
    </div>
  </div>
</template>

<script>

import AdminNavBar from "../../../components/Admin/AdminNavBar.vue";
export default {
  name: "AdminAddMovie",
  components: {
    AdminNavBar,
  },
  mounted() {
    document.title = `NetflixAdmin - AddMovies`;
  }
};
</script>

<style scoped src="../../../Style/addmovie_series.css">
</style>