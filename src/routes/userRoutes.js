const express = require("express")
const router = express.Router()
const controller = require("../controllers/userControllers");
const authController = require("../controllers/authController")

 
router.get("/all", controller.getAll);
router.post("/create", controller.createUser)
router.post("/login", authController.login)

//router.post("/create", controller.createUsernp)


module.exports = router;