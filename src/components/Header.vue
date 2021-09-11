<template>
  <header class="bg-gradient-to-br from-indigo-500 to-purple-600 py-4">
    <div class="container m-auto flex flex-wrap items-center justify-end">
      <div>
        <router-link to="/posts" class="text-white px-2 no-underline" v-if="signedIn()">Posts</router-link>
        <router-link to="/signin" class="text-white px-2 no-underline" v-if="!signedIn()">Sign in</router-link>
        <router-link to="/signup" class="text-white px-2 no-underline" v-if="!signedIn()">Sign Up</router-link>
        <router-link to="/materials" class="text-white px-2 no-underline" v-if="signedIn()">Materials</router-link>
        <router-link to="/admin" class="text-white px-2 no-underline" v-if="signedIn()">Admin</router-link>
        <a href="#" @click.prevent="signOut" class="text-white px-2 no-underline" v-if="signedIn()">Sign out</a>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  created () {
    this.signedIn()
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    signedIn () {
      // alert("Vuex store", this.$store.state.signedIn)
      return this.$store.state.signedIn
    },
    signOut () {
      this.$http.secured.delete('/signin')
        .then((response) => {
          console.log(response);
          this.$store.commit('unsetCurrentUser')
          this.$router.replace('/')
        })
        .catch(error => this.setError(error, 'Cannot sign out'))
    },
    showAdminLink () {
      return this.$store.getters.isAdmin || this.$store.getters.isManager
    }
  }
}
</script>
