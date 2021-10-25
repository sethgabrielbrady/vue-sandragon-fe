<template>
  <div class="p-4 ">
    <h1 class="text-center p-4">Post Edit View for {{this.postId}}</h1>
    <div class="w-full max-w-5xl mx-auto">
      <button class="bg-green-500 text-white font-bold py-2 px-4 rounded" v-if="postId"  @click="setPostActive">Set Active</button>
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-6">
          <label for="title" class="label" />
          <input type="title" v-model="title" class="input border rounded p-2 w-full" id="title" placeholder="Title">
        </div>
        <div class="mb-6">
          <label for="author" class="label" />
          <input type="author" v-model="author" class="input border rounded p-2 w-full" id="author" placeholder="Author">
        </div>
        <div class="mb-6">
          <label for="body" class="label" />
          <textarea type="textarea" v-model="body" class="input border rounded p-2 w-full" id="body" placeholder="Body" />
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
      author: ""
    }
  },
  created() {
    if(!this.$store.getters.isAdmin){
      this.$router.replace('/')
    }
    this.postId = this.getId()
  },
  methods: {
    uploadFile () {
      this.inputPicture = this.$refs.inputFile.files[0];
    },
    getId(){
      let url = window.location.href;
      return url.slice(-1)
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
        }
      })
    },
    setPostActive () {
      let activeId = this.postId;
      activeId = activeId.toString();
      this.$store.commit('setActivePostId', activeId )

      if(this.$store.state.activePostId === activeId ){
        alert ("This post is now set to active");
      }
    }
  }
}
</script>