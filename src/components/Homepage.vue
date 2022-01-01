<template>
  <div class="relative">
    <Fire  class="fixed" style="left:calc(25% + 8vw);top: 0%;"/>
    <!-- <img
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
      alt="" /> -->

    <div class="w-full m-auto absolute" style="top:20%;">
      <div class="text-center text-5xl text-white homepage-bold w-3/5 m-auto py-10">
        A new system that will bring
        <br>remote players to the same
        <br>virtual table top.
      </div>
      <div class="text-center text-3xl sd-font-light-blue homepage-bold w-3/5 m-auto py-10">
        Compatible with Dungeons & Dragons® 5e, GURPS® and
        the soon to come,  Sandragon.
      </div>
      <!-- <carousel :per-page="1" autoplay="true" class="m-auto">
        <slide class="flex flex-col justify-center ">
          <div class="text-center text-5xl text-white homepage-bold w-3/5 m-auto py-10">
            A new system that will bring
            <br>remote players to the same
            <br>virtual table top.
          </div>
        </slide>
        <slide class="flex flex-col justify-center">
          <div class="text-center text-2xl text-white homepage-bold w-3/5 m-auto">
            {{ $store.state.materialBlurb }}
          </div>
          <router-link :to="(`/content/${activeContentSlug}`)" class="flex justify-center" >
            <button class="bg-orange text-white font-bold py-2 px-4 rounded my-2">
              Content
            </button>
          </router-link>
        </slide>
        <slide class="flex flex-col justify-center ">
          <div class="text-center text-2xl text-white homepage-bold w-3/5 m-auto">
             {{ $store.state.postBlurb }}
          </div>
          <router-link :to="(`/posts/${activePostSlug}`)" class="flex justify-center" >
            <button class="bg-orange text-white font-bold py-2 px-4 rounded my-2">
              Read More >
            </button>
          </router-link>
        </slide>
        <slide class="flex flex-col justify-center ">
          <div class="text-center text-3xl text-white homepage-bold w-3/5 m-auto py-10">
            Compatible with Dungeons & Dragons® 5e, GURPS® and
            best of all, our very own Sandragon
          </div>
        </slide>
      </carousel> -->
      <br>
      <br>
    </div>
  </div>
</template>

<script>
// import { Carousel, Slide } from 'vue-carousel';
import Fire from './animations/Fire.vue'
export default {
  name: 'homepage',
  components: {
    Fire
    // Carousel,
    // Slide
  },
  data () {
    return {
      post: {},
      error: '',
      activeContentSlug: '',
      activePostSlug: ''
    }
  },
  created () {
    this.getActive('materials');
    this.getActive('posts')
    // alert(this.$store.state.materialBlurb)
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    getPostImage () {
      console.log("post image", this.post.image_url)
      return this.post.image_url;
    },
    async getActive(items){

      //make api call and checks for active
      let data = []
      await this.$http.secured.get('/'+items)
        .then(response => { data = response.data})
        .catch(error => this.setError(error, 'Something went wrong'))

      for (const item of data) {
        if (item.active === true ){
          if (items === "materials"){
            this.$store.commit('setActiveContentSlug', item.slug )
            this.activeContentSlug = item.slug
          }else if (items === "posts"){
            this.$store.commit('setActivePostSlug', item.slug )
            this.activePostSlug = item.slug
          }
        }
      }

    }
  }
}
</script>

<style scoped lang="scss">
  .homepage-img {
    /* background-image: url('https://www.sandragon.io/static/media/ADJ_AdobeStock_173514908.4a616bdb.jpg');
    background-size: cover; */
    height: auto;
    position: fixed;
    width: 100vw;
    filter: brightness(110%);
    top: 0px;
    background-color:rgba(015,016,047,1) !important;
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
    background-color:rgba(015,016,047,0.7) !important;
  }
</style>
