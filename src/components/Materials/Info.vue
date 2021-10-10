<template>
  <div class="items-center text-center py-20">
    <p class="my-8">{{material.title}}</p>
    <img :src="material.image_url" class="w-2/5 mx-auto " width="200px" height="200px"/>
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
    getImage(){
      return this.material.image_url
    }
  }
}
</script>
