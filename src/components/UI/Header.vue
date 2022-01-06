<template>
  <div>
    <header class="p-3 grid grid-cols-2 gap-0" style=" position: fixed; z-index: 3; width: 100%;">
      <div class="container flex flex-wrap items-center justify-start">
        <router-link to="/" class="text-white px-2 no-underline flex nav-link">
          <img src="../../assets/sandragon_orange.png" class="m-auto" style="width: 40px;">
          <p class="inline-block my-2 text-2xl sd-font-orange" style="transform:translate(10px, calc(50% - 14px));">SANDRAGON</p>
        </router-link>
      </div>
      <div class="container flex flex-row items-center justify-end">
        <div>
          <!-- <router-link to="/content" class="text-white px-1 no-underline inline-block nav-link">
            <svg class="h-6 w-6" style="transform: translateY(6px);" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24px" height="24px" xmlns="http://www.w3.org/2000/svg">
              <g>
                <path fill="none" d="M0 0h24v24H0z"/>
                <path fill-rule="nonzero" d="M14.935 7.204l-6-3L4 6.319v12.648l5.065-2.17 6 3L20 17.68V5.033l-5.065 2.17zM2 5l7-3 6 3 6.303-2.701a.5.5 0 0 1 .697.46V19l-7 3-6-3-6.303 2.701a.5.5 0 0 1-.697-.46V5zm4 6h2v2H6v-2zm4 0h2v2h-2v-2zm5.998-.063L17.236 9.7l1.06 1.06-1.237 1.238 1.237 1.238-1.06 1.06-1.238-1.237-1.237 1.237-1.061-1.06 1.237-1.238-1.237-1.237L14.76 9.7l1.238 1.237z"/>
              </g>
            </svg>
          </router-link> -->
          <router-link to="/content" class="text-white px-1 no-underline inline-block nav-link">
            <svg class="h-6 w-6" style="transform: translateY(6px);" fill="none" viewBox="0 0 512 512" stroke="currentColor" width="24px" height="24px" xmlns="http://www.w3.org/2000/svg">
            <path fill="#fff" d="M146.857 20.842c-12.535-.036-24.268 2.86-37.285 9.424h.004C61.356 54.6 19.966 120.734 17.982 175.91l41.848 14.236c4.33-61.89 47.057-128.37 101.527-155.86h.002c4.423-2.23 8.822-4.162 13.185-5.8l-22.26-7.45c-1.83-.123-3.637-.19-5.428-.194zm59.34 20.19c-10.478-.09-22.832 3.093-36.424 9.943l.004-.004c-48.23 24.34-89.625 90.513-91.548 145.436l156.485 53.24c3.865-62.22 46.797-129.372 101.613-157.035h.002l.002-.003c4.303-2.168 8.584-4.056 12.832-5.666l-134.54-45.036c-2.652-.542-5.458-.847-8.427-.873zm174.97 58.323c-10.476-.09-22.83 3.092-36.42 9.94l-.005.002c-48.577 24.518-90.225 91.473-91.586 146.623l46.205 15.72c3.914-62.188 46.825-129.274 101.607-156.92 4.522-2.283 9.04-4.258 13.53-5.91l-26.544-8.884c-2.164-.35-4.423-.55-6.785-.57zm63.554 22.014c-10.267.093-22.094 3.353-35.333 10.034-47.158 23.8-87.777 87.587-91.362 141.75l174.55-73.726c-.404-39.01-10.754-61.304-24.415-71.082-2.347-1.68-4.867-3.057-7.55-4.137l-.01.034-4.735-1.584c-3.48-.887-7.195-1.327-11.144-1.29zM17.9 195.622l-.035 187.484L59.46 397.58V209.764L17.9 195.624zM78.15 216.12v187.962l156.282 54.37V269.288l-29.053-9.886v119.43l-101.054-34.082V225.025L78.15 216.12zm414.22 3.683L318.433 293.27v189.236l173.935-73.504v-189.2zm-369.354 11.582v99.947l63.675 21.477v-99.763l-63.674-21.662zm31.306 28.797c9.705 0 17.573 7.867 17.573 17.572 0 6.34-3.37 11.88-8.407 14.97v28.53h-18.69v-28.746c-4.838-3.13-8.048-8.562-8.048-14.754 0-9.705 7.867-17.572 17.572-17.572zm98.797 15.464v189.307l46.626 16.22V291.51l-46.627-15.864z"/>
            </svg>
          </router-link>
          <p class="text-white px-2 no-underline inline block nav-link" v-if="!signedIn()" @click="checkUrl">Sign in</p>
          <div class="dropdown rounded-lg" v-if="signedIn()">
            <div class="nav-link">
              <img :src="this.$store.state.currentUser.image_url" class="w-7 h-7 ml-2 bg-gray-900 rounded inline-block ml-2 mr-1"/>
              <p v-if="this.$store.state.currentUser.username" class="inline-block text-white nav-link" style="font-size: 0.85rem;">{{this.$store.state.currentUser.username}}</p>
              <p v-else class="inline-block text-white nav-link small">{{ this.$store.state.currentUser.email }}</p>
            </div>
            <div class="dropdown-content">
              <router-link to="/posts" class="text-white px-2 no-underline" v-if="signedIn() && showAdminLink()">Posts Edit</router-link>
              <router-link to="/account" class="text-white px-2 no-underline">Account</router-link>
              <a @click.prevent="signOut" class="text-white px-2 no-underline" v-if="signedIn()" style="cursor:pointer;">Sign out</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>

export default {
  name: 'Header',

  data() {
    return {
      toggle: false
    }
  },
  created () {
    this.signedIn();
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    signedIn () {
      return this.$store.state.signedIn
    },
    signOut () {
      this.$http.secured.delete('/signin')
        .then((response) => {
          console.log('response', response);
          this.$store.commit('unsetCurrentUser')
          this.$router.go('/')
        })
        .catch(error => this.setError(error, 'Cannot sign out'))
    },
    showAdminLink () {
      return this.$store.getters.isAdmin
    },
    checkUrl() {
      if (window.location.href.indexOf("signin") > -1 || window.location.href.indexOf("signup") > -1) {
        return
      } else {
        this.$emit('toggleSignin')
      }
    }
  }
}
</script>

<style scoped>

/* Style The Dropdown Button */
.dropbtn {
  background-color: #4CAF50;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  right:0px;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {background-color: #f1f1f1}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {
  background-color: #3e8e41;
}

.nav-link:hover {
  color: #ED7126;
}
.nav-link:hover p {
  color: #ED7126;
}
/* header {
  background-color: #0F102F;
} */
</style>
