<template>
  <div class="items-center text-center py-20">
    <button
      v-if="isAdmin()"
      class="bg-transprent text-sm hover:bg-blue-400 text-blue hover:text-white no-underline font-bold py-2 px-4 rounded border border-blue-500 "
      @click="routeTo"
      >
        Edit
    </button>
    <div
      v-if="material.length < 1"
    >
      <Loading />
    </div>
    <div v-else>
      <p class="my-8 semibold text-2xl">{{material.title}}</p>
      <img :src="material.image_url" class="w-2/5 mx-auto" />
      <div class="mx-auto w-3/5 text-center p-4 mt-4">
        <p>{{material.description}}</p>
      </div>
      <button
        v-if="isSignedIn()"
        class=" bg-orange download-btn text-sm no-underline font-bold py-2 px-4 rounded shadow text-white"
        @click="addMaterial"
        >
          Download
      </button>
    </div>
  </div>
</template>

<script>
import Loading from '../UI/Loading.vue'
export default {
  name: 'Info',
  components: {
    Loading
  },
  data () {
    return {
     materialId: null,
     material: []
    }
  },
  created () {
    this.materialId = this.$store.state.materialId
    this.$http.plain.get(`/materials/${this.materialId}`)
      .then(response => { this.material = response.data })
      .catch(error => this.setError(error, 'Something went wrong'))
  },
  methods: {
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
    routeTo(){
      window.location = "/materials/editor";
    },
    isSignedIn () {
      return this.$store.state.signedIn
    }
  }
}
</script>

<style scoped>
</style>
