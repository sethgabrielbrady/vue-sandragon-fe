<template>
  <div class="p-4 ">
    <h1 class="text-center p-4">Post Edit View for {{postId}}</h1>
    <div class="w-full max-w-5xl mx-auto">
      <button class="bg-green-500 text-white font-bold py-2 px-4 rounded" v-if="postId"  @click="setPostActive">Set Active</button>
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-6">
          <label for="title" class="label" />
          <input type="title" v-model="title" class="input border rounded p-2 w-full post-form" id="title" :placeholder="post.title">
        </div>
        <div class="mb-6">
          <label for="author" class="label" />
          <input type="author" v-model="author" class="input border rounded p-2 w-full post-form" id="author" :placeholder="post.author">
        </div>
        <div class="mb-6">
          <label for="body" class="label" />
          <textarea type="textarea" v-model="body" class="input border rounded p-2 w-full post-form" id="body" :placeholder="post.body" />
        </div>

        <div class="mb-6">
          <label for="blurb" class="label" />
          <input type="text" v-model="blurb" class="input border rounded p-2 w-full post-form" id="blurb" :placeholder="post.blurb" />
        </div>

        <div class="mb-6">
          <label for="slug" class="slug" />
          <input type="slug" v-model="slug" class="input border rounded p-2 w-full post-form" id="slug" :placeholder="post.slug">
        </div>

        <label class="block text-gray-700 text-sm font-bold mb-2 p-2" for="image">Post Image</label>
        <input class="mb-4" type="file" name="image" ref="inputFile" @change=uploadFile()>
        <br>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click=createItem()>Upload</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Edit',
  data () {
    return {
      inputPicture: null,
      postId: null,
      title: "",
      body: "",
      author: "",
      blurb: "",
      post: [],
      slug: ""
    }
  },
  created() {
   if (this.$store.state.currentUser.role !== "admin"){
      this.$router.replace('/');
    }else if(this.$store.state.postId){
      this.postId = this.$store.state.postId

      this.$http.plain.get(`/posts/${this.postId}`)
        .then(response => { this.post = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))

      this.title = this.post.title
      this.body = this.post.body
      this.blurb = this.post.blurb
      this.author = this.post.author
      this.slug = this.post.slug
    }else {
      return
    }

  },
  methods: {
    uploadFile () {
      this.inputPicture = this.$refs.inputFile.files[0];
    },
    createItem: function() {
      const params = {
        'image': this.inputPicture
      }

      let formData = new FormData()
      Object.entries(params).forEach(
        ([key, value]) => formData.append(key, value)
      )

      if(this.inputPicture){
        this.$http.uploadFile.patch(`/posts/${this.postId}`, formData)
      }

      this.$http.plain.patch(`/posts/${this.postId}`, {
        post: {
          title: this.title,
          body: this.body,
          author: this.author,
          blurb: this.blurb,
          slug: this.slug,
        }
      })
    },
    setPostActive () {
      let activeSlug = this.post.slug;
      let postBlurb = this.post.blurb;

      this.$store.commit('setPostBlurb', postBlurb )

      if(this.post.active === false)
        this.$http.plain.patch(`/posts/${this.postId}`, {
          post: { active: true }
      })

      this.$store.commit('setActivePostSlug', activeSlug )
      if(this.$store.state.activePostSlug === activeSlug ){
        alert ("This post is now set to active");
        alert (activeSlug);
      }
    }
  }
}
</script>