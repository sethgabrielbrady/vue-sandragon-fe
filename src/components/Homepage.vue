<template>
  <div class="relative">
    <img
      class="homepage-img"
      sizes="(max-width: 1400px) 100vw, 1400px"
      srcset="
        ../assets/bg_200.jpg 200w,
        ../assets/bg_507.jpg 507w,
        ../assets/bg_722.jpg 722w,
        ../assets/bg_899.jpg 899w,
        ../assets/bg_1274.jpg 1274w,
        ../assets/bg_1400.jpg 1400w"
      src="../assets/bg_1400.jpg"
      alt="" />
    <div class="flex flex-column justify-center h-full m-auto">
      <div class="w-3/5 m-auto mt-24">
        <carousel :per-page="1" autoplay="true">
          <slide class="flex flex-col justify-center shadow rounded opaque-dark-blue  ">
            <div class="text-center text-5xl text-white homepage-bold">
              A new system that will bring
              <br>remote players to the same
              <br>virtual table top.
              <br>
              <img src="../assets/sandragon_blue.png" class="m-auto" style="width: 80px; filter: brightness(140%);">
            </div>
          </slide>
          <slide class="shadow rounded text-center text-3xl text-white relative">
            <img :src="post.image_url" class="w-full rounded w-1/3 m-auto" style="filter: brightness(70%);">
            <p class="mx-10 absolute" style="top:30%;">
              {{ post.body }}
            </p>
          </slide>
        </carousel>
      </div>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';

export default {
  name: 'homepage',
  components: {
    Carousel,
    Slide
  },
  data () {
    return {
      post: {},
      error: ''
    }
  },
  created () {
    this.$http.plain.get('/posts/4')
      .then(response => { this.post = response.data})
      .catch(error => this.setError(error, 'Something went wrong'))
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    getPostImage () {
      console.log("post image", this.post.image_url)
      return this.post.image_url;
    }
  }
}
</script>

<style scoped style="sass">
  .homepage-img {
    /* background-image: url('https://www.sandragon.io/static/media/ADJ_AdobeStock_173514908.4a616bdb.jpg');
    background-size: cover; */
    height: auto;
    position: fixed;
    width: 100vw;
    filter: brightness(110%);
    top: 0px;
  }
  .homepage-bold {
    font-weight: 600;
    line-height: normal;
  }
  .dimbackground {
     background-color:rgba(0,0,0,0.5);
  }
  .dim-background {
     background-color:rgba(0,0,0,0.5) !important;
  }
  .opaque-dark-blue {
    /* #0F102F */
    background-color:rgba(015,016,047,0.85) !important;
  }
</style>
