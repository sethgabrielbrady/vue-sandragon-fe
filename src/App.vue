<template>
  <div id="app">
    <Header/>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  },
  created() {
    this.checkSignedIn()
  },
  methods: {
    checkSignedIn () {
      if (this.$store.state.signedIn) {
       console.log(" store state signed in");
      }
    }
  }
}
</script>
