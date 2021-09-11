<template>
  <div class="max-w-sm m-auto my-8">
    <div class="border p-10 border-grey-light shadow rounded">
      <h3 class="text-2xl mb-6 text-grey-darkest">Sign In</h3>
      <form @submit.prevent="signin">
        <div class="text-red" v-if="error">{{ error }}</div>

        <div class="mb-6">
          <label for="email" class="label">E-mail Address</label>
          <input type="email" v-model="email" class="input" id="email" placeholder="Email">
        </div>
        <div class="mb-6">
          <label for="password" class="label">Password</label>
          <input type="password" v-model="password" class="input" id="password" placeholder="Password">
        </div>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
          Sign In
        </button>
        <div class="my-4">
          <router-link to="/signup" class="link-grey">Sign up</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Signin',
  data () {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  created () {
    this.checkSignedIn()
  },
  updated () {
    this.checkSignedIn()
  },
  methods: {
    signin () {
      this.$http.plain.post('/signin', {
        email: this.email,
        password: this.password
      })
        .then(response => this.signinSuccessful(response))
        .catch(error => this.signinFailed(error))
    },
    signinSuccessful (response) {
      if (!response.data.csrf) {
        this.signinFailed(response)
        return
      }
      console.log(response)
      this.$http.plain.get('/me')
        .then(meResponse => {
          console.log("me rsponse", meResponse)
          this.$store.commit('setCurrentUser', { currentUser: meResponse.data, csrf: response.data.csrf })
          this.error = ''
          this.$router.go('/')
        })
        .catch(error => this.signinFailed(error))
    },
    signinFailed (error) {
      console.log("me error", error)
      this.error = (error.response && error.response.data && error.response.data.error) || ''
      this.$store.commit('unsetCurrentUser')
    },
    checkSignedIn () {
      if (this.$store.state.signedIn) {
        this.$router.replace('/')
      }
    }
  }
}
</script>
