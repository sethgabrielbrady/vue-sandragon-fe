<template>
  <div class="max-w-4xl m-auto py-10 mb-24 text-center relative">
    <button
      v-if="isAdmin()"
      class="bg-transprent text-sm hover:bg-blue-400 text-blue hover:text-white no-underline font-bold py-2 px-4 rounded border border-blue-500"
      @click="addMaterial"
      >
        Add Material
    </button>
    <div
      v-if="materials.length < 1"
    >
      <Loading />
    </div>
    <ul
      v-else
      class="list-reset mt-4 masonry"
    >
      <li
        class="break-inside rounded-lg shadow-lg cursor-pointer relative"
        v-for="material in materials"
        :key="material.id"
        :material="material"
        @click="setMaterial(material.id)">
          <img :src="material.image_url" class="border rounded-lg mason-image" style="object-fit: contain;" />
          <div class="text-center absolute p-4 w-full" style="top: 10%; overflow:hidden;">
            <p class="font-semibold pt-3 text-center relative mason-title">{{ material.title }}</p>
            <p class="font-semibold pt-3 mason-text text-center relative" style="font-size: .75rem;">{{ teaser(material.description) }}...</p>
          </div>
        </li>
    </ul>
  </div>

</template>

<script>
import Loading from '../UI/Loading.vue'

export default {
  name: 'Materials',
  components: {
    Loading
  },
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
    },
    teaser(text) {
      console.log("teaser", text.slice(0,60))
      return text.slice(0, 60)
    }
  }
}
</script>
<style scoped>

.mason-title {
  color: white;
}

.mason-text {
  opacity: 0;
}

.break-inside:hover > .text-center > .mason-text {
  opacity: 1 !important;
  color: white;
}
.mason-image {
  filter: brightness(70%);
}
.break-inside:hover > .mason-image {
  filter: brightness(30%);
}

.loading {
  background-color: #0F102F;
  color: #ED7126;
}
</style>
