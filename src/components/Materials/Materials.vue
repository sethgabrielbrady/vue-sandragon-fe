<template>
  <div class="max-w-4xl m-auto py-10 text-center">
    <h1 class="mt-4">Materials</h1>
    <button
      v-if="isAdmin()"
      class="bg-transprent text-sm hover:bg-blue-400 text-blue hover:text-white no-underline font-bold py-2 px-4 rounded border border-blue-500"
      @click="addMaterial"
      >
        Add Material
    </button>
    <ul class="list-reset mt-4 items-center grid gap-4 grid-cols-3">
      <li
        class="p-2 border-solid border-2 border-purple-400 rounded-lg shadow-lg bg-blue-50 mx-3 h-80 cursor-pointer"
        v-for="material in materials"
        :key="material.id"
        :material="material"
        @click="setMaterial(material.id)">
          <div class="flex items-center justify-between flex-col">
            <img :src="material.image_url" class="mx-1 border rounded-lg" width="200px" height="200px" />
            <div class="block font-mono text-center">
              <p class="font-semibold pt-3">{{ material.title }}</p>
            </div>
          </div>
        </li>
    </ul>
  </div>

</template>

<script>
export default {
  name: 'Materials',
  data () {
    return {
      materials: [],
      error: ''
    }
  },
  created () {
    this.$http.secured.get('/materials')
      .then(response => { this.materials = response.data})
      .catch(error => this.setError(error, 'Something went wrong'))
  },
  methods: {
    setMaterial(materialId) {
      this.$store.commit('setMaterialId', materialId)
      this.routeTo("/materials/info/");
    },
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
    addMaterial(){
      this.$store.commit('setMaterialId', null)
      this.routeTo("materials/editor");
    },
    routeTo(route){
      window.location = route;
    }
  }
}
</script>
