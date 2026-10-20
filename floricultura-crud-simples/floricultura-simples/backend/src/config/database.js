// Conexão com o banco SQLite
const Database = require('better-sqlite3');

const db = new Database('database.sqlite');

// Cria a tabela se ela ainda não existir
db.exec(`
  CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    categoria TEXT NOT NULL,
    preco REAL NOT NULL,
    quantidade INTEGER NOT NULL
  )
`);

module.exports = db;
