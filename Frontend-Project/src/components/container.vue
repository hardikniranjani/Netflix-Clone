<template>
  <div class="mainContainer"> 
      <div class="upper">
          <h3 class="display-7 text-center pt-3 mb-4 ">{{Name}}</h3>
      </div>
      <div class="mainContainer_body d-inline-flex">
          <p>Monthly Price: <span class="mainContainer_body_txt"><i class="fa fa-rupee ms-1"></i>{{Price}} </span></p>
          <p>Max Quality:  <span class="mainContainer_body_txt ms-1">{{Quality}} </span></p>
          <p>Devices:  <span class="mainContainer_body_txt ms-1"> <span
              v-for="(i, index) in device"
              :key="i"
              
              >{{ i }}
              <span v-if="index + 1 != device.length">,</span>
            </span> </span></p>
      </div>
      <div class="mainContainer_lower mt-4">
          <button class="btn btn-outline-primary" @click="redirect"> Purchase</button>
      </div>
  </div>

</template>

<script>
export default {
    name:"container",
    props:{
        Name: String,
        Price:Number,
        Screen:Number,
        Quality:String,
        id:Number,
        device:[]
    },

    methods: {
        redirect(){
            this.$router.push({ name: "Subscription",params:{id:this.id } });
        } 
    }

}
</script>

<style>

.mainContainer{
    font-family: "Netflix Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
    margin-right: 80px !important;
    margin-bottom: 80px !important;
    width:280px;
    height:300px;
    box-shadow: 0px 2px 4px 4px #fafafa;
    border:none;
    border-radius:20px;
    color: lightgrey;
}

.mainContainer_body{
    padding-left:10px;
    flex-direction: column;
}
.mainContainer_body > p{
    font-weight: bold;
}

.mainContainer_body_txt{
    font-weight:lighter;
    color:rgb(216, 31, 38);
}

.mainContainer_lower{
    align-items: center;
    text-align: center;
}

</style>