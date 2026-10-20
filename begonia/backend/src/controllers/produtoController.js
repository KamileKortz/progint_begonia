// Decide o status HTTP e a resposta de cada rota
const Produto = require('../models/produtoModel');

function listar(req, res) {
  res.status(200).json(Produto.listar());
}

function buscar(req, res) {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ erro: 'ID inválido.' });
  }
  const produto = Produto.buscar(id);
  if (!produto) {
    return res.status(404).json({ erro: 'Produto não encontrado.' });
  }
  res.status(200).json(produto);
}

function criar(req, res) {
  const erro = Produto.validar(req.body);
  if (erro) {
    return res.status(400).json({ erro: erro });
  }
  res.status(201).json(Produto.criar(req.body));
}

function atualizar(req, res) {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ erro: 'ID inválido.' });
  }
  if (!Produto.buscar(id)) {
    return res.status(404).json({ erro: 'Produto não encontrado.' });
  }
  const erro = Produto.validar(req.body);
  if (erro) {
    return res.status(400).json({ erro: erro });
  }
  res.status(200).json(Produto.atualizar(id, req.body));
}

function excluir(req, res) {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ erro: 'ID inválido.' });
  }
  if (!Produto.buscar(id)) {
    return res.status(404).json({ erro: 'Produto não encontrado.' });
  }
  Produto.excluir(id);
  res.status(204).send();
}

module.exports = { listar, buscar, criar, atualizar, excluir };
