const express = require("express");
const router = express.Router();
const ThoughtsController = require("../controllers/ThoughtsController")

//helpers
const checkAuth = require('../helpers/auth').checkAuth

router.get("/add", checkAuth, ThoughtsController.createThought);
router.post("/add", checkAuth, ThoughtsController.createThoughtSave);
router.get("/edit/:id", checkAuth, ThoughtsController.updateThought);
router.post("/edit", checkAuth, ThoughtsController.updateThoughtSave);
router.get("/dashboard", checkAuth, ThoughtsController.dashboard);
router.post("/remove", checkAuth, ThoughtsController.removeThought);
router.get("/", ThoughtsController.showThoughts);

module.exports = router;
