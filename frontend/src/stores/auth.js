import { defineStore } from 'pinia'
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
import { auth, googleProvider } from '@/plugins/firebase'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: true
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    userName: (state) => state.user?.displayName || '',
    userEmail: (state) => state.user?.email || '',
    userPhoto: (state) => state.user?.photoURL || '',
    userId: (state) => state.user?.uid || ''
  },

  actions: {
    async loginWithGoogle() {
      try {
        const result = await signInWithPopup(auth, googleProvider)
        this.user = result.user
        return { success: true }
      } catch (error) {
        console.error('Erro no login:', error)
        return { success: false, error: error.message }
      }
    },

    async logout() {
      try {
        await signOut(auth)
        this.user = null
        return { success: true }
      } catch (error) {
        console.error('Erro no logout:', error)
        return { success: false, error: error.message }
      }
    },

    initAuthListener() {
      onAuthStateChanged(auth, (user) => {
        this.user = user
        this.loading = false
      })
    }
  }
})