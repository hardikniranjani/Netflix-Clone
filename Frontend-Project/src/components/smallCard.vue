<template>
  <div class="smallCard">
    <p class="smallCard__name">  {{ Name }} </p>
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
  background-color: #b3b3b3;
  border-radius: 20px;
  transition: 0.4s;
  cursor: pointer;
  color: rgb(82, 82, 82);
  border: none;
  text-decoration: none;
}

.smallCard:hover {
  background-color: #c2c2c2;
  transform: scale(1.02);
  box-shadow: 0px 2px 4px 3px lightgrey;
  border: none;
  text-decoration: none;
}

.smallCard__name{
    text-align: center;
    align-items: center;
}

</style>