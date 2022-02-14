<template>
  <div class="main_class">
    <div class="nav"><NavBar /></div>
    <div class="main_classbody">
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="footer"><Footer /></div>
  </div>
</template>

<script>
import NavBar from "./NavBar2.vue";
import Footer from "./Footer.vue";

export default {
  name: "UserLoading",
  components: {
    NavBar,
    Footer,
  },
};
</script>

<style>
.main_class {
  width: 100%;
  height: 100vh;
}
.nav {
  margin-top: 0px;
}
.main_classbody {
  margin-top: 200px;
  left:0;
  right:0;
  text-align: center;
  align-items: center;
}
.footer {
  margin-top: 270px;
}

.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>