<template>
  <div>
    <div class="max-w-lg m-auto">
      <div class="p-10 ">
        <h3 class="text-2xl mb-6 text-grey-darkest text-center">Sign Up</h3>
        <form @submit.prevent="signup" class="relative">
          <div class="text-red" v-if="error">{{ error }}</div>

          <div class="mb-6">
            <label for="email" class="label">E-mail Address</label>
            <input type="email" v-model="email" class="input border rounded p-2 w-full" id="email" placeholder="email" required>
          </div>

          <div class="mb-6">
            <label for="username" class="label">username</label>
            <input type="username" v-model="username" class="input border rounded p-2 w-full" id="username" placeholder="username" required>
          </div>

          <div class="mb-6">
            <label for="password" class="label">Password</label>
            <input type="password" v-model="password" class="input border rounded p-2 w-full" id="password" placeholder="Password" required>
          </div>
          <div class="mb-6">
            <label for="password_confirmation" class="label">Password Confirmation</label>
            <input type="password" v-model="password_confirmation" class="input border rounded p-2 w-full" id="password_confirmation" placeholder="Password Confirmation" required>
          </div>

          <div class="mb-6 relative">
            <div class="absolute" style="display: inline-block; top: 2px;">
              <svg v-if="visibleSubmit" @click="termsCheck()" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <input v-else type="checkbox" class="input border rounded p-2" @click="termsCheck()" id="Terms" required>
            </div>
              <label class="ml-6 label text-xs">
                By checking this box, you state that are at least 13 years of age and that you agree to our <a href="/terms" target="_blank">Terms of Services</a>
              </label>
          </div>

          <div class="mb-6 relative">
            <div class="absolute" style="display: inline-block; top: 2px; ">
              <svg v-if="updateSubmit" @click="updatesCheck()" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <input v-else type="checkbox" class="input border rounded p-2 " @click="updatesCheck()" id="Updates">
            </div>

            <label class="ml-6 label text-xs">
              Would you like to receive email updates about Sandragon?
            </label>
          </div>

          <button v-if="visibleSubmit" type="submit" class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded my-2 w-full">Sign Up</button>
          <button v-else class="bg-gray-400 text-white font-bold py-2 px-4 rounded my-2 w-full" style="pointer-events:none;">Sign Up</button>

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
    <div v-if="showTerms()">
      <Terms />
    </div>
  </div>
</template>

<script>
import Terms from '@/components/Terms'

export default {
  name: 'Signup',

  components: {
    Terms
  },
  data () {
    return {
      email: '',
      password: '',
      password_confirmation: '',
      username: '',
      error: '',
      visibleSubmit: false,
      updateSubmit: false
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
          password_confirmation: this.password_confirmation,
          username: this.username
        })
          .then(response => this.signupSuccessful(response))
          .catch(error => this.signupFailed(error))
    },
    signupSuccessful (response) {
      if (!response.data.csrf) {
        this.signupFailed(response)
        return
      }else {
        this.signin(this.email, this.password)
        this.checkedSignIn();
      }
    },
    async signin (email, password) {
      await this.$http.plain.post('/signin', {
        email: email,
        password: password
      })
      .then(response => this.signinSuccessful(response))
      .catch(error => this.signupFailed(error))
    },
    async signinSuccessful (response) {
      if (!response.data.csrf) {
        this.signupFailed(response)
        return
      }
      await this.$http.plain.get('/me')
        .then(meResponse => {
          this.$store.commit('setCurrentUser', { currentUser: meResponse.data, csrf: response.data.csrf })
          this.error = ''
          this.$router.go('/')
        })
        .catch(error => this.signupFailed(error))
    },
    signupFailed (error) {
      this.error = (error.response && error.response.data && error.response.data.error) || ''
      this.$store.commit('unsetCurrentUser')
    },
    checkedSignedIn () {
      if (this.$store.state.signedIn) {
        this.$router.replace('/')
      }
    },
    showTerms(){
      return this.visibleTerms;
    },
    termsCheck(){
      this.visibleSubmit = !this.visibleSubmit
    },
    updatesCheck(){
      this.updateSubmit = !this.updateSubmit
    }
  }
}
</script>
