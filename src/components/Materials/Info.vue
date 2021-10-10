<template>
  <div class="items-center text-center py-20">
    <button
      v-if="isAdmin"
      class="bg-transprent text-sm hover:bg-blue-400 text-blue hover:text-white no-underline font-bold py-2 px-4 rounded border border-blue-500"
      @click="routeTo"
      >
        Edit
    </button>
    <p class="my-8">{{material.title}}</p>
    <img :src="material.image_url" class="w-2/5 mx-auto" />
    <div class="mx-auto w-4/5 text-center p-4 mt-4">
      <p>{{material.description}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Info',
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

    console.log("material", this.material.image_url)
  },
  methods: {
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
    routeTo(){
      window.location = "/materials/editor";
    }
  }
}
</script>
