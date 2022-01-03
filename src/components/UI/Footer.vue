<template>
  <div class="relative">
    <footer class="py-3 flex flex-col md:flex-row justify-around md:justify-between text-center" style="z-index: 3; width: 100%; bottom: 0px;">
      <div class="flex flex-col">
        <img src="../../assets/sandragon_blue.png" class="m-auto" style="width: 70px;">
        <p class="text-white my-2 m-auto sd-font-light-blue">
          PRIVACY | TERMS OF SERVICE
        </p>
      </div>
      <div class="flex flex-col">
        <div class="flex flex-row justify-center my-2 mt-4 sd-font-light-blue">
          <a href="https://twitter.com/sandragongame" target="_blank">
            <img src="https://www.sandragon.io/static/media/twitter.6d0df318.png" alt="Twitter" class=" sd-font-light-blue h-7 w-7 sd-font-orange mx-1">
          </a>
          <a href="https://discord.gg/8U6VYbdgPf" target="_blank">
            <img src="https://www.sandragon.io/static/media/discord.25c69c3e.png" alt="Discord" class="h-7 w-7 sd-font-orange mx-1">
          </a>
          <a href="https://www.reddit.com/r/Sandragongame/" target="_blank">
            <img src="https://www.sandragon.io/static/media/reddit.f67ee02a.png" alt="Reddit" class="h-7 w-7 sd-font-orange mx-1">
          </a>
          <a href="https://www.facebook.com/sandragongame/" target="_blank">
            <img src="https://image.similarpng.com/very-thumbnail/2020/04/Popular-Logo-facebook-icon-png.png" alt="Facebook" class="h-7 w-7 sd-font-orange mx-1">
          </a>
          <a href="https://www.instagram.com/sandragongame/" target="_blank">
            <img src="https://www.sandragon.io/static/media/instagram.e8a1de67.png" alt="Instagram" class="h-7 w-7 sd-font-orange mx-1">
          </a>
        </div>
        <p class="text-white my-3 sd-font-light-blue">Follow @sandragongame on social media.</p>
      </div>
      <div class="flex flex-col">

        <div class="mx-auto w-4/5 md:w-full text-center my-2 rounded bg-white">
          <form class="flex flex-row w-full rounded">
            <!-- <input type="email" v-model="email" class="input border left-rounded p-1 w-full" id="email" placeholder="Email"> -->
            <input type="email" class="input border rounded p-1 w-full bg-sd-dark-blue" id="email" placeholder="Email">
            <button class="bg-sd-light-blue text-white py-1 px-4 rounded" style="width: 200px;">Get Updates</button>
          </form>
        </div>
        <p class=" sd-font-orange my-2 inline-block ">
          <router-link to="/content" class="px-1 no-underline inline-block">
            CONTENT |
          </router-link>
          <!-- <router-link to="/about" class="px-1 no-underline inline-block">
            ABOUT |
          </router-link> -->
          <a class=" no-underline inline-block cursor-pointer" @click="toggleContact">
            CONTACT
          </a>
        </p>
      </div>
    </footer>
    <div
      v-if="toggle"
      class="w-full dim-background"
      style="z-index: 5 height: 100vh; cursor: none;"
    >
      <div
        class="fixed rounded w-4/5 md:w-2/3 m-auto my-8 shadow"
        style="z-index: 4; background: white; transform: translate(calc(16vw), calc(25vh - 10%)); min-height:auto; top:0px;"
        v-on-clickaway="toggleContact"
      >
        <Contact />
      </div>
    </div>
  </div>
</template>

<script>
import {directive as onClickaway} from "vue-clickaway"
import Contact from './../Contact.vue'

export default {
  name: 'Footer',
  components: {
    Contact
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
    toggleContact () {
      this.toggle = !this.toggle;
    }
  }
}
</script>

<style scoped>
  .dim-background {
     background-color:rgba(0,0,0,0.5) !important;
  }
</style>
