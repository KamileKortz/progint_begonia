# Floricultura – CRUD de produtos

Sistema simples para controlar o estoque de uma floricultura. Backend em Node.js + Express + SQLite e frontend em HTML, CSS e JavaScript puro.

Cada produto tem: nome, categoria, preço e quantidade.

## Estrutura

```
backend/
  server.js                      # liga o servidor
  src/app.js                     # configura o Express
  src/config/database.js         # conexão com o SQLite
  src/models/produtoModel.js     # validação e SQL
  src/controllers/produtoController.js  # status HTTP e respostas
  src/routes/produtoRoutes.js    # endpoints
frontend/
  index.html
  css/styles.css
  js/api.js                      # fetch
  js/app.js                      # tela e eventos
```

## Endpoints

| Método | Rota | Sucesso | Erros |
|---|---|---|---|
| GET | /api/produtos | 200 + lista | — |
| GET | /api/produtos/:id | 200 + produto | 400, 404 |
| POST | /api/produtos | 201 + produto | 400 |
| PUT | /api/produtos/:id | 200 + produto | 400, 404 |
| DELETE | /api/produtos/:id | 204 | 400, 404 |

Os erros voltam como `{ "erro": "mensagem" }`.

## Regras

- Nome obrigatório (mínimo 2 letras)
- Categoria: Flores, Plantas, Arranjos, Vasos ou Acessórios
- Preço maior ou igual a zero
- Quantidade inteira maior ou igual a zero

## Como rodar

Precisa do Node.js 18 ou superior.

```
cd backend
npm install
npm start
```

Abra http://localhost:3000. O banco `database.sqlite` é criado sozinho.
