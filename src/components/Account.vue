<template>
  <div class="w-3/5 m-auto">
    <div class="items-center p-10">
      <p class="text-center">Account Edit</p>
      <p>{{ userName }}</p>
      <form>
        <img :src="this.$store.state.currentUser.image_url" class="w-40 h-40 ml-2 bg-gray-900 rounded inline-block ml-2 mr-1"/>
        <label class="block text-gray-700 text-sm font-bold mb-2 p-2" for="image">User Image</label>
        <input class="mb-4" type="file" name="image" ref="inputFile" @change=uploadFile()>
        <div class="mb-6 w-2/5">
          <label for="username" class="label">Update username</label>
          <input type="username" v-model="username" class="input border rounded p-2 w-full" id="username" placeholder="username" required>
        </div>
        <br>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click=createItem()>Upload</button>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Account',

  data () {
    return {
      userPicture: null,
      userName: this.$store.state.currentUser.username,
      userImage: null,
      user: [],
      userId: this.$store.getters.currentUserId
    }
  },
  created (){
    if ( !this.signedIn() ){
      this.$router.replace('/');
    }else if(this.userId){
      this.$http.plain.get(`/users/${this.userId}`)
        .then(response => { this.user = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))

    }else {
      return;
    }
  },
  methods: {
     uploadFile () {
      this.userPicture = this.$refs.inputFile.files[0];
    },
    createItem: function() {
      const params = {
        'image': this.userPicture
      }

      let formData = new FormData()
      Object.entries(params).forEach(
        ([key, value]) => formData.append(key, value)
      )

      if(this.userPicture){
        this.$http.uploadFile.patch(`/users/${this.userId}`, formData)
      }

      this.$http.plain.patch(`/posts/${this.userId}`, {
        user: {
          userName: this.userName,
        }
      })
    },
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    signedIn () {
      return this.$store.state.signedIn
    },
    updateUser () {
      this.$http.plain.patch(`/user/${this.userId}`, {
        user: {
          userName: this.userName
        }
      })
    }
  }
}
</script>

