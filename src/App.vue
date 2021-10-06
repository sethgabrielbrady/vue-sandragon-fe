<template>
  <div id="app">
    <div
      class="fixed rounded max-w-sm m-auto my-8 shadow"
      style="z-index: 4; background: white; transform: translate(calc(25vw + 50%), calc(25vh - 10%)); width:30%; height:auto;"
      v-if="toggle"
      v-on-clickaway="toggleModal"
    >
      <Signin/>
    </div>
    <Header @toggleSignin="toggleModal"/>
    <div @toggleSignin="toggleModal" >
      <router-view
        class="py-12 router-view"
      >
      </router-view>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Signin from './components/Signin.vue'
import {directive as onClickaway} from "vue-clickaway"

export default {
  name: 'App',
  components: {
    Header,
    Signin
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
    }
  }
}
</script>
<style scoped>
  .dimbackground {
     filter: brightness(50%);
  }
</style>
