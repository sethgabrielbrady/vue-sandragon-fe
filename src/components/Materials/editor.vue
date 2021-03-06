<template>
  <div class="items-center text-center relative">
    <div :class="{ dimbackground: showModal }" class="bg-purple-100 py-20">
      <button class="bg-green-500 text-white font-bold py-2 px-4 rounded" v-if="materialId"  @click="setActive">Make Active</button>
      <button class="bg-red-500 text-white font-bold py-2 px-4 rounded" v-if="materialId"  @click="deleteItemCheck">Delete</button>
      <div class="mx-auto w-4/5 text-center p-4 ">
        <p class="bg-blue-200 rounded w-2/5 mx-auto py-2 text-blue-500 mb-12" style="font-size:2rem;">Material Editor</p>
        <form class="bg-white px-8 pt-6 pb-8 mb-4 shadow rounded">
          <img :src="material.image_url" class="w-3/5 mx-auto mt-12 "/>
          <label class="block text-gray-700 text-sm font-bold mb-2 p-2" for="image">Upload Preview Image</label>
          <input class="mb-4" type="file" name="image" ref="inputPic" @change=uploadImage()>

          <div class="mb-6">
            <label for="title" class="label">Title</label><br>
            <input type="title" v-model="title" class="input border rounded p-2 w-full" id="title" ref="title" :placeholder="material.title" required>
          </div>

          <div class="mb-6">
            <label for="description" class="label">Description</label><br>
            <textarea type="textarea" v-model="description" class="input border rounded p-2 w-full" id="body" :placeholder="material.description" />
          </div>

          <div class="mb-6">
            <label for="blurb" class="label">Blurb</label><br>
            <textarea type="textarea" v-model="blurb" class="input border rounded p-2 w-full" id="body" :placeholder="material.blurb" />
          </div>

          <div class="mb-6">
            <label for="slug" class="label">Slug</label><br>
            <input type="title" v-model="slug" class="input border rounded p-2 w-full" id="body" :placeholder="material.slug" required />
          </div>

          <div class="border-blue-500 border-2 mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2 p-2" for="file">Upload PDF or Zip</label>
            <input class="mb-4" type="file" name="file" ref="inputPdf" @change=uploadPdf()>
            <p v-if="material.file_url" class="bg-green-200 rounded w-2/5 mx-auto py-2 text-green-500 mb-6" style="font-size:2rem;">File Uploaded</p>
            <p v-else class="bg-red-200 rounded w-2/5 mx-auto py-2 text-red-500 mb-6" style="font-size:2rem;">No File Uploaded</p>
          </div>

          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" v-if="(materialId === null)"  @click="createItem">Create</button>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" v-if="materialId" @click="createItem">Update</button>
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
      inputImage: null,
      inputFile: null,
      materialId: null,
      title: "",
      description: "",
      material: [],
      showModal: false,
      blurb: "",
      slug: "",
    }
  },
  created () {
    if (!this.$store.state.signedIn && this.$store.state.currentUser.role !== "admin") {
      this.$router.replace('/');
    }else if(this.$store.state.materialId){
      this.materialId = this.$store.state.materialId
      this.$http.plain.get(`/materials/${this.materialId}`)
        .then(response => { this.material = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))
      this.title = this.material.title
      this.description = this.material.description
      this.blurb = this.material.blurb
      this.slug = this.material.slug
    }else {
      return
    }

    // document.querySelector("#title").value = this.material.title;
  },
  methods: {
    uploadPdf () {
      this.inputFile = this.$refs.inputPdf.files[0];
    },
     uploadImage () {
      this.inputImage = this.$refs.inputPic.files[0];
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
      const imageparams = {
        'image': this.inputImage
      }

      const fileparams = {
        'file': this.inputFile
      }

      let formData = new FormData()
      Object.entries(imageparams).forEach(
        ([key, value]) => formData.append(key, value)
      )

      let fileData = new FormData()
      Object.entries(fileparams).forEach(
        ([key, value]) => fileData.append(key, value)
      )

      // FIX  - unable to upload a file and update text at the same time.
      if(this.materialId){
        if(this.inputImage){
          this.$http.uploadFile.patch(`/materials/${this.materialId}`,
          formData)
        }
        if(this.inputFile){
          this.$http.uploadFile.patch(`/materials/${this.materialId}`,
          fileData)
        }

        this.$http.plain.patch(`/materials/${this.materialId}`, {
          title: this.title,
          description: this.description,
          blurb: this.blurb,
          slug: this.slug
        })
      } else { //create content
        this.$http.plain.post("/materials/", {
          title: this.title,
          description: this.description,
          blurb: this.blurb,
          slug: this.slug,
        })
      }
    },
    setActive () {
      let activeSlug = this.material.slug;
      let materialBlurb = this.material.blurb;

      this.$store.commit('setMaterialBlurb', materialBlurb )

      //set this material to active
      //should create seperate modal that contains active material and post slugs
      if(this.material.active === false)
        this.$http.plain.patch(`/materials/${this.materialId}`, {
          material: { active: true }
      })

      this.$store.commit('setActiveContentSlug', activeSlug )
      if(this.$store.state.activeContentSlug === activeSlug ){
        alert (activeSlug);
        alert ("This material is now set to active");
      }
    }
  }
}
</script>
