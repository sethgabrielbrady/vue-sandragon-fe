<template>
  <div class="relative">
    <footer>
      <div class="py-3 w-full md:w-3/5 mx-auto flex flex-col flex-col-reverse md:flex-row justify-around">

        <div class="flex flex-col">
          <div class="flex flex-col justify-center text-center md:text-left">
            <p class="text-white mb-2 inline-block text-xs">
              <router-link to="/content" class=" pb-1 no-underline block">
                CONTENT
              </router-link>
              <!-- <router-link to="/about" class=" py-1 no-underline block">
                ABOUT |
              </router-link> -->
              <a class=" no-underline inline-block py-1 cursor-pointer" @click="toggleContact">
                CONTACT
              </a>
              <router-link to="/privacy" class="py-1 no-underline block">
                PRIVACY
              </router-link>
              <router-link to="/terms" class="py-1 no-underline block">
                TERMS OF SERVICE
              </router-link>
            </p>
          </div>

          <div class="flex flex-row justify-center md:justify-start mb-0 mt-4 sd-font-light-blue">
            <a href="https://twitter.com/sandragongame" target="_blank">
              <img src="https://www.sandragon.io/static/media/twitter.6d0df318.png" alt="Twitter" class=" sd-font-light-blue h-7 w-7 sd-font-orange mr-1">
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
          <p class="text-white mt-3 my-0 text-sm text-center md:text-left ">See what strange delights await...</p>
        </div>

        <div class="flex flex-row justify-around md:justify-between pb-3 md:pb-0">
          <div class="flex flex-col justify-between">
            <div class="mx-auto w-full text-center md:text-right mb-2 rounded ">
            <p class="sd-font-orange mb-2 inline-block">Adventure calls!</p>
            <form class="flex flex-row w-full rounded">
              <input type="email" class="input border rounded p-1 w-full bg-white" style="border-radius:5px 0px 0px 5px;" id="email" placeholder="Email">
              <button class="bg-sd-light-blue text-white py-1 px-4 " style="width: 200px; border-radius:0px 5px 5px 0px;">Join</button>
            </form>
            </div>
            <div class="flex flex-col">
              <img src="../../assets/sandragon_blue.png" class="m-auto pt-4 " style="width: 90px;">
            </div>
          </div>

        </div>
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
