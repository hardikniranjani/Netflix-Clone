<template>
  <div class="smallCard">
    <p class="smallCard__name">{{ Name }}</p>
  </div>
</template>

<script>
export default {
  name: "genresCard",
  props: {
    Name: String,
  },
};
</script>

<style>
.smallCard {
  align-items: center;
  width: 150px;
  height: 50px;
  background-color: #292929;
  border-radius: 10px;
  transition: 200ms;
  cursor: pointer;
  color: rgb(238, 238, 238);
  border: none;
  text-decoration: none;
}

.smallCard:hover {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 700px;
  /* background-color: #c2c2c2e0; */
  background-color: #D81F26;
  /* color: #292929; */
  color: rgb(238, 238, 238);
  transform: scale(1.02);
  box-shadow: 0px 1px 4px 4px rgba(211, 211, 211, 0.699);
  border: none;
  text-decoration: none;
}

.smallCard__name {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 700px;
  text-align: center !important;
  align-items: center !important;
  padding-top: 10px !important;
}
</style>