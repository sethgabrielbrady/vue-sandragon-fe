<template>
  <div class="max-w-sm m-auto">
    <div class="p-10">
      <h3 class="text-2xl mb-6 text-grey-darkest text-center">Sign Up</h3>
      <form @submit.prevent="signup">
        <div class="text-red" v-if="error">{{ error }}</div>

        <div class="mb-6">
          <label for="email" class="label">E-mail Address</label>
          <input type="email" v-model="email" class="input border rounded p-2 w-full" id="email" placeholder="email">
        </div>

        <!-- <div class="mb-6">
          <label for="username" class="label">username</label>
          <input type="username" v-model="username" class="input border rounded p-2 w-full" id="username" placeholder="username">
        </div> -->

        <div class="mb-6">
          <label for="password" class="label">Password</label>
          <input type="password" v-model="password" class="input border rounded p-2 w-full" id="password" placeholder="Password">
        </div>

        <div class="mb-6">
          <label for="password_confirmation" class="label">Password Confirmation</label>
          <input type="password" v-model="password_confirmation" class="input border rounded p-2 w-full" id="password_confirmation" placeholder="Password Confirmation">
        </div>
        <button type="submit" class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded my-2 w-full">Sign Up</button>
      </form>
      <div>
        <p class="text-center mt-4">Already a member?</p>
        <router-link to="/signin" class="flex justify-center" >
          <button class=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2">
            Sign In
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Signup',
  data () {
    return {
      email: '',
      password: '',
      password_confirmation: '',
      error: ''
    }
  },
  created () {
    this.checkedSignedIn()
  },
  updated () {
    this.checkedSignedIn()
  },
  methods: {
     signup () {
     this.$http.plain.post('/signup', {
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation
      })
        .then(response => this.signupSuccessful(response))
        .catch(error => this.signupFailed(error))
    },
    signupSuccessful (response) {
      if (!response.data.csrf) {
        this.signupFailed(response)
        return
      }
    },
    signupFailed (error) {
      this.error = (error.response && error.response.data && error.response.data.error) || ''
      this.$store.commit('unsetCurrentUser')
    },
    checkedSignedIn () {
      if (this.$store.state.signedIn) {
        this.$router.replace('/')
      }
    }
  }
}
</script>
