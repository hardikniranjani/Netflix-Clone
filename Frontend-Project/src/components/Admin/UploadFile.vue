<template>
  <span v-if="Content_Type == 'Movie'">
    <label v-if="media_type == 'Banner'">
      <i class="bi bi-file-arrow-up-fill file_icon">
        <input
          class="input-file file_upload"
          id="file-input"
          type="file"
          accept="image/*"
          name="Banner"
          @change="
            ($event) => {
              filesChange($event.target.name, $event.target.files);
            }
          "
        />
      </i>
    </label>

    <label v-else-if="media_type == 'Video'">
      <i class="bi bi-cloud-upload-fill file_icon">
        <input
          class="file_upload"
          id="file-input"
          type="file"
          accept="video/*"
          name="video"
          @change="
            ($event) => {
              filesChange($event.target.name, $event.target.files);
            }
          "
        />
      </i>
    </label>

    <label v-else-if="media_type == 'BackDrop'">
      <i class="bi bi-upload file_icon">
        <input
          class="file_upload"
          id="file-input"
          type="file"
          name="backdrop_path"
          accept="image/*"
          @change="
            ($event) => {
              filesChange($event.target.name, $event.target.files);
            }
          "
        />
      </i>
    </label>
  </span>
  <span v-else>
    <label v-if="media_type == 'Banner'">
      <i class="bi bi-file-arrow-up-fill file_icon">
        <input
          class="file_upload"
          id="file-input"
          type="file"
          accept="image/*"
        />
      </i>
    </label>

    <label v-else-if="media_type == 'Video'">
      <i class="bi bi-cloud-upload-fill file_icon">
        <input
          class="file_upload"
          id="file-input"
          type="file"
          accept="video/*"
        />
      </i>
    </label>

    <label v-else-if="media_type == 'BackDrop'">
      <i class="bi bi-upload file_icon">
        <input
          class="file_upload"
          id="file-input"
          type="file"
          accept="image/*"
        />
      </i>
    </label>
  </span>
</template>

<script>
import MovieApi from "../../services/movie.service";
export default {
  name: "UploadFile",
  props: {
    media_type: String,
    Content_Type: String,
    id: String,
  },
  methods: {
    filesChange(fieldName, fileList) {
      const formData = new FormData();
      if (!fileList.length) return;
      formData.append(fieldName, fileList[0]);
      if (fieldName == "video") {
        MovieApi.uploadMovieVideo(this.id, formData).then((res) => {
          console.log(res)
          this.$emit(
            "mediaChange",
            "Video_path",
            res.data.movie.Video_path,
            this.id
          );
        });
      } else {
        MovieApi.uploadMovieImage(this.id, fieldName, formData).then((res) => {
          this.$emit(
            "mediaChange",
            fieldName,
            res.data.movie[fieldName],
            this.id
          );
        });
      }
    },
  },
};
</script>

<style>
.file_upload {
  display: none;
}

.file_icon {
  transition: all 0.4s;
}
.file_icon:hover {
  color: #d81f26;
  cursor: pointer;
}
</style>