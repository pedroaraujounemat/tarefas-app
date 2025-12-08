require('dotenv').config();
const express = require('express');
const cors = require('cors');
const tarefasRoutes = require('./routes/tarefas');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Rotas
app.get('/', (req, res) => {
  res.json({ message: 'API de Tarefas funcionando!' });
});

app.use('/api/tarefas', tarefasRoutes);

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Erro interno do servidor',
    message: err.message 
  });
});

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
  console.log(`🌐 http://localhost:${PORT}`);
});