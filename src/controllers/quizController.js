var quizModel = require ("../models/quizModel")

function cadastrar(req, res) {
    var acertos = req.body.acertosServer
    var erros = req.body.errosServer
    var fkUsuario = req.body.fkUsuarioServer

    if (fkUsuario == undefined) {
        res.status(400).send("fkUsuario está undefined!")
        return
    }
    if (acertos == undefined || erros == undefined) {
        res.status(400).send("Acertos e/ou erros está undefined!")
        return
    }

    // Validação que o quiz foi finalizado pelo usuário
    quizModel.cadastrarResposta(acertos, erros, fkUsuario)
        .then(function (resultado) {
            res.status(201).json(resultado)
        }).catch(function (erro) {
            console.log(erro)
            console.log("Houve um erro ao cadastrar o resultado do quiz! Erro: ", erro.sqlMessage)
            res.status(500).json(erro.sqlMessage)
        })
}

module.exports = {
    cadastrar
}