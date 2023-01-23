const userSchema = require("../models/userSchema");

// const createClient = async (req, res) => {
//   // acessar nome que vem na requisição
//   const name = req.body.name;
//   // procurar se existe o nome no banco
//   const currentClient = await clientSchema.findOne({ name: name });
//   if (currentClient) {
//     return res.status(500).send("Cliente já existe");
//   }
//   try {
//     const newClient = new clientSchema(req.body);
//     const savedClient = await newClient.save();
//     res.status(201).json({ message: "Cliente adicionado!", savedClient });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

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

module.exports = {
  updateAmountSpent,
};
