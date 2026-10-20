// Ponto de entrada: liga o servidor
const app = require('./src/app');

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
