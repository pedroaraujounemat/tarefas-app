const express = require('express');
const router = express.Router();
const supabase = require('../config/database');

/**
 * @swagger
 * /api/tarefas:
 *   post:
 *     summary: Cria uma nova tarefa
 *     tags: [Tarefas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TarefaInput'
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tarefa criada com sucesso
 *                 data:
 *                   $ref: '#/components/schemas/Tarefa'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/', async (req, res) => {
  try {
    const { titulo, descricao, concluida, usuario_id } = req.body;

    if (!titulo || !usuario_id) {
      return res.status(400).json({ error: 'Título e usuário são obrigatórios' });
    }

    const { data, error } = await supabase
      .from('tarefas')
      .insert([{ 
        titulo, 
        descricao: descricao || '', 
        concluida: concluida || false,
        usuario_id 
      }])
      .select();

    if (error) throw error;

    res.status(201).json({ message: 'Tarefa criada com sucesso', data: data[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/tarefas/usuario/{usuario_id}:
 *   get:
 *     summary: Lista todas as tarefas de um usuário
 *     tags: [Tarefas]
 *     parameters:
 *       - in: path
 *         name: usuario_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *         example: user123abc
 *     responses:
 *       200:
 *         description: Lista de tarefas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tarefa'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/usuario/:usuario_id', async (req, res) => {
  try {
    const { usuario_id } = req.params;
    console.log('🔍 Buscando tarefas para usuário:', usuario_id);

    const { data, error } = await supabase
      .from('tarefas')
      .select('*')
      .eq('usuario_id', usuario_id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Erro do Supabase:', error);
      throw error;
    }

    console.log('✅ Tarefas encontradas:', data.length);
    res.json(data);
  } catch (error) {
    console.error('❌ Erro no endpoint:', error.message);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/tarefas/{id}:
 *   get:
 *     summary: Busca uma tarefa específica por ID
 *     tags: [Tarefas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa
 *         example: 1
 *     responses:
 *       200:
 *         description: Tarefa encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tarefa'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('tarefas')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/tarefas/{id}:
 *   put:
 *     summary: Atualiza uma tarefa existente
 *     tags: [Tarefas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TarefaUpdate'
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tarefa atualizada com sucesso
 *                 data:
 *                   $ref: '#/components/schemas/Tarefa'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descricao, concluida } = req.body;

    const updateData = {};
    if (titulo !== undefined) updateData.titulo = titulo;
    if (descricao !== undefined) updateData.descricao = descricao;
    if (concluida !== undefined) updateData.concluida = concluida;

    const { data, error } = await supabase
      .from('tarefas')
      .update(updateData)
      .eq('id', id)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    res.json({ message: 'Tarefa atualizada com sucesso', data: data[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/tarefas/{id}:
 *   delete:
 *     summary: Exclui uma tarefa
 *     tags: [Tarefas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa a ser excluída
 *         example: 1
 *     responses:
 *       200:
 *         description: Tarefa excluída com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tarefa excluída com sucesso
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('tarefas')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({ message: 'Tarefa excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;