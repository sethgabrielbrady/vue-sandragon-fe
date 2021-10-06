<template>
  <div>
    <header class="bg-gradient-to-br from-indigo-900 to-purple-700 py-3" style=" position: fixed; z-index: 3; width: 100%;">
      <div class="container m-auto flex flex-wrap items-center justify-end">
        <router-link to="/" class="text-white px-2 no-underline absolute flex" style="right: calc(100% - 9rem);">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sd-orange" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
          </svg>
          <p clas="inline-block">SANDRAGON</p>
        </router-link>
        <div>
          <p class="text-white px-2 no-underline inline block" v-if="!signedIn()" @click="toggleModal()">Sign in</p>
          <router-link to="/materials" class="text-white px-2 no-underline inline-block" v-if="signedIn() && showAdminLink()">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sd-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
          </router-link>
          <div class="dropdown rounded-lg" v-if="signedIn()">
            <p class="inline-block text-white">{{this.$store.state.currentUser.username}}</p>
            <img src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=50" class="w-7 h-7 ml-2 bg-gray-900 rounded-full inline-block"/>
            <div class="dropdown-content">
              <router-link to="/posts" class="text-white px-2 no-underline" v-if="signedIn() && showAdminLink()">Posts Edit</router-link>
              <router-link to="user/id/account" class="text-white px-2 no-underline">Account</router-link>
              <a @click.prevent="signOut" class="text-white px-2 no-underline" v-if="signedIn()" style="cursor:pointer;">Sign out</a>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div
      class="fixed rounded max-w-sm m-auto my-8 shadow"
      style="z-index: 4; background: white; transform: translate(calc(25vw + 50%), calc(25vh - 10%)); width:30%; height:auto;"
      v-if="this.toggle"
    >
      <Signin />
    </div>
  </div>
</template>

<script>
import Signin from './Signin.vue'

export default {
  name: 'Header',
  data() {
    return {
      toggle: false
    }
  },
  components: {
    Signin
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
    toggleModal () {
      this.toggle = !this.toggle;
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
</style>
