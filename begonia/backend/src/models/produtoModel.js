// Validação e comandos SQL do produto
const db = require('../config/database');

const categorias = ['Flores', 'Plantas', 'Arranjos', 'Vasos', 'Acessórios'];

// Retorna a mensagem de erro, ou null se estiver tudo certo
function validar(produto) {
  if (!produto.nome || produto.nome.trim().length < 2) {
    return 'O nome é obrigatório (mínimo 2 letras).';
  }
  if (!categorias.includes(produto.categoria)) {
    return 'Escolha uma categoria válida.';
  }
  if (produto.preco === '' || isNaN(produto.preco) || produto.preco < 0) {
    return 'O preço deve ser um número maior ou igual a zero.';
  }
  if (produto.quantidade === '' || !Number.isInteger(Number(produto.quantidade)) || produto.quantidade < 0) {
    return 'A quantidade deve ser um número inteiro maior ou igual a zero.';
  }
  return null;
}

function listar() {
  return db.prepare('SELECT * FROM produtos ORDER BY nome').all();
}

function buscar(id) {
  return db.prepare('SELECT * FROM produtos WHERE id = ?').get(id);
}

function criar(p) {
  const resultado = db
    .prepare('INSERT INTO produtos (nome, categoria, preco, quantidade) VALUES (?, ?, ?, ?)')
    .run(p.nome.trim(), p.categoria, Number(p.preco), Number(p.quantidade));
  return buscar(resultado.lastInsertRowid);
}

function atualizar(id, p) {
  db.prepare('UPDATE produtos SET nome = ?, categoria = ?, preco = ?, quantidade = ? WHERE id = ?')
    .run(p.nome.trim(), p.categoria, Number(p.preco), Number(p.quantidade), id);
  return buscar(id);
}

function excluir(id) {
  db.prepare('DELETE FROM produtos WHERE id = ?').run(id);
}

module.exports = { validar, listar, buscar, criar, atualizar, excluir };
