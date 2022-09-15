// FUNÇÃO ESSE ARQUIVO:inicializar o servidor em node.js
const app = require("./src/app");

const PORT = process.env.PORT;

//app.listen(PORTA,função anônima)
app.listen(PORT,() =>{console.log(`Servidor rodando na porta ${PORT}`)})