<template>
  <header class="bg-gradient-to-br from-indigo-500 to-purple-600 py-4">
    <div class="container m-auto flex flex-wrap items-center justify-end">
      <div>
        <router-link to="/signin" class="text-white px-2 no-underline" v-if="!signedIn()">Sign in</router-link>
        <router-link to="/signup" class="text-white px-2 no-underline" v-if="!signedIn()">Sign Up</router-link>
        <router-link to="/posts" class="text-white px-2 no-underline" v-if="signedIn() && showAdminLink()">Posts</router-link>
        <router-link to="/materials" class="text-white px-2 no-underline" v-if="signedIn() && showAdminLink()">Materials</router-link>
        <router-link to="/admin" class="text-white px-2 no-underline" v-if="signedIn() && showAdminLink()">Admin</router-link>
        <button @click.prevent="signOut" class="text-white px-2 no-underline" v-if="signedIn()">Sign out</button>
        <p class="inline-block">{{this.$store.state.currentUser.email}} {{this.$store.state.currentUser.role}}</p>
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
    }
  }
}
</script>
