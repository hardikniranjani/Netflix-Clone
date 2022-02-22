<template>
  <span class="d-flex">
    <h3 class="Home_List_Title">{{ name }}</h3>
    <span class="explore_more">
      <span class="explore_more_before"
        ><span class="explore_more_after">Explore..</span
        ><i class="bi bi-chevron-right explore_icon_1"></i
      ></span>
    </span>
  </span>
</template>

<script>
export default {
  name: "Explore",
  props: {
    name: String,
    id: String,
  },
};
</script>

<style>
.explore_more {
  margin-top: 10px;
  transition: transition 400ms !important;
}
.explore_icon_1,
.explore_icon_2 {
  font-size: 0.8rem;
}
.explore_icon_1 {
  font-weight: 800px;
}
.explore_more_before {
  margin-left: 5px;
  margin-top: 3px;
  display: flex;
  transition: transition 400ms !important;
}

.explore_more_before:hover .explore_more_after {
  display: block;
  
  cursor: pointer;
}
.explore_more_after {
  margin-top: -3px;
  display: none;
  font-weight: 800px !important;
}
</style>