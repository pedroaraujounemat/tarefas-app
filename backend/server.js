require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const tarefasRoutes = require('./routes/tarefas');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'API Tarefas - Documentação'
}));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Verifica se a API está funcionando
 *     tags: [Sistema]
 *     responses:
 *       200:
 *         description: API funcionando corretamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: API de Tarefas funcionando!
 */
app.get('/', (req, res) => {
  res.json({ 
    message: 'API de Tarefas funcionando!',
    documentacao: 'http://localhost:3000/api-docs'
  });
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
  console.log(`🌐 API: http://localhost:${PORT}`);
  console.log(`📚 Documentação Swagger: http://localhost:${PORT}/api-docs`);
});