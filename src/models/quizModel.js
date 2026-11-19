var database = require("../database/config");

function cadastrarResposta(acertos,erros, fk_usuario) {
    if (!fk_usuario) {
        return Promise.reject(new Error('fk_usuario indefinido'))
    }
    acertos = parseInt(acertos) || 0
    erros = parseInt(erros) || 0

    var instrucao = `
        insert into quiz (acertos, erros, fk_usuario) values
        (${acertos}, ${erros}, ${fk_usuario});
    `

    console.log("QUIZ MODEL - Cadastrando a resposta ", instrucao);
    return database.executar(instrucao);
}

function contarTentativasPorUsuario(fk_usuario) {
    var instrucao = `select
                        count(*) 'Quantidade de tentativas'
                        from quiz
                            where fk_usuario = ${fk_usuario};`
    return database.executar(instrucao)
}

module.exports = {
    cadastrarResposta,
    contarTentativasPorUsuario
}
