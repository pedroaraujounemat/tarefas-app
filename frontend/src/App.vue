<template>
  <v-app>
    <!-- Barra de navegação (só aparece se estiver autenticado) -->
    <v-app-bar v-if="authStore.isAuthenticated" color="primary" dark>
      <v-app-bar-title>
        <v-icon class="mr-2">mdi-check-circle</v-icon>
        Gerenciador de Tarefas
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn to="/" text>
        <v-icon>mdi-home</v-icon>
        Home
      </v-btn>

      <v-btn to="/tarefas" text>
        <v-icon>mdi-clipboard-list</v-icon>
        Tarefas
      </v-btn>

      <v-btn to="/sobre" text>
        <v-icon>mdi-information</v-icon>
        Sobre
      </v-btn>

      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-avatar size="40">
              <v-img :src="authStore.userPhoto" v-if="authStore.userPhoto" />
              <v-icon v-else>mdi-account-circle</v-icon>
            </v-avatar>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title>{{ authStore.userName }}</v-list-item-title>
            <v-list-item-subtitle>{{ authStore.userEmail }}</v-list-item-subtitle>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item @click="handleLogout">
            <v-list-item-title>
              <v-icon class="mr-2">mdi-logout</v-icon>
              Sair
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <router-view v-if="!authStore.loading" />
      <v-container v-else class="fill-height">
        <v-row align="center" justify="center">
          <v-col cols="auto">
            <v-progress-circular
              indeterminate
              color="primary"
              size="64"
            ></v-progress-circular>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>