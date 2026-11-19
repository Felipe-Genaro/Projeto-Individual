var database = require("../database/config")

function buscarMusica(musicas) {
    if (!Array.isArray(musicas) || musicas.length === 0) {
        return Promise.resolve([]);
    }

    const titulos = musicas
        .map(t => `'${t.replace(/\\/g, "\\\\").replace(/'/g, "\\'")}'`)
        .join(", ");

    const instrucao = `select titulo from musica where titulo in (${titulos});`;

    return database.executar(instrucao)
        .then(resultado => {
            const encontrados = resultado.map(r => r.titulo.toLowerCase());
            return musicas.filter(t => !encontrados.includes(t.toLowerCase()));
        });
}

function top7(fk_usuario, musicas) {
    console.log("MUSICA MODEL - top7():", fk_usuario, musicas);

    if (!fk_usuario || !Array.isArray(musicas) || musicas.length === 0) {
        return Promise.reject(new Error("Parâmetros inválidos para top7"));
    }



    const promises = [];

    for (let i = 0; i < musicas.length; i++) {
        const titulo = musicas[i].replace(/'/g, "\\'"); // escape simples apóstrofo
        const posicao = i + 1; 

        // quando existir uma música com o título informado, é registrado no banco de Dados.
        const instrucaoSql = `
            INSERT INTO podium (fk_usuario, posicao, fk_musica)
            SELECT ${fk_usuario}, ${posicao}, m.id FROM musica m WHERE m.titulo = '${titulo}';
        `;

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        promises.push(database.executar(instrucaoSql));
    }

    return Promise.all(promises);
}

function buscarTop7PorUsuario(fk_usuario) {
    if (!fk_usuario) {
        return Promise.reject(new Error('fk_usuario indefinido'))
    }
    var instrucao = `
        select 
        p.posicao,
        m.titulo
        from podium p
            left join musica m 
                on p.fk_musica = m.id
        where p.fk_usuario = ${fk_usuario}
        order by p.posicao;
    `
    return database.executar(instrucao)
    .then(function (resultado) {
        const top7 = new Array(7).fill('')
        resultado.forEach(row => {
            const pos = Number(row.posicao)
            if (!isNaN(pos) && pos >= 1 && pos <= 7) {
                top7[pos - 1] = row.titulo || ''
            }
        });
        return top7
    })
    
}

module.exports = {
    top7,
    buscarTop7PorUsuario,
    buscarMusica
};
