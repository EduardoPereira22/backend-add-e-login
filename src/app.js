//FUNÇÃO DO ARQUIVO :Armazenar as principais importações e informações do aplicativo
const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv-safe").config();
const db = require("./database/mongoConfig");
db.connect();

app.use(cors());
app.use(express.json());

//rotas do nosso projeto
const userRoutes = require("./routes/userRoutes.js");
const clientRoutes = require("./routes/clientRoutes.js");

// definir a rota principal

app.use("/users", userRoutes);
app.use("/client", clientRoutes);

module.exports = app;
