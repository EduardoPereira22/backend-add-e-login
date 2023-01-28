const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");
const authController = require("../controllers/authController");
const clientController = require("../controllers/clientsControllers");

router.get("/all", userController.getAll);
router.post("/create", userController.createUser);
router.post("/login", authController.login);
router.delete("/deleteAll", userController.deleteAll);
router.delete("/deleteUser", userController.deleteUser);
router.patch("/changePassword", userController.updatePassword);

router.patch("/updateAmountSpent", clientController.updateAmountSpent);
router.patch("/createClient", clientController.createClient);
router.delete("/deleteClient", clientController.deleteClient);

module.exports = router;
