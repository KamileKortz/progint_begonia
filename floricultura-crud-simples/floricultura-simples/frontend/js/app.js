// Aqui ficam o DOM e os eventos da tela
const formulario = document.getElementById('formulario');
const tabela = document.getElementById('tabela');
const mensagem = document.getElementById('mensagem');

let produtos = [];

function mostrarMensagem(texto, erro) {
  mensagem.textContent = texto;
  mensagem.className = erro ? 'erro' : 'ok';
}

async function carregarTabela() {
  try {
    produtos = await listarProdutos();
  } catch (e) {
    mostrarMensagem('Não foi possível conectar ao servidor.', true);
    return;
  }

  tabela.innerHTML = '';
  document.getElementById('vazio').hidden = produtos.length > 0;

  for (const p of produtos) {
    tabela.innerHTML += `
      <tr>
        <td>${p.nome}</td>
        <td>${p.categoria}</td>
        <td>R$ ${p.preco.toFixed(2).replace('.', ',')}</td>
        <td>${p.quantidade}</td>
        <td>
          <button class="borda" onclick="editar(${p.id})" aria-label="Editar ${p.nome}">Editar</button>
          <button class="vermelho" onclick="excluir(${p.id})" aria-label="Excluir ${p.nome}">Excluir</button>
        </td>
      </tr>`;
  }
}

function limparFormulario() {
  formulario.reset();
  document.getElementById('id').value = '';
  document.getElementById('titulo-form').textContent = 'Novo produto';
  document.getElementById('btn-salvar').textContent = 'Cadastrar produto';
  document.getElementById('btn-cancelar').hidden = true;
}

function editar(id) {
  const p = produtos.find((produto) => produto.id === id);

  document.getElementById('id').value = p.id;
  document.getElementById('nome').value = p.nome;
  document.getElementById('categoria').value = p.categoria;
  document.getElementById('preco').value = p.preco;
  document.getElementById('quantidade').value = p.quantidade;

  document.getElementById('titulo-form').textContent = 'Editar produto';
  document.getElementById('btn-salvar').textContent = 'Salvar alterações';
  document.getElementById('btn-cancelar').hidden = false;
  document.getElementById('nome').focus();
}

async function excluir(id) {
  if (!confirm('Deseja excluir este produto?')) {
    return;
  }
  try {
    await excluirProduto(id);
    mostrarMensagem('Produto excluído.', false);
    limparFormulario();
    carregarTabela();
  } catch (e) {
    mostrarMensagem(e.message, true);
  }
}

formulario.addEventListener('submit', async function (evento) {
  evento.preventDefault();

  const produto = {
    nome: document.getElementById('nome').value,
    categoria: document.getElementById('categoria').value,
    preco: document.getElementById('preco').value,
    quantidade: document.getElementById('quantidade').value
  };
  const id = document.getElementById('id').value;

  try {
    await enviarProduto(produto, id);
    mostrarMensagem(id ? 'Produto atualizado.' : 'Produto cadastrado.', false);
    limparFormulario();
    carregarTabela();
  } catch (e) {
    mostrarMensagem(e.message, true);
  }
});

document.getElementById('btn-cancelar').addEventListener('click', limparFormulario);

carregarTabela();
