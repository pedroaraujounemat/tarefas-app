<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h3 mb-4">
          <v-icon size="40" class="mr-2">mdi-clipboard-list</v-icon>
          Minhas Tarefas
        </h1>
      </v-col>

      <v-col cols="12">
        <v-btn
          color="primary"
          prepend-icon="mdi-plus"
          size="large"
          @click="openDialog()"
        >
          Nova Tarefa
        </v-btn>
      </v-col>

      <v-col cols="12">
        <v-card v-if="loading" class="pa-4">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
          Carregando tarefas...
        </v-card>

        <v-alert v-else-if="tarefas.length === 0" type="info" variant="tonal">
          Você ainda não tem tarefas. Clique em "Nova Tarefa" para começar!
        </v-alert>

        <v-row v-else>
          <v-col
            v-for="tarefa in tarefas"
            :key="tarefa.id"
            cols="12"
            md="6"
            lg="4"
          >
            <v-card :class="{ 'bg-grey-lighten-3': tarefa.concluida }">
              <v-card-title class="d-flex align-center">
                <v-checkbox
                  :model-value="tarefa.concluida"
                  color="success"
                  hide-details
                  @change="toggleConcluida(tarefa)"
                ></v-checkbox>
                <span :class="{ 'text-decoration-line-through': tarefa.concluida }">
                  {{ tarefa.titulo }}
                </span>
              </v-card-title>

              <v-card-text v-if="tarefa.descricao">
                <p :class="{ 'text-decoration-line-through': tarefa.concluida }">
                  {{ tarefa.descricao }}
                </p>
              </v-card-text>

              <v-card-actions>
                <v-chip
                  :color="tarefa.concluida ? 'success' : 'warning'"
                  size="small"
                >
                  {{ tarefa.concluida ? 'Concluída' : 'Pendente' }}
                </v-chip>
                <v-spacer></v-spacer>
                <v-btn
                  icon="mdi-pencil"
                  size="small"
                  @click="openDialog(tarefa)"
                ></v-btn>
                <v-btn
                  icon="mdi-delete"
                  size="small"
                  color="error"
                  @click="confirmarExclusao(tarefa)"
                ></v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Dialog de Criar/Editar -->
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title>
          {{ editando ? 'Editar Tarefa' : 'Nova Tarefa' }}
        </v-card-title>

        <v-card-text>
          <v-text-field
            v-model="form.titulo"
            label="Título *"
            variant="outlined"
            :rules="[v => !!v || 'Título é obrigatório']"
          ></v-text-field>

          <v-textarea
            v-model="form.descricao"
            label="Descrição"
            variant="outlined"
            rows="3"
          ></v-textarea>

          <v-checkbox
            v-model="form.concluida"
            label="Marcar como concluída"
            v-if="editando"
          ></v-checkbox>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false">Cancelar</v-btn>
          <v-btn
            color="primary"
            :loading="salvando"
            @click="salvarTarefa"
            :disabled="!form.titulo"
          >
            {{ editando ? 'Salvar' : 'Criar' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog de Confirmação de Exclusão -->
    <v-dialog v-model="dialogExcluir" max-width="400">
      <v-card>
        <v-card-title>Confirmar Exclusão</v-card-title>
        <v-card-text>
          Tem certeza que deseja excluir a tarefa "{{ tarefaParaExcluir?.titulo }}"?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialogExcluir = false">Cancelar</v-btn>
          <v-btn
            color="error"
            :loading="excluindo"
            @click="excluirTarefa"
          >
            Excluir
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar de Feedback -->
    <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="3000">
      {{ snackbarText }}
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'

const authStore = useAuthStore()
const API_URL = import.meta.env.VITE_API_URL

const tarefas = ref([])
const loading = ref(false)
const dialog = ref(false)
const dialogExcluir = ref(false)
const salvando = ref(false)
const excluindo = ref(false)
const editando = ref(false)
const tarefaParaExcluir = ref(null)

const form = ref({
  titulo: '',
  descricao: '',
  concluida: false
})

const snackbar = ref(false)
const snackbarText = ref('')
const snackbarColor = ref('success')

const carregarTarefas = async () => {
  loading.value = true
  try {
    const response = await axios.get(`${API_URL}/tarefas/usuario/${authStore.userId}`)
    tarefas.value = response.data
  } catch (error) {
    mostrarMensagem('Erro ao carregar tarefas', 'error')
    console.error(error)
  } finally {
    loading.value = false
  }
}

const openDialog = (tarefa = null) => {
  if (tarefa) {
    editando.value = true
    form.value = { ...tarefa }
  } else {
    editando.value = false
    form.value = {
      titulo: '',
      descricao: '',
      concluida: false
    }
  }
  dialog.value = true
}

const salvarTarefa = async () => {
  if (!form.value.titulo) return

  salvando.value = true
  try {
    if (editando.value) {
      await axios.put(`${API_URL}/tarefas/${form.value.id}`, form.value)
      mostrarMensagem('Tarefa atualizada com sucesso!')
    } else {
      await axios.post(`${API_URL}/tarefas`, {
        ...form.value,
        usuario_id: authStore.userId
      })
      mostrarMensagem('Tarefa criada com sucesso!')
    }
    dialog.value = false
    carregarTarefas()
  } catch (error) {
    mostrarMensagem('Erro ao salvar tarefa', 'error')
    console.error(error)
  } finally {
    salvando.value = false
  }
}

const toggleConcluida = async (tarefa) => {
  try {
    await axios.put(`${API_URL}/tarefas/${tarefa.id}`, {
      concluida: !tarefa.concluida
    })
    carregarTarefas()
    mostrarMensagem(
      tarefa.concluida ? 'Tarefa marcada como pendente' : 'Tarefa concluída!'
    )
  } catch (error) {
    mostrarMensagem('Erro ao atualizar tarefa', 'error')
    console.error(error)
  }
}

const confirmarExclusao = (tarefa) => {
  tarefaParaExcluir.value = tarefa
  dialogExcluir.value = true
}

const excluirTarefa = async () => {
  excluindo.value = true
  try {
    await axios.delete(`${API_URL}/tarefas/${tarefaParaExcluir.value.id}`)
    mostrarMensagem('Tarefa excluída com sucesso!')
    dialogExcluir.value = false
    tarefaParaExcluir.value = null
    carregarTarefas()
  } catch (error) {
    mostrarMensagem('Erro ao excluir tarefa', 'error')
    console.error(error)
  } finally {
    excluindo.value = false
  }
}

const mostrarMensagem = (texto, cor = 'success') => {
  snackbarText.value = texto
  snackbarColor.value = cor
  snackbar.value = true
}

onMounted(() => {
  carregarTarefas()
})
</script>