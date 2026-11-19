var express = require("express")
var Router = express.Router()
var quizController = require("../controllers/quizController")

Router.post("/", function (req, res) {
    quizController.cadastrar(req,res)
})

module.exports = Router