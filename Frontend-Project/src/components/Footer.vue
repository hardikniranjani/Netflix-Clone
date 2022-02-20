<template>
 <div class="footer_main">

    <p class="footer_main" style="margin-left: 30px">
      Questions? Call 000-800-040-1843
    </p>
    <div class="footer-cols">
      <ul>
        <li><a href="#">FAQ</a></li>
        <li><a href="#">Investor Relations</a></li>
        <li><a href="#">Privacy</a></li>
        <li><a href="#">Speed Test</a></li>
      </ul>
      <ul>
        <li><a href="#">Help Centre</a></li>
        <li><a href="#">Jobs</a></li>
        <li><a href="#">Cookie Preferences</a></li>
        <li><a href="#">Watch for Free</a></li>
      </ul>
      <ul>
        <li><a href="#">Account</a></li>
        <li><a href="#">Ways to Watch</a></li>
        <li><a href="#">Corporate Information</a></li>
        <li><a href="#">Legal Notices</a></li>
      </ul>
      <ul>
        <li><a href="#">Media Centre</a></li>
        <li><a href="#">Terms of Use</a></li>
        <li><a href="#">Contact Us</a></li>
        <li><a href="#">Netflix Originals</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style>
.card-2{
    position: relative;
    display: inline-grid;
    grid-template-columns: 50% 40%;
    text-align: left;
    align-items: center;
    padding: 25px 45px 50px;
}

.footer_main{
    max-width: 70%;
    margin: 1rem auto;
    overflow: auto;
}

.footer_main ,
.footer_main a{
    color: #999999;
    font-size: 0.9rem;
}

.footer_main p{
    margin-bottom: 1.5rem;
}

.footer_main .footer-cols{
    display: grid;
    grid-template-columns: repeat(4 , 1fr);
    grid-gap: 2rem;
}

.footer_main li{
    line-height: 2.4;
}
.footer-cols > ul > li> a{
  text-decoration: none;
}
.footer-cols > ul > li> a:hover{
  text-decoration: underline;

}

@media screen and (max-width: 788px) {
  /* .footer_main{
    max-width: 100%;
    margin: 0rem auto;
  } */
  .footer_main {
    max-width: 100%;
  
    margin: 0rem 2rem;
    overflow: auto;
  }
  .footer_main,
  .footer_main a {
    color: #999999;
    font-size: 0.7rem;
  }

  .footer_main p {
    margin-bottom: 1.5rem;
  }

  .footer_main .footer-cols {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
  }

  .footer_main li {
    line-height: 1.4;
  }
}
@media screen and (min-width: 766px) {
.footer_main .footer-cols {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
  }
}
@media screen and (min-device-width: 988px)  {
  .footer_main .footer-cols {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
  }
}
@media only screen and (min-width: 1200px) {
  .footer_main .footer-cols {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1rem;
  }
}
</style>