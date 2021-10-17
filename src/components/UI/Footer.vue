<template>
  <div class="relative">
    <footer class="py-3 flex flex-col justify-center text-center" style="z-index: 3; width: 100%; bottom: 0px;">
      <div class="flex flex-row justify-center my-2 mt-4">
        <a href="https://twitter.com/sandragongame" target="_blank"><img src="https://www.sandragon.io/static/media/twitter.6d0df318.png" alt="Twitter" class="h-7 w-7 sd-font-orange"></a>
        <a href="https://discord.gg/8U6VYbdgPf" target="_blank"><img src="https://www.sandragon.io/static/media/discord.25c69c3e.png" alt="Discord" class="h-7 w-7 sd-font-orange"></a>
        <a href="https://www.reddit.com/r/Sandragongame/" target="_blank"><img src="https://www.sandragon.io/static/media/reddit.f67ee02a.png" alt="Reddit" class="h-7 w-7 sd-font-orange"></a>
        <a href="https://www.facebook.com/sandragongame/" target="_blank"><img src="https://image.similarpng.com/very-thumbnail/2020/04/Popular-Logo-facebook-icon-png.png" alt="Facebook" class="h-7 w-7 sd-font-orange"></a>
        <a href="https://www.instagram.com/sandragongame/" target="_blank"><img src="https://www.sandragon.io/static/media/instagram.e8a1de67.png" alt="Instagram" class="h-7 w-7 sd-font-orange"></a>
      </div>
      <p class="text-white my-3">Follow @sandragongame on social media.</p>
      <div class="mx-auto w-1/3 text-center my-2 rounded bg-white">
        <form class="flex flex-row w-full rounded">
          <!-- <input type="email" v-model="email" class="input border left-rounded p-1 w-full" id="email" placeholder="Email"> -->
          <input type="email" class="input border left-rounded p-1 w-full" id="email" placeholder="Email">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 right-rounded">Email</button>
        </form>
      </div>
      <p class=" sd-font-orange my-2 inline-block ">
        <router-link to="/content" class="px-1 no-underline inline-block">
          CONTENT |
        </router-link>
        <router-link to="/about" class="px-1 no-underline inline-block">
          ABOUT |
        </router-link>
        <router-link to="/contact" class="px-1 no-underline inline-block">
          CONTACT
        </router-link>
      </p>
      <img src="../../assets/sandragon_blue.png" class="m-auto" style="width: 100px;">
      <p class="text-white my-2 m-auto">
        PRIVACY | TERMS OF SERVICE
      </p>
    </footer>
  </div>
</template>

<script>

export default {
  name: 'Footer',
}

</script>

<style scoped>
  /* .sd-font-orange {
    color: #ED7126
  } */
</style>
