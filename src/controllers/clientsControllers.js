const userSchema = require("../models/userSchema");

const createClient = async (req, res) => {
  const clientToUpdate = { name: "Luiza" };
  const newClient = req.body;

  userSchema.updateOne(
    clientToUpdate,
    { $push: { clients: newClient } },
    function (err, client) {
      if (err) {
        return res.status(400).send(err);
      }
      res.status(200).send({ message: "cliente adicionado!" });
    }
  );
};

const updateAmountSpent = async (req, res) => {
  // acessar a informação de qual documento atualizar
  const clientToUpdate = { name: "Luiza", "clients.name": req.body.name };
  // acessar informação do novo valor gasto
  const newAmountSpent = req.body.newAmountSpent * 1;

  userSchema.updateOne(
    clientToUpdate,
    {
      $set: {
        "clients.$.amountSpent": newAmountSpent,
      },
    },
    function (err, client) {
      if (err) {
        return res.status(400).send(err);
      }
      res.status(200).send({ message: "montante gasto atualizado!" });
    }
  );
};

const deleteClient = async (req, res) => {
  // acessar a informação de qual documento deletar
  const userToDelete = { name: "Luiza" };

  userSchema.updateMany(
    userToDelete,
    { $pull: { clients: req.body } },
    function (err, users) {
      if (err) {
        return res.status(400).send(err);
      }
      res.status(200).send("Usuário excluído");
    }
  );
};

module.exports = {
  createClient,
  updateAmountSpent,
  deleteClient,
};
