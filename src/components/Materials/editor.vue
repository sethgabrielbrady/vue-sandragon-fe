<template>
  <div class="items-center text-center relative">
    <div :class="{dimbackground: showModal}" class="bg-purple-100 py-20">
      <button class="bg-red-500 text-white font-bold py-2 px-4 rounded" @click="deleteItemCheck">Delete</button>
      <div class="mx-auto w-4/5 text-center p-4 ">
        <p class="bg-blue-200 rounded w-2/5 mx-auto py-2 text-blue-500 mb-12" style="font-size:2rem;">Material Editor</p>
        <form class="bg-white px-8 pt-6 pb-8 mb-4 shadow rounded">
          <img :src="material.image_url" class="w-3/5 mx-auto mt-12 "/>
          <label class="block text-gray-700 text-sm font-bold mb-2 p-2" for="image">Preview Image</label>
          <input class="mb-4" type="file" name="image" ref="inputFile" @change=uploadFile()>

          <div class="mb-6">
            <label for="title" class="label">Title</label><br>
            <input type="title" v-model="title" class="input border rounded p-2 w-full" id="title" ref="title" :placeholder="material.title">
          </div>

          <div class="mb-6">
            <label for="description" class="label">Description</label><br>
            <textarea type="textarea" v-model="description" class="input border rounded p-2 w-full" id="body" :placeholder="material.description" />
          </div>

          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="createItem">Update</button>
        </form>
      </div>
    </div>
    <div v-if="showModal" class="bg-white rounded w-2/5 mx-auto shadow p-10 absolute" style="left:30%; top:calc(0px + 20vh);">
      <p class="my-10">Are you sure you want to delete this?</p>
      <div class="flex flex-row justify-between">
        <button class="bg-blue-500 text-white font-bold py-2 px-4 rounded inline-block" @click="toggleDelete">Nope!</button>
        <button class="bg-red-500 text-white font-bold py-2 px-4 rounded inline-block" @click="deleteItem">Yep!</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Editor',
  data () {
    return {
      inputPicture: null,
      materialId: null,
      title: "",
      description: "",
      material: [],
      showModal: false
    }
  },
  created () {
    if (!this.$store.getters.isAdmin){
      this.$router.replace('/')
    }else {
      this.materialId = this.$store.state.materialId
      this.$http.plain.get(`/materials/${this.materialId}`)
        .then(response => { this.material = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))

      this.title = this.material.title
      this.description = this.material.description
    }
  },
  methods: {
    uploadFile: function() {
      this.inputPicture = this.$refs.inputFile.files[0];
    },
    deleteItemCheck () {
      this.toggleDelete();
    },
    deleteItem () {
      this.$http.plain.delete(`/materials/${this.materialId}`)
      this.$store.state.materialId = null
      window.location = "/materials";
    },
    toggleDelete () {
      this.showModal = !this.showModal;
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

      window.location = "/materials/edit";
    }
  }
}
</script>
