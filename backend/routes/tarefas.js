const express = require('express');
const router = express.Router();
const supabase = require('../config/database');

// CREATE - Criar nova tarefa
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

// READ - Listar todas as tarefas de um usuário
router.get('/usuario/:usuario_id', async (req, res) => {
  try {
    const { usuario_id } = req.params;

    const { data, error } = await supabase
      .from('tarefas')
      .select('*')
      .eq('usuario_id', usuario_id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ - Buscar tarefa por ID
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

// UPDATE - Atualizar tarefa
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

// DELETE - Excluir tarefa
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