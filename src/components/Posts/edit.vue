<template>
  <div class="p-4 ">
    <h1 class="text-center p-4">Post Edit View</h1>
    <div class="w-full max-w-5xl mx-auto">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2 p-2" for="title">Title</label>
        <input class="max-w-xs shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="post-title" type="text" placeholder="Title">

        <label class="block text-gray-700 text-sm font-bold mb-2 p-2" for="body">Body</label>
        <textarea class="max-w-2xl resize resize-y shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40" id="post-body" row="10" type="text-area" placeholder="Body">
          </textarea>
        <label class="block text-gray-700 text-sm font-bold mb-2 p-2" for="username">Author</label>
        <input class="max-w-xs shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="post-author" type="text" placeholder="Author">

        <label class="block text-gray-700 text-sm font-bold mb-2 p-2" for="image">Post Image</label>
        <input class="mb-4" type="file" name="image" ref="inputFile" @change=uploadFile()>
        <br>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click=createItem>Upload</button>
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
      postId: 1,
      title: "New Test",
      body: "Body test",
      author: " Author test"

    }
  },
  methods: {
    uploadFile: function() {
      this.inputPicture = this.$refs.inputFile.files[0];
    },
    createItem: function(event) {
      const params = {
        'image': this.inputPicture
      }

      let formData = new FormData()
      Object.entries(params).forEach(
        ([key, value]) => formData.append(key, value)
      )

      event.preventDefault
      if(this.inputPicture === true){
        this.$http.uploadFile.patch(`/posts/${this.postId}`, formData)
      }

      this.$http.plain.patch(`/posts/${this.postId}`, {
        post: {
          title: this.title,
          body: this.body,
          author: this.author,
        }
      })
    }
  }
}
</script>