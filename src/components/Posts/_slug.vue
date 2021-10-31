<template>
  <div class="items-center text-center py-20">
    <div
      v-for="post in posts"
      :key="post.id"
      :post="post">
      <div v-if="post.slug === slug">
        <p class="my-8 semibold text-2xl">{{post.title}}</p>
        <img :src="post.image_url" class="w-2/5 mx-auto" />
        <div class="mx-auto w-3/5 text-center p-4 mt-4">
          <p>{{post.body}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
     postId: null,
     post: [],
     posts: [],
     slug: ""
    }
  },
  async created () {
    await this.$http.secured.get("/posts")
      .then(response => { this.posts = response.data })
      .catch(error => this.setError(error, 'Something went wrong'))

    this.checkSlug();
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
    },
    checkSlug() {
      this.slug = window.location.href.slice(28);
      let match = false;
      this.posts.forEach(element =>{
        if (element.slug == this.slug ) {
          match = true;
          return;
        }
      });
      if(match === false){
        window.location = "/";
      }
    }
  }
}
</script>

<style scoped>
</style>
