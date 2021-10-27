import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    currentUser: {},
    signedIn: false,
    csrf: null,
    materialId: null,
    postId: null,
    activeContentId: null,
    activePostId: null,
    postBlurb: null,
    materialBlurb: null
  },
  mutations: {
    setCurrentUser (state, { currentUser, csrf }) {
      state.currentUser = currentUser
      state.signedIn = true
      state.csrf = csrf
    },
    unsetCurrentUser (state) {
      state.currentUser = {}
      state.signedIn = false
      state.csrf = null
    },
    refresh (state, csrf) {
      state.signedIn = true
      state.csrf = csrf
    },
    setMaterialId(state, materialId ) {
      state.materialId = materialId
    },
    setPostId(state, postId ) {
      state.postId = postId
    },
    setActiveContentId(state, activeContentId ) {
      state.activeContentId = activeContentId
    },
    setActivePostId(state, activePostId ) {
      state.activePostId = activePostId
    },
    setPostBlurb(state, postBlurb ) {
      state.postBlurb = postBlurb
    },
    setMaterialBlurb(state, materialBlurb ) {
      state.materialBlurb = materialBlurb
    }
  },
  getters: {
    isAdmin (state) {
      return state.currentUser && state.currentUser.role === 'admin'
    },
    currentUserId (state) {
      return state.currentUser && state.currentUser.id
    }
  },
  plugins: [createPersistedState()]
})
