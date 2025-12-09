const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gerenciamento de Tarefas',
      version: '1.0.0',
      description: `
        API RESTful para gerenciamento de tarefas desenvolvida com Express.js e Supabase.
        
        ## Funcionalidades
        - Criar novas tarefas
        - Listar tarefas por usuário
        - Buscar tarefa por ID
        - Atualizar tarefas
        - Excluir tarefas
        
        ## Tecnologias
        - Node.js
        - Express.js
        - Supabase (PostgreSQL)
        - Swagger para documentação
      `,
      contact: {
        name: 'Suporte da API',
        email: 'seu-email@exemplo.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de Desenvolvimento'
      }
    ],
    tags: [
      {
        name: 'Tarefas',
        description: 'Operações relacionadas a tarefas'
      },
      {
        name: 'Sistema',
        description: 'Informações do sistema'
      }
    ],
    components: {
      schemas: {
        Tarefa: {
          type: 'object',
          required: ['titulo', 'usuario_id'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único da tarefa',
              example: 1
            },
            titulo: {
              type: 'string',
              description: 'Título da tarefa',
              example: 'Estudar Vue.js'
            },
            descricao: {
              type: 'string',
              description: 'Descrição detalhada da tarefa',
              example: 'Completar o tutorial de Vue.js 3'
            },
            concluida: {
              type: 'boolean',
              description: 'Status de conclusão da tarefa',
              example: false
            },
            usuario_id: {
              type: 'string',
              description: 'ID do usuário dono da tarefa',
              example: 'user123abc'
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação da tarefa',
              example: '2025-12-08T10:30:00Z'
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Data da última atualização',
              example: '2025-12-08T10:30:00Z'
            }
          }
        },
        TarefaInput: {
          type: 'object',
          required: ['titulo', 'usuario_id'],
          properties: {
            titulo: {
              type: 'string',
              description: 'Título da tarefa',
              example: 'Estudar Express.js'
            },
            descricao: {
              type: 'string',
              description: 'Descrição da tarefa',
              example: 'Aprender a criar APIs REST'
            },
            concluida: {
              type: 'boolean',
              description: 'Status de conclusão',
              example: false,
              default: false
            },
            usuario_id: {
              type: 'string',
              description: 'ID do usuário',
              example: 'user123abc'
            }
          }
        },
        TarefaUpdate: {
          type: 'object',
          properties: {
            titulo: {
              type: 'string',
              description: 'Novo título da tarefa',
              example: 'Estudar Node.js'
            },
            descricao: {
              type: 'string',
              description: 'Nova descrição',
              example: 'Aprofundar conhecimentos em Node.js'
            },
            concluida: {
              type: 'boolean',
              description: 'Novo status de conclusão',
              example: true
            }
          }
        },
        Erro: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Mensagem de erro',
              example: 'Tarefa não encontrada'
            }
          }
        },
        Sucesso: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Mensagem de sucesso',
              example: 'Operação realizada com sucesso'
            },
            data: {
              type: 'object',
              description: 'Dados retornados'
            }
          }
        }
      },
      responses: {
        BadRequest: {
          description: 'Requisição inválida',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Erro'
              },
              example: {
                error: 'Título e usuário são obrigatórios'
              }
            }
          }
        },
        NotFound: {
          description: 'Recurso não encontrado',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Erro'
              },
              example: {
                error: 'Tarefa não encontrada'
              }
            }
          }
        },
        InternalServerError: {
          description: 'Erro interno do servidor',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Erro'
              },
              example: {
                error: 'Erro ao processar requisição'
              }
            }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js', './server.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;