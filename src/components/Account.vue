<template>
  <div>
    <p>Account</p>
    <p>{{ userName }}</p>
    <img :src="user.image_url" class="mx-1 border" width="50%" height="auto" />

    <form>
      <label class="block text-gray-700 text-sm font-bold mb-2 p-2" for="image">User Image</label>
      <input class="mb-4" type="file" name="image" ref="inputFile" @change=uploadFile()>
      <br>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click=createItem()>Upload</button>
    </form>
  </div>
</template>

<script>

export default {
  name: 'Account',

  data () {
    return {
      userPicture: null,
      userName: "Default",
      userImage: null,
      email: "",
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

      this.email = this.user.email
      this.userName = this.user.username
      console.log("user", this.user);
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

      // this.$http.plain.patch(`/posts/${this.userId}`, {
      //   user: {
      //     userName: this.userName,
      //     email: this.email
      //   }
      // })
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
          userName: this.title,
          email: this.body
        }
      })
    }
  }
}
</script>

