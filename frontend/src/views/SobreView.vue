<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="pa-6">
          <v-card-title class="text-h3 mb-4">
            <v-icon size="40" class="mr-2">mdi-information</v-icon>
            Sobre o Sistema
          </v-card-title>

          <v-card-text>
            <h2 class="text-h5 mb-3">Gerenciador de Tarefas</h2>
            <p class="text-body-1 mb-4">
              Sistema desenvolvido como parte da avaliação da disciplina 
              <strong>Frameworks Modernos para Desenvolvimento de Sistemas</strong>.
            </p>

            <v-divider class="my-6"></v-divider>

            <h3 class="text-h6 mb-3">Tecnologias Utilizadas</h3>
            
            <v-row>
              <v-col cols="12" md="6">
                <h4 class="text-subtitle-1 mb-2">Frontend:</h4>
                <v-chip class="ma-1" color="primary">Vue.js 3</v-chip>
                <v-chip class="ma-1" color="primary">Vuetify</v-chip>
                <v-chip class="ma-1" color="primary">Vue Router</v-chip>
                <v-chip class="ma-1" color="primary">Pinia</v-chip>
                <v-chip class="ma-1" color="primary">Firebase Auth</v-chip>
              </v-col>

              <v-col cols="12" md="6">
                <h4 class="text-subtitle-1 mb-2">Backend:</h4>
                <v-chip class="ma-1" color="secondary">Express.js</v-chip>
                <v-chip class="ma-1" color="secondary">Supabase</v-chip>
                <v-chip class="ma-1" color="secondary">PostgreSQL</v-chip>
              </v-col>
            </v-row>

            <v-divider class="my-6"></v-divider>

            <h3 class="text-h6 mb-3">Funcionalidades</h3>
            <v-list>
              <v-list-item prepend-icon="mdi-google">
                <v-list-item-title>Autenticação com Google</v-list-item-title>
                <v-list-item-subtitle>Login seguro usando conta Google</v-list-item-subtitle>
              </v-list-item>

              <v-list-item prepend-icon="mdi-shield-lock">
                <v-list-item-title>Gerenciamento de Sessão</v-list-item-title>
                <v-list-item-subtitle>Estado mantido com Pinia</v-list-item-subtitle>
              </v-list-item>

              <v-list-item prepend-icon="mdi-database">
                <v-list-item-title>CRUD Completo</v-list-item-title>
                <v-list-item-subtitle>Criar, ler, atualizar e excluir tarefas</v-list-item-subtitle>
              </v-list-item>

              <v-list-item prepend-icon="mdi-routes">
                <v-list-item-title>Múltiplas Rotas</v-list-item-title>
                <v-list-item-subtitle>Login, Home, Tarefas e Sobre</v-list-item-subtitle>
              </v-list-item>
            </v-list>

            <v-divider class="my-6"></v-divider>

            <h3 class="text-h6 mb-3">Desenvolvido por</h3>
            <p class="text-body-1">
              <strong>Pedro Salvador de Araujo</strong><br>
            </p>

            <v-divider class="my-6"></v-divider>

            <p class="text-caption text-grey">
              Disciplina: Frameworks Modernos para Desenvolvimento de Sistemas<br>
              Data: 12 de dezembro de 2025
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>