<template>
  <div class="relative">
    <img src="https://www.sandragon.io/static/media/ADJ_AdobeStock_173514908.4a616bdb.jpg" class="homepage-img" />
    <div class="flex flex-col justify-between relative" style="z-index:2; height: 1000px;">
      <div class="text-center text-5xl text-white homepage-bold py-6 mt-6 ">
        A new system that will bring
        <br>remote players to the same
        <br>virtual table top.
      </div>
      <div class="text-center text-5xl text-white homepage-bold py-6">
        A new system that will bring
        <br>remote players to the same
        <br>virtual table top.
      </div>
      <div class="text-center text-5xl text-white homepage-bold py-6">
        A new system that will bring
        <br>remote players to the same
        <br>virtual table top.
      </div>
      <div class="mx-auto  w-1/3 text-center p-4 fixed" style="transform:translate(calc(50vw - 16.5vw), 75vh">
        <form class="flex flex-row shadow" style="opacity: 0.85;">
          <input type="email" v-model="email" class="input border left-rounded p-1 w-full" id="email" placeholder="Email">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 right-rounded">Email</button>
        </form>
      </div>
      <!-- <div class="list-reset mt-4">
        <p class="py-4">
          {{ post.body }}
        </p>
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
    console.log(this.$store.state.csrf)

    this.$http.plain.get('/posts/3')
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

<style scoped>
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
