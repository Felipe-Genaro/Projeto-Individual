var dashboardModel = require("../models/dashboardModels");


// KPI 1
function NomeMusicas(req, res) {

    dashboardModel.kpi1NomeMusicaMaisApareceuNoTop3().then(function (resultado) {
        if (resultado && resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            // sempre retornar JSON consistente (array vazio) para o frontend
            res.status(200).json([]);
        }
    }).catch(function (erro) {
        console.error("Houve um erro ao buscar o nome da música que mais apareceu no top3.", erro);
        res.status(500).json({ error: erro.sqlMessage || erro.message || erro });
    });
}

function QntDeVezesNoTop3(req, res) {

    dashboardModel.kpi1QntDeVezesNoTop3().then(function (resultado) {
        if (resultado && resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(200).json([]);
        }
    }).catch(function (erro) {
        console.error("Houve um erro ao buscar a quantidade de viezes que a música apareceu no top3.", erro);
        res.status(500).json({ error: erro.sqlMessage || erro.message || erro });
    });
}



// KPI 2
function NomeMusicaComMaiorPontuacao(req, res) {

    dashboardModel.kpi2MusicaMaiorPontuacao().then(function (resultado) {
        if (resultado && resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(200).json([]);
        }
    }).catch(function (erro) {
        console.error("Houve um erro ao buscar a musica com maior pontuação.", erro);
        res.status(500).json({ error: erro.sqlMessage || erro.message || erro });
    });
}

function MusicaComMaiorPontuacao(req, res) {

    dashboardModel.kpi2PontuacaoDaMusica().then(function (resultado) {
        if (resultado && resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(200).json([]);
        }
    }).catch(function (erro) {
        console.error("Houve um erro ao buscar a pontuação da música.", erro);
        res.status(500).json({ error: erro.sqlMessage || erro.message || erro });
    });
}

// KPI 3

function QuantideDeParticipantes(req, res) {

    dashboardModel.kpi3QntDeParticipantes().then(function (resultado) {
        if (resultado && resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(200).json([]);
        }
    }).catch(function (erro) {
        console.error("Houve um erro ao buscar a quantidade de respostas que teve no formulário.", erro);
        res.status(500).json({ error: erro.sqlMessage || erro.message || erro });
    });
}

// KPI 4 
function mediaDeAcertos(req, res) {

    dashboardModel.kpi4MediaAcertos().then(function (resultado) {
        if (resultado && resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(200).json([]);
        }
    }).catch(function (erro) {
        console.error("Houve um erro ao buscar a média de acertos do QUIZ.", erro);
        res.status(500).json({ error: erro.sqlMessage || erro.message || erro });
    });
}


function graficoPontuacao(req, res) {
    dashboardModel.grafico1Pontuacao().then(function (resultado) {
        if (resultado && resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(200).json([]);
        }
    }).catch(function (erro) {
        console.error("Houve um erro ao buscar as informações para o gráfico de Pontuação geral.", erro);
        res.status(500).json({ error: erro.sqlMessage || erro.message || erro });
    });
}

function graficoTop3(req, res) {
    dashboardModel.grafico2Ranking().then(function (resultado) {
        if (resultado && resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(200).json([]);
        }
    }).catch(function (erro) {
        console.error("Houve um erro ao buscar as informações para o gráfico do Ranking top 3.", erro);
        res.status(500).json({ error: erro.sqlMessage || erro.message || erro });
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
    //4ª KPI 
    mediaDeAcertos,
    // Gráfico Pontuação dos 8 melhores avaliados
    graficoPontuacao,
    graficoTop3
}
