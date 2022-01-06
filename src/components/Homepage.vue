<template>
  <div class="relative opaque-dark-blue">
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
      <div class="text-center text-3xl md:text-5xl text-white homepage-bold w-4/5 md:w-3/5 m-auto pt-0 pb-16 md:pt-10">
        A new system that will bring
        remote players to the same
        virtual table top.
      </div>
      <img src="../assets/dice.png" class="m-auto pb-16" style="width: 200px;">
      <div class="text-center sm:text-2xl md:text-1xl text-white homepage-bold w-4/5 md:w-3/5 m-auto pb-10">
          Compatible with Dungeons & Dragons® 5e, GURPS® and the soon to be released <span class="sd-font-orange">Sandragon System</span>
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

export default {
  name: 'homepage',
  components: {
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
    background-image: url('../assets/bg_1400.jpg');
    background-size: cover;
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
    background-color:rgba(015,016,047,0.7) !important;
  }
</style>
