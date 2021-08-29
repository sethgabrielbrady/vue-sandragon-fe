<template>
  <div class="p-4">
    <div class="mx-auto border w-1/5 text-center p-4">
      <form>
        <input class="mb-4" type="file" name="image" ref="inputFile" @change=uploadFile()>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click=createItem>Upload</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  //This should be changed to some sort of admin view
  name: 'Elements',
  // Here is the data we get from our HTML Form.
  data () {
    return {
      inputPicture: null
    }
  },
  methods: {
    // Saving the file in our data to send it !
    uploadFile: function() {
      this.inputPicture = this.$refs.inputFile.files[0];
    },

    // Collecting everything inside our FormData object
    createItem: function() {
      const params = {
        'image': this.inputPicture
      }

      let formData = new FormData()
      // formData.append('image', this.inputPicture)
      Object.entries(params).forEach(
        ([key, value]) => formData.append(key, value)
      )

      formData.forEach((value, key) => {
        console.log("key %s: value %s", key, value.name);
      })

      // Finally, sending the POST request with our beloved Axios
      this.$http.upload.put('/posts/1',
        formData
      )
    }
  }
}
</script>