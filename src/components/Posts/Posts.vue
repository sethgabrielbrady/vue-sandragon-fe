<template>
  <div class="max-w-md m-auto py-10">

    <hr class="border border-grey-light my-6" />

    <ul class="list-reset mt-4">
      <li class="py-4" v-for="post in posts" :key="post.id" :post="post">
        <p> ID: {{ post.id }}</p>

        <div class="flex items-center justify-between flex-wrap">
          <p class="block flex-1 font-mono font-semibold flex items-center ">
            <img :src="post.image_url" class="mx-1 border" width="20px" height="20px" />
            {{ post.title }}
          </p>

          <button class="bg-transprent text-sm hover:bg-red text-red hover:text-white no-underline font-bold py-2 px-4 rounded border border-red"
         @click.prevent="removepost(post)">Delete</button>
        </div>

        <!-- <div v-if="post == editedpost">
          <form action="" @submit.prevent="updatepost(post)">
            <div class="mb-6 p-4 bg-white rounded border border-grey-light mt-4">
              <input class="input" v-model="post.title" />
              <input type="submit" value="Update" class=" my-2 bg-transparent text-sm hover:bg-blue hover:text-white text-blue border border-blue no-underline font-bold py-2 px-4 rounded cursor-pointer">
            </div>
          </form>
        </div> -->
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
    if (!localStorage.signedIn) {
      this.$router.replace('/')
    } else {
      this.$http.secured.get('/posts')
        .then(response => { this.posts = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))
    }
  },
  methods: {
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