<template>
  <div class="items-center text-center py-20">
    <div
      v-for="material in materials"
      :key="material.id"
      :material="material">
      <div v-if="material.slug === slug">
        <button
          v-if="isAdmin()"
          class="bg-transprent text-sm hover:bg-blue-400 text-blue hover:text-white no-underline font-bold py-2 px-4 rounded border border-blue-500 "
          @click="routeTo()"
          >
            Edit
        </button>
        <p class="my-8 semibold text-2xl">{{material.title}}</p>
        <img :src="material.image_url" class="w-2/5 mx-auto" />
        <div class="mx-auto w-3/5 text-center p-4 mt-4">
          <p>{{material.description}}</p>
        </div>
        <button
          v-if="isSignedIn()"
          class=" bg-orange download-btn text-sm no-underline font-bold py-2 px-4 rounded shadow text-white"
          @click="addMaterial()"
          >
            Download
        </button>
      </div>
    </div>
  </div>
</template>

<script>
//this is not good for SEO reasons and should instead use system that associates the id with a slug
export default {
  data () {
    return {
     materialId: null,
     materials: [],
     material: [],
     slug: "",
     reroute: false
    }
  },
  async created () {
    await this.$http.secured.get("/materials")
      .then(response => { this.materials = response.data })
      .catch(error => this.setError(error, 'Something went wrong'))

    this.checkSlug()
  },
  methods: {
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
    routeTo(){
      window.location = "/materials/editor";
    },
    isSignedIn () {
      return this.$store.state.signedIn
    },
    checkSlug() {
      this.slug = window.location.href.slice(30);
      let match = false;
      this.materials.forEach(element =>{
        if (element.slug == this.slug ) {
          match = true;
          return;
        }
      });
      if(match === false){
        window.location = "/content";
      }
    }
  }
}
</script>

<style scoped>
</style>
