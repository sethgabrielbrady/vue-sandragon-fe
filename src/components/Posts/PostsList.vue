<template>
  <div class="max-w-4xl m-auto py-10">
    <ul class="list-reset mt-4">
      <li class="py-4" v-for="post in posts" :key="post.id" :post="post">
        <div class="flex items-center justify-between flex-wrap">
          <img :src="post.image_url" class="mx-1 border" width="50%" height="auto" />
          <p class="block flex-1 font-mono font-semibold flex items-center ">
            {{ post.title }}<br>
            by: {{ post.author }}
          </p>
        </div>

        <!-- <div v-if="post == editedpost">
          <form action="" @submit.prevent="updatepost(post)">
            <div class="mb-6 p-4 bg-white rounded border border-grey-light mt-4">
              <input class="input" v-model="post.title" />
              <input type="submit" value="Update" class=" my-2 bg-transparent text-sm hover:bg-blue hover:text-white text-blue border border-blue no-underline font-bold py-2 px-4 rounded cursor-pointer">
            </div>
          </form>
        </div> -->
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
    }
    // addpost () {
    //   const value = this.newpost
    //   if (!value) {
    //     return
    //   }
    //   this.$http.secured.post('/api/v1/posts/', { post: { name: this.newpost.name } })

    //     .then(response => {
    //       this.posts.push(response.data)
    //       this.newpost = ''
    //     })
    //     .catch(error => this.setError(error, 'Cannot create post'))
    // },
    // removepost (post) {
    //   this.$http.secured.delete(`/api/v1/posts/${post.id}`)
    //     .then(response => {
    //       this.posts.splice(this.posts.indexOf(post), 1)
    //     })
    //     .catch(error => this.setError(error, 'Cannot delete post'))
    // },
    // editpost (post) {
    //   this.editedpost = post
    // },
    // updatepost (post) {
    //   this.editedpost = ''
    //   this.$http.secured.patch(`/api/v1/posts/${post.id}`, { post: { title: post.name } })
    //     .catch(error => this.setError(error, 'Cannot update post'))
    // }
  }
}
</script>
