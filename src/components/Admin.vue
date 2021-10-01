<template>
  <div class="items-center text-center p-4">
    <h1>Upload Page</h1>
    <h2>This will be an admin only view</h2>
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
  name: 'Upload',
  data () {
    return {
      inputPicture: null,
      materialId: 1,
      title: "Title Test 13",
      description: "Description test"
    }
  },
  created () {
    if(!this.$store.getters.isAdmin){
      this.$router.replace('/')
    }
  },
  methods: {
    uploadFile: function() {
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
        this.$http.uploadFile.patch(`/materials/${this.materialId}`, formData)
      }

      this.$http.plain.patch(`/materials/${this.materialId}`, {
        material: {
          title: this.title,
          description: this.description,
        }
      })
    }
  }
}
</script>
