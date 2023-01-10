const userSchema = require("../models/clientSchema");

const getAll = (req, res) => {
  clientSchema.find(function (err, clients) {
    if (err) {
      res.status(500).send({ message: err.message });
    }
    res.status(200).send(clients);
  });
};

const createClient = async (req, res) => {
  // acessar nome que vem na requisição
  const name = req.body.name;
  // procurar se existe o nome no banco
  const currentClient = await clientSchema.findOne({ name: name });

  if (currentClient) {
    return res.status(500).send("Cliente já existe");
  }

  try {
    const newClient = new clientSchema(req.body);
    const savedClient = await newClient.save();
    res.status(201).json({ message: "Cliente adicionado!", savedClient });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAmountSpent = async (req, res) => {
  // acessar a informação de qual documento atualizar
  const clientToUpdate = { name: req.body.name };

  // acessar informação do novo valor gasto
  const newAmountSpent = req.body.newAmountSpent;

  clientSchema.updateOne(
    clientToUpdate,
    { amountSpent: newAmountSpent },
    function (err, client) {
      if (err) {
        return res.status(400).send(err);
      }
      res.status(200).send("Montante gasto atualizado!");
    }
  );
};

module.exports = {
  getAll,
  createClient,
  updateAmountSpent,
};
