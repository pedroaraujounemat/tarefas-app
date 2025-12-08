const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

console.log('🔍 Verificando configuração do Supabase...');
console.log('📍 SUPABASE_URL:', supabaseUrl ? '✅ Definido' : '❌ Não definido');
console.log('🔑 SUPABASE_KEY:', supabaseKey ? '✅ Definido' : '❌ Não definido');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ ERRO: Variáveis de ambiente não configuradas!');
  throw new Error('Variáveis de ambiente SUPABASE_URL e SUPABASE_KEY são obrigatórias!');
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('✅ Cliente Supabase criado com sucesso!');

module.exports = supabase;