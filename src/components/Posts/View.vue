<template>
  <div class="items-center text-center py-20">
    <div
      v-if="post.length < 1"
    >
      <Loading />
    </div>
    <div v-else>
      <p class="my-8 semibold text-2xl">{{post.title}}</p>
      <img :src="post.image_url" class="w-2/5 mx-auto" />
      <div class="mx-auto w-3/5 text-center p-4 mt-4">
        <p>{{post.body}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '../UI/Loading.vue'
export default {
  name: 'Info',
  components: {
    Loading
  },
  data () {
    return {
     postId: null,
     post: []
    }
  },
  created () {
    this.postId = this.$store.state.postId
    this.$http.plain.get(`/posts/${this.postId}`)
      .then(response => { this.post = response.data })
      .catch(error => this.setError(error, 'Something went wrong'))
  },
  methods: {
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
    routeTo(){
      window.location = "/posts/edit";
    },
    isSignedIn () {
      return this.$store.state.signedIn
    }
  }
}
</script>

<style scoped>
</style>
