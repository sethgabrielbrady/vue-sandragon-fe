<template>
  <div class="max-w-4xl m-auto py-10">
    <ul class="list-reset mt-4">
      <li class="py-4" v-for="post in posts" :key="post.id" :post="post">
        <div class="flex items-center justify-between flex-wrap">
          <img :src="post.image_url" class="mx-1 border" width="50%" height="auto" />
          <p class="block flex-1 font-mono font-semibold flex items-center ">
            {{ post.title }}<br>
            by: {{ post.author }}<br>
            id: {{ post.id }} <br>
            date: {{ getDate(post.updated_at) }}

          </p>
        </div>


        <div class="flex flex-row justify-between flex-end py-2">
          <router-link :to="`/posts/edit/${post.id}`" class="mx-2 block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block" v-if="signedIn()">
            Edit
          </router-link>
          <button
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded block"
            @click.prevent="removepost(post)">Delete
          </button>
        </div>
        <hr class="border border-grey-light my-6" />
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'posts',
  data () {
    return {
      posts: [],
      // newpost: [],
      error: ''
      // editedpost: ''
    }
  },
  created () {
    if (!this.$store.state.signedIn || this.$store.state.currentUser.role !== "admin") {
      this.$router.replace('/')
    } else {
      this.$http.secured.get('/posts')
        .then(response => { this.posts = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))
    }
  },
  methods: {
    signedIn () {
      return this.$store.state.signedIn
    },
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    getDate(d){
      const date = new Date(d).toLocaleDateString('en-gb',{month: 'long', year: 'numeric', day: 'numeric'})
      return date
    }
  }
}
</script>
