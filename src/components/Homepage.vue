<template>
  <div class="relative">
    <img src="../assets/ADJ_AdobeStock_173514908.4a616bdb_zbyalr_c_scale,w_1400.jpg" class="homepage-img" />
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
    <div class="flex flex-col justify-between relative" style="z-index:2;">
      <div class="text-center text-5xl text-white homepage-bold py-6 mt-6 w-3/5 m-auto rounded-md shadow" style="transform:translateY(50%) !important;">
        A new system that will bring
        <br>remote players to the same
        <br>virtual table top.
      </div>
      <!-- <div class="text-center text-5xl text-white homepage-bold py-6">
        A new system that will bring
        <br>remote players to the same
        <br>virtual table top.
      </div>
      <div class="text-center text-5xl text-white homepage-bold py-6">
        A new system that will bring
        <br>remote players to the same
        <br>virtual table top.
      </div> -->

      <div class="mx-auto w-1/3 text-center p-4 fixed" style="transform:translate(calc(50vw - 16.5vw), 75vh">
        <form class="flex flex-row shadow" style="opacity: 0.85;">
          <input type="email" v-model="email" class="input border left-rounded p-1 w-full" id="email" placeholder="Email">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 right-rounded">Email</button>
        </form>
      </div>
      <!-- <div class="list-reset mt-4">
        <div class="text-center text-1xl text-white homepage-bold py-6 mt-6 w-3/5 m-auto rounded-md shadow" style="transform:translateY(50%) !important;">
          <p class="py-4">
            {{ post.body }}
          </p>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'homepage',
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
    filter: brightness(50%);
  }
  .homepage-bold {
    font-weight: 600;
    line-height: normal;
  }
</style>
