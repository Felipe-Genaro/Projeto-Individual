var database = require("../database/config")

// COLOCAR OS DADOS DE CADA FUNÇÕES NA KPI

//KPI 1 ----------------------------------------------
// Nome das Músicas
function kpi1NomeMusicaMaisApareceuNoTop3() {
    var instrucaoSql = `select Nome_da_musica from vw_musicas_top3;`
    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

// Quantidade de Vezes que a música mais esteve presente
function kpi1QntDeVezesNoTop3() {
    var instrucaoSql = `select Quantidade_de_vezes_no_top3 from vw_musicas_top3;`
    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

// KPI 2 ---------------------------------------------
// Música com maior pontuação
function kpi2MusicaMaiorPontuacao() {
    var instrucaoSql = `select nome_musica from vw_musica_pontuacao;`
    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

// Total de pontos
function kpi2PontuacaoDaMusica() {
    var instrucaoSql = `select pontos from vw_musica_pontuacao;`
    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}


// KPI 3 ---------------------------------------------
function kpi3QntDeParticipantes() {
    var instrucaoSql = `select * from vw_kpi3_respostas;`
    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

// KPI 4 ----------------------------------------------
function kpi4MediaAcertos() {
    var instrucaoSql = `select * from vw_kpi4_media_acertos;`
    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

function grafico1Pontuacao() {
    var instrucaoSql = `select * from vw_ranking_musicas;`
    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

function grafico2Ranking() {
    var instrucaoSql = `
        select  Nome_da_musica, 
                Primeiro, 
                Segundo, 
                Terceiro, 
                Total_top3
            from vw_grafico_top3
            order by Total_top3 desc, Primeiro desc
            limit 6;`
    console.log("Executando a instrução SQL: \n "+ instrucaoSql)
    return database.executar(instrucaoSql)
} 

module.exports = {
    // 1ª KPI
    kpi1NomeMusicaMaisApareceuNoTop3,
    kpi1QntDeVezesNoTop3,
    // 2ª KPI
    kpi2MusicaMaiorPontuacao,
    kpi2PontuacaoDaMusica,
    //3ª KPI
    kpi3QntDeParticipantes,
    //4ª KPI 
    kpi4MediaAcertos,
    // Gráfico Ranking de pontuação
    grafico1Pontuacao,
    grafico2Ranking
}