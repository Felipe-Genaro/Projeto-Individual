var express = require("express");
var router = express.Router();

var musicasController = require("../controllers/musicasController");

router.post("/top7", function (req, res) {
    musicasController.top7(req, res);
})

router.get("/top7", function (req, res) {
    musicasController.obterTop7(req, res);
})

module.exports = router;
