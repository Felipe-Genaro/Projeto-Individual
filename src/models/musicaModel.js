var database = require("../database/config")

function autenticarMusica(params) {
    
}

function top7(posicao, fk_musica) {
    console.log("ACHEI O MÚSICA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function top7():",posicao, fk_musica);

     var instrucaoSql = `
            INSERT INTO podio (fk_usuario, posicao, fk_musica) VALUES ('${fk_usuario}', '${posicao}', '${fk_musica}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticarMusica,
    top7
};