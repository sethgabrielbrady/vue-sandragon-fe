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
          <router-link to="/content" class="text-white px-1 no-underline inline-block nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" style="transform: translateY(6px);" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
          </router-link>
          <p class="text-white px-2 no-underline inline block nav-link" v-if="!signedIn()" @click="checkUrl">Sign in</p>
          <div class="dropdown rounded-lg" v-if="signedIn()">
            <div class="nav-link">
              <img src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=50" class="w-7 h-7 ml-2 bg-gray-900 rounded inline-block ml-2 mr-1"/>
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
    this.signedIn()
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
          console.log('respowne', response);
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
