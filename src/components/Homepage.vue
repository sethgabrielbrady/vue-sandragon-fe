<template>
  <div class="homepage-img flex flex-col justify-around">
    <div class="text-center text-5xl text-white homepage-bold">
      A new system that will bring
      <br>remote players to the same
      <br>virtual table top.
    </div>

    <!-- <div class="list-reset mt-4">
      <p class="py-4">
        {{ post.body }}
      </p>
    </div> -->
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
    background-image: url('https://www.sandragon.io/static/media/ADJ_AdobeStock_173514908.4a616bdb.jpg');
    background-size: cover;
    height: calc(100vh - 30px);
  }
  .homepage-bold {
    font-weight: 600;
    line-height: normal;
  }
</style>
