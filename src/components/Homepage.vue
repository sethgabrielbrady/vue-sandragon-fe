<template>
    <div>
    <h1>Homepage</h1>
        <ul class="list-reset mt-4">
            <li class="py-4" v-for="material in materials" :key="material.id" :material="material">
                <p> ID: {{ material.title }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'homepage',
  data () {
    return {
      materials: [],
      error: ''
    }
  },
  created () {
    console.log(this.$store.state.csrf)

    this.$http.plain.get('/materials')
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
