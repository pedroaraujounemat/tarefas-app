<template>
  <v-app>
    <v-main>
      <v-container fluid class="fill-height">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-card-title class="text-h4 text-center py-8">
                <v-icon size="48" color="primary" class="mr-2">mdi-check-circle</v-icon>
                <br>
                Gerenciador de Tarefas
              </v-card-title>

              <v-card-text class="text-center">
                <p class="text-h6 mb-4">Bem-vindo!</p>
                <p class="text-body-1 mb-6">
                  Faça login com sua conta Google para acessar suas tarefas
                </p>

                <v-btn
                  color="primary"
                  size="large"
                  prepend-icon="mdi-google"
                  block
                  :loading="loading"
                  @click="handleLogin"
                >
                  Entrar com Google
                </v-btn>

                <v-alert
                  v-if="error"
                  type="error"
                  class="mt-4"
                  closable
                  @click:close="error = null"
                >
                  {{ error }}
                </v-alert>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const loading = ref(false)
const error = ref(null)

const handleLogin = async () => {
  loading.value = true
  error.value = null

  const result = await authStore.loginWithGoogle()

  if (result.success) {
    router.push('/')
  } else {
    error.value = 'Erro ao fazer login. Tente novamente.'
  }

  loading.value = false
}
</script>