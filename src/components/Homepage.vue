<template>
  <div class="relative">
    <img src="../assets/ADJ_AdobeStock_173514908.4a616bdb_zbyalr_c_scale,w_1400.jpg" class="homepage-img" />
    <div class=" flex flex-column justify-center h-full m-auto">
      <!-- <img
        class="homepage-img h-screen"
        sizes="(max-width: 1400px) 100vw, 1400px"
        srcset="
        src/assets/ADJ_AdobeStock_173514908.4a616bdb_zbyalr_c_scale,w_200.jpg 200w,
        src/assets/ADJ_AdobeStock_173514908.4a616bdb_zbyalr_c_scale,w_507.jpg 507w,
        src/assets/ADJ_AdobeStock_173514908.4a616bdb_zbyalr_c_scale,w_722.jpg 722w,
        src/assets/ADJ_AdobeStock_173514908.4a616bdb_zbyalr_c_scale,w_899.jpg 899w,
        src/assets/ADJ_AdobeStock_173514908.4a616bdb_zbyalr_c_scale,w_1274.jpg 1274w,
        src/assets/ADJ_AdobeStock_173514908.4a616bdb_zbyalr_c_scale,w_1400.jpg 1400w"
        src="src/assets/ADJ_AdobeStock_173514908.4a616bdb_zbyalr_c_scale,w_1400.jpg"
        alt=""> -->

      <carousel :per-page="1" autoplay="true" class="w-3/5 m-auto py-6 mt-6">
        <slide class="flex flex-col justify-center">
          <div class="text-center text-5xl text-white homepage-bold">
            A new system that will bring
            <br>remote players to the same
            <br>virtual table top.
          </div>
        </slide>
        <slide>
          <div class="list-reset mt-4">
            <div class="text-center text-2xl text-white w-2/3 m-auto">
              <img :src="post.image_url" class="w-full roundedmd ">
              <p class="py-4">
                {{ post.body }}
              </p>
            </div>
          </div>
        </slide>
      </carousel>
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
    filter: brightness(80%);
    top: 0px;
  }
  .homepage-bold {
    font-weight: 600;
    line-height: normal;
  }
  .dimbackground {
     background-color:rgba(0,0,0,0.5);
  }
</style>
