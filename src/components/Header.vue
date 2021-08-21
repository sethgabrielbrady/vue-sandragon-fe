<template>
  <header class="bg-gradient-to-br from-indigo-500 to-purple-600 py-4">
    <div class="container m-auto flex flex-wrap items-center justify-end">
      <div>
        <router-link to="/signin" class="text-white px-2 no-underline" v-if="!signedIn()">Sign in</router-link>
        <router-link to="/signup" class="text-white px-2 no-underline" v-if="!signedIn()">Sign Up</router-link>
        <router-link to="/elements" class="text-white px-2 no-underline" v-if="signedIn()">Elements</router-link>
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
      return localStorage.signedIn
    },
    signOut () {
      this.$http.secured.delete('/signin')
        .then((response) => {
          console.log(response)
          delete localStorage.csrf
          delete localStorage.signedIn
          this.$router.replace('/')
        })
        .catch(error => this.setError(error, 'Cannot sign out'))
    }
  }
}
</script>
