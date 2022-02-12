<template>
  <div
    class="alert d-flex align-items-center text-center alert-action"
    :class="`alert-${typeAlert}`"
    role="alert"
  >
    <img :src="require(`../assets/${icon}-icon.svg`)" class="me-1"/>
    <div class="msg">{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "Alert",
  data() {},
  props: {
    message: {
      type: String,
      required: true,
    },
    typeAlert: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
  computed: {
    isDanger() {
      return this.typeAlert == "danger";
    },
  },
};
</script>

<style scoped>
.msg {
  text-align: center;
}
.alert-action {
  z-index: 4;
}
</style>
