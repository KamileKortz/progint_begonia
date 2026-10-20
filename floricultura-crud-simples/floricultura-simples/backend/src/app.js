// Configuração do Express
const express = require('express');
const cors = require('cors');
const path = require('path');
const produtoRoutes = require('./routes/produtoRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Rotas da API
app.use('/api/produtos', produtoRoutes);

// Mostra a pasta frontend no navegador
app.use(express.static(path.join(__dirname, '..', '..', 'frontend')));

module.exports = app;
