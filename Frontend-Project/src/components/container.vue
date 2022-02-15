<template>
  <div class="mainContainer"> 
      <div class="upper">
          <h3 class="display-7 text-center mt-3">{{Name}}</h3>
      </div>
      <div class="mainContainer_body d-inline-flex">
          <p>Monthly Price: <span class="mainContainer_body_txt">{{Price}} </span></p>
          <p>Max Quality:  <span class="mainContainer_body_txt">{{Quality}} </span></p>
      </div>
      <div class="mainContainer_lower mt-4">
          <button class="btn btn-outline-primary" :onclick="redirect">More Details</button>
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
        id:Number
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
    width:250px;
    height:300px;
    border:1px solid white;
    border-radius:20px;
    color: lightgrey;
}

.mainContainer_body{
    margin-top:50px;
    margin-bottom:20px;
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