<template>
  <label v-if="media_type == 'Banner'">
      <i class="bi bi-file-arrow-up-fill">
      <input class="file_upload" id="file-input" type="file" accept="image/*" />
    </i>
  </label>

  <label v-else-if="media_type == 'Video'">
    <i class="bi bi-cloud-upload-fill">
      <input class="file_upload" id="file-input" type="file" accept="video/*" />
    </i>
  </label>

    <label v-else-if="media_type == 'BackDrop'" >
     <i class="bi bi-upload">
      <input class="file_upload" id="file-input" type="file" accept="image/*" />
    </i>
  </label>
 
</template>

<script>
export default {
  name: "UploadMovie",
  props: {
    media_type: String,
  },
};
</script>

<style>
.file_upload {
  display: none;
}
</style>