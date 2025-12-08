# Gerenciador de Tarefas

Sistema de gerenciamento de tarefas desenvolvido como avaliação da disciplina **Frameworks Modernos para Desenvolvimento de Sistemas**.

## 👥 Desenvolvedor

- **Pedro Salvador de Araujo**


## 📝 Descrição

Aplicação web completa para gerenciamento de tarefas com autenticação Google, permitindo aos usuários criar, editar, visualizar e excluir suas tarefas de forma organizada.

### Principais Funcionalidades

- ✅ Autenticação com conta Google (Firebase Authentication)
- ✅ Gerenciamento de sessão com Pinia
- ✅ CRUD completo de tarefas
- ✅ Interface responsiva com Vuetify
- ✅ 4 rotas distintas (Login, Home, Tarefas, Sobre)
- ✅ API REST com Express.js
- ✅ Persistência de dados com Supabase (PostgreSQL)

## 🛠️ Tecnologias Utilizadas

### Frontend
- Vue.js 3
- Vuetify (componentes UI)
- Vue Router (gerenciamento de rotas)
- Pinia (gerenciamento de estado)
- Firebase Authentication
- Axios

### Backend
- Express.js
- Supabase (PostgreSQL)
- CORS
- dotenv

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Conta no Supabase
- Conta no Firebase

## 🚀 Instalação e Execução

### 1. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/tarefas-app.git
cd tarefas-app
```

### 2. Configurar o Backend

#### 2.1 Instalar dependências

```bash
cd backend
npm install
```

#### 2.2 Configurar variáveis de ambiente

Crie um arquivo `.env` na pasta `backend` com o seguinte conteúdo:

```env
SUPABASE_URL=sua_url_do_supabase
SUPABASE_KEY=sua_chave_do_supabase
PORT=3000
```

**Como obter as credenciais do Supabase:**
1. Acesse [supabase.com](https://supabase.com)
2. Faça login e acesse seu projeto
3. Vá em Settings → API
4. Copie o `Project URL` e a chave `anon public`

#### 2.3 Criar tabela no banco de dados

No painel do Supabase, vá em SQL Editor e execute:

```sql
CREATE TABLE tarefas (
  id BIGSERIAL PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT,
  concluida BOOLEAN DEFAULT FALSE,
  usuario_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_tarefas_usuario ON tarefas(usuario_id);

ALTER TABLE tarefas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir tudo" ON tarefas
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

#### 2.4 Executar o servidor

```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3000`

### 3. Configurar o Frontend

#### 3.1 Instalar dependências

```bash
cd ../frontend
npm install
```

#### 3.2 Configurar variáveis de ambiente

Crie um arquivo `.env` na pasta `frontend` com o seguinte conteúdo:

```env
VITE_FIREBASE_API_KEY=sua_api_key
VITE_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu_project_id
VITE_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
VITE_FIREBASE_APP_ID=seu_app_id

VITE_API_URL=http://localhost:3000/api
```

**Como obter as credenciais do Firebase:**
1. Acesse [console.firebase.google.com](https://console.firebase.google.com)
2. Crie um novo projeto ou acesse um existente
3. Vá em Configurações do Projeto → Seus aplicativos
4. Adicione um app Web e copie as credenciais
5. Em Authentication, habilite o provedor Google

#### 3.3 Executar o aplicativo

```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173`

## 📱 Como Usar

1. Acesse a aplicação no navegador
2. Faça login com sua conta Google
3. Na página inicial, clique em "Ver Minhas Tarefas"
4. Clique em "Nova Tarefa" para adicionar uma tarefa
5. Preencha o título e descrição
6. Use os botões de editar e excluir para gerenciar suas tarefas
7. Marque o checkbox para marcar tarefas como concluídas

## 📁 Estrutura do Projeto

```
tarefas-app/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── routes/
│   │   └── tarefas.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── plugins/
│   │   │   ├── firebase.js
│   │   │   └── vuetify.js
│   │   ├── router/
│   │   │   └── index.js
│   │   ├── stores/
│   │   │   └── auth.js
│   │   ├── views/
│   │   │   ├── LoginView.vue
│   │   │   ├── HomeView.vue
│   │   │   ├── TarefasView.vue
│   │   │   └── SobreView.vue
│   │   ├── App.vue
│   │   └── main.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🔒 Segurança

- Autenticação via Firebase Authentication
- Rotas protegidas com guards do Vue Router
- Variáveis sensíveis em arquivos `.env` (não commitados)
- CORS configurado no backend

## 📝 Requisitos Atendidos

- ✅ Vue.js 3 com Vuetify, Vue Router e Pinia
- ✅ Autenticação com Google
- ✅ Manutenção de sessão com Pinia
- ✅ Mínimo de 3 rotas distintas (4 rotas implementadas)
- ✅ CRUD completo de tarefas
- ✅ Backend em Express.js
- ✅ Persistência com Supabase (PostgreSQL)
- ✅ Integração frontend-backend via API REST
- ✅ Tratamento de erros
- ✅ Interface responsiva

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais como parte da avaliação da disciplina Frameworks Modernos para Desenvolvimento de Sistemas.


---

**Data de Entrega:** 12 de dezembro de 2025  
**Disciplina:** Frameworks Modernos para Desenvolvimento de Sistemas