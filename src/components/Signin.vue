<template>
  <div id="signin-modal" class="max-w-sm m-auto" v-if="this.toggle">
    <div class="p-4">
      <h3 class="text-2xl my-6 text-grey-darkest text-center">Welcome back!</h3>
      <form @submit.prevent="signin">
        <div class="text-red" v-if="error">{{ error }}</div>
        <div class="mb-6">
          <label for="email" class="label" />
          <input type="email" v-model="email" class="input border rounded p-2 w-full" id="email" placeholder="Email">
        </div>
        <div class="mb-6">
          <label for="password" class="label" />
          <input type="password" v-model="password" class="input border rounded p-2 w-full" id="password" placeholder="Password">
        </div>
        <div class="my-4 flex justify-center flex-col">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2" type="submit">
            Sign In
          </button>
        </div>
      </form>
      <p class="text-center mt-4"> Not a member?</p>
      <router-link to="/signup" class="text-white no-underline center flex justify-center">
        <button
          class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded my-2"
          @click="toggleModal"
        >
          Sign Up
        </button>
      </router-link>
      <router-link to="/forgot_password">Forgot Password</router-link>
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
      error: '',
      toggle: true,
      data: {}
    }
  },
  created () {
    this.checkSignedIn()
  },
  updated () {
    this.checkSignedIn()
  },
  methods: {
    async signin () {
      await this.$http.plain.post('/signin', {
        email: this.email,
        password: this.password
      })
      .then(response => this.signinSuccessful(response))
      .catch(error => this.signinFailed(error))
    },
    async signinSuccessful (response) {
      if (!response.data.csrf) {
        this.signinFailed(response)
        return
      }
      console.log(response)
       await this.$http.plain.get('/me')
        .then(meResponse => {
          alert("me response", meResponse)
          this.$store.commit('setCurrentUser', { currentUser: meResponse.data, csrf: response.data.csrf })
          this.error = ''
          this.$router.go('/')
        })
        .catch(error => this.signinFailed(error))
    },
    roleCheck () {

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
    },
    toggleModal () {
      this.toggle = !this.toggle;
    }
  }
}
</script>
