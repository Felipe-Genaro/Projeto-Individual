var express = require("express")
var Router = express.Router()
var dashController = require("../controllers/dashboardController")

// KPI 1
Router.get("/kpi1NomeMusica", function (req, res) {
    dashController.NomeMusicas(req, res)
})

Router.get("/kpi1VezesTop3", function (req, res) {
    dashController.QntDeVezesNoTop3(req, res)
})

// KPI 2
Router.get("/kpi2MusicaComMaiorPontuacao", function (req, res) {
    dashController.MusicaComMaiorPontuacao(req, res)
})

Router.get("/kpi2NomeMusicaComMaiorPontuacao", function (req, res) {
    dashController.NomeMusicaComMaiorPontuacao(req, res)
})

// KPI 3
Router.get("/kpi3QuantideDeParticipantes", function (req, res) {
    dashController.QuantideDeParticipantes(req, res)
})

module.exports = Router