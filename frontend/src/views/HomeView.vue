<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="pa-8 text-center">
          <v-avatar size="100" class="mb-4">
            <v-img :src="authStore.userPhoto" v-if="authStore.userPhoto" />
            <v-icon v-else size="100">mdi-account-circle</v-icon>
          </v-avatar>

          <h1 class="text-h3 mb-2">Olá, {{ authStore.userName }}! 👋</h1>
          <p class="text-h6 text-grey mb-6">{{ authStore.userEmail }}</p>

          <v-divider class="my-6"></v-divider>

          <h2 class="text-h5 mb-4">Bem-vindo ao Gerenciador de Tarefas</h2>
          <p class="text-body-1 mb-6">
            Organize suas atividades de forma simples e eficiente!
          </p>

          <v-btn
            color="primary"
            size="x-large"
            prepend-icon="mdi-clipboard-list"
            to="/tarefas"
          >
            Ver Minhas Tarefas
          </v-btn>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-title class="text-h6">
            <v-icon class="mr-2">mdi-plus-circle</v-icon>
            Criar
          </v-card-title>
          <v-card-text>
            Adicione novas tarefas rapidamente e mantenha tudo organizado.
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-title class="text-h6">
            <v-icon class="mr-2">mdi-pencil</v-icon>
            Editar
          </v-card-title>
          <v-card-text>
            Atualize suas tarefas conforme necessário com facilidade.
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-title class="text-h6">
            <v-icon class="mr-2">mdi-check-circle</v-icon>
            Concluir
          </v-card-title>
          <v-card-text>
            Marque suas tarefas como concluídas e acompanhe seu progresso.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>