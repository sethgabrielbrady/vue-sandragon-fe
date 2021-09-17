<template>
  <div class="max-w-md m-auto py-10">
    <h1>Materials</h1>
    <ul class="list-reset mt-4">
      <li class="py-4" v-for="material in materials" :key="material.id" :material="material">
        <p> ID: {{ material.id }}</p>

        <div class="flex items-center justify-between flex-wrap">
          <img :src="material.image_url" class="mx-1 border" width="200px" height="200px" />
          <p class="block flex-1 font-mono font-semibold flex items-center ">
          </p>
          <p>{{ material.title }}</p>
          <p>{{ material.description }}</p>

          <button class="bg-transprent text-sm hover:bg-red text-red hover:text-white no-underline font-bold py-2 px-4 rounded border border-red"
         @click.prevent="removepost(material)">Delete</button>
        </div>
      </li>
    </ul>
  </div>

</template>

<script>
export default {
  name: 'materials',
  data () {
    return {
      materials: [],
      error: ''
    }
  },
  created () {
    if (!this.$store.state.signedIn || this.$store.state.currentUser.role !== "admin") {
      this.$router.replace('/');
    }
    this.$http.secured.get('/materials')
      .then(response => { this.materials = response.data})
      .catch(error => this.setError(error, 'Something went wrong'))
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    }
  }
}
</script>
