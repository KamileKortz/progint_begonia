// Aqui ficam todas as chamadas ao backend (fetch)
const URL_API = 'http://localhost:3000/api/produtos';

async function listarProdutos() {
  const resposta = await fetch(URL_API);
  return await resposta.json();
}

async function enviarProduto(produto, id) {
  // Se tem id é edição (PUT), se não tem é cadastro (POST)
  const url = id ? URL_API + '/' + id : URL_API;
  const metodo = id ? 'PUT' : 'POST';

  const resposta = await fetch(url, {
    method: metodo,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(produto)
  });

  const dados = await resposta.json();
  if (!resposta.ok) {
    throw new Error(dados.erro);
  }
  return dados;
}

async function excluirProduto(id) {
  const resposta = await fetch(URL_API + '/' + id, { method: 'DELETE' });
  if (!resposta.ok) {
    throw new Error('Não foi possível excluir.');
  }
}
