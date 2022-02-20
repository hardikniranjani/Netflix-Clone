<template>
  <span v-if="Content_Type == 'Movie'">
    <label v-if="media_type == 'Banner'">
      <img v-if="loading" :src="require('../../assets/loading.gif')" class="loading_class">
      <i v-else class="bi bi-file-arrow-up-fill file_icon">
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
      <img v-if="loading" :src="require('../../assets/loading.gif')" class="loading_class">
      <i v-else class="bi bi-cloud-upload-fill file_icon">
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
      <img v-if="loading" :src="require('../../assets/loading.gif')" class="loading_class">
      <i v-else class="bi bi-upload file_icon">
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
  data(){
    return {
      loading : false
    }
  },
  props: {
    media_type: String,
    Content_Type: String,
    id: Number,
  },
  methods: {
    filesChange(fieldName, fileList) {
      const formData = new FormData();
      if (!fileList.length) return;
      formData.append(fieldName, fileList[0]);
      if (fieldName == "video") {
        this.loading = true;
        MovieApi.uploadMovieVideo(this.id, formData).then((res) => {
          console.log(res)
          this.$emit(
            "mediaChange",
            "Video_path",
            res.data.movie.Video_path,
            this.id
          );
        })
        .finally(()=>{
          this.loading = false;
        })
        this.$notify({
          text : 'Video uploaded Successfully!!',
          type : 'success',
          duration : 5000,
          speed : 2000
        })
      } else {
        this.loading = true;
        MovieApi.uploadMovieImage(this.id, fieldName, formData).then((res) => {
          this.$emit(
            "mediaChange",
            fieldName,
            res.data.movie[fieldName],
            this.id
          );
          this.$notify({
          text : 'Image uploaded Successfully!!',
          type : 'success',
          duration : 5000,
          speed : 2000
        })
        }).finally(()=>{
          this.loading = false;
        })
      }
    },
  },
};
</script>

<style>
.loading_class {
  height: 35px;
}
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