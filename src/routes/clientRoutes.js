const express = require("express");
const router = express.Router();
const controller = require("../controllers/clientControllers");

router.get("/all", controller.getAll);
router.post("/create", controller.createClient);
router.patch("/updateAmountSpent", controller.updateAmountSpent);

module.exports = router;
