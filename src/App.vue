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
    console.log('local', localStorage.signin)
    this.checkSignedIn()
  },
  methods: {
    checkSignedIn () {
      if (localStorage.signedIn) {
        console.log("signed in");
      }
    }
  }
}
</script>
