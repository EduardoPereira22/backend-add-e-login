const express = require("express");
const router = express.Router();
const controller = require("../controllers/userControllers");
const authController = require("../controllers/authController");
 
router.get("/all", controller.getAll);
router.post("/create", controller.createUser);
router.post("/login", authController.login);
router.delete("/deleteAll", controller.deleteAll);
router.delete("/deleteUser", controller.deleteUser);
router.patch("/changePassword", controller.updatePassword);

module.exports = router;