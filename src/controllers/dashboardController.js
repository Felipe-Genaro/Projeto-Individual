var dashboardModel = require("../models/dashboardModels");


// KPI 1
function NomeMusicas(req, res) {

    dashboardModel.kpi1NomeMusicaMaisApareceuNoTop3().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar o nome da música que mais apareceu no top3.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function QntDeVezesNoTop3(req, res) {

    dashboardModel.kpi1QntDeVezesNoTop3().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar a quantidade de viezes que a música apareceu no top3.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}



// KPI 2
function NomeMusicaComMaiorPontuacao(req, res) {

    dashboardModel.kpi2MusicaMaiorPontuacao().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar a musica com maior pontuação.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function MusicaComMaiorPontuacao(req, res) {

    dashboardModel.kpi2PontuacaoDaMusica().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar a pontuação sa música.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

// KPI 3

function QuantideDeParticipantes(req, res) {

    dashboardModel.kpi3QntDeParticipantes().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar a quantidade de respostas que teve no formulário.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function graficoPontuacao(req, res) {
    dashboardModel.grafico1Pontuacao().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as informações para o gráfico de Pontuação geral.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    // 1ª KPI
    NomeMusicas,
    QntDeVezesNoTop3,
    // 2ª KPI
    NomeMusicaComMaiorPontuacao,
    MusicaComMaiorPontuacao,
    //3ª KPI
    QuantideDeParticipantes,
    // Gráfico Pontuação dos 8 melhores avaliados
    graficoPontuacao
}