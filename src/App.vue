<template>
  <div
    id="app"
    class="dark-blue-bg"
  >
    <div
      class="fixed rounded max-w-sm m-auto my-8 shadow"
      style="z-index: 4; background: white; transform: translate(calc(25vw + 50%), calc(25vh - 10%)); width:30%; min-height:auto;"
      v-if="toggle"
      v-on-clickaway="toggleModal"
    >
      <Signin class="relative" style="z-index: 200 !important;" />
    </div>
    <Header @toggleSignin="toggleModal"/>
    <div @toggleSignin="toggleModal" >
      <router-view
        class="pt-20 router-view"
        style="min-height:calc(100vh + 30px);"
      >
      </router-view>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from './components/UI/Header.vue'
import Footer from './components/UI/Footer.vue'
import Signin from './components/Signin.vue'
import {directive as onClickaway} from "vue-clickaway"

export default {
  name: 'App',
  components: {
    Header,
    Signin,
    Footer
  },
  directives: {
    onClickaway: onClickaway
  },
  data() {
    return {
      toggle: false
    }
  },
  methods: {
    toggleModal () {
      this.toggle = !this.toggle;
    },
    isSignedIn () {
      return this.$store.state.signedIn
    }
  }
}
</script>
<style>
  .dark-blue-bg {
    background-color:rgba(015,016,047,1) !important;
  }
  .dimbackground {
     background-color:rgba(0,0,0,0.50);
     pointer-events: none;
     scroll-behavior: none;
     opacity: .25;
     overflow: hidden !important;
  }
</style>
