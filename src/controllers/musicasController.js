var musicaModel = require("../models/musicaModel");


function autenticarMusica(req, res) {
    var musica = req.body.musicaServer;
    var posicao = req.body.posicaoServer;

    if (musica == undefined) {
        res.status(400).send("A música está undefined!");
    } else if (posicao == undefined) {
        res.status(400).send("A posição está undefined!");
    } else {

        musicaModel.autenticarMusica(musica, posicao)
            .then(
                function (resultadoAutenticarMusica) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticarMusica.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticarMusica)}`); // transforma JSON em String

                    if (resultadoAutenticarMusica.length == 1) {
                        const usuario = resultadoAutenticarMusica[0]
                        console.log(resultadoAutenticarMusica);

                        return res.status(200).json(usuario)

                        
                    } else if (resultadoAutenticarMusica.length == 0) {
                        res.status(403).send("Música ou Posição inválida inválido(s)");
                    } else {
                        res.status(403).send("Mais de uma música ou posição com o mesmo valor!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}


function top7(req, res) {
    var musicas = req.body.musicas;
    var fk_usuario = req.body.idUsuario;

    if (!Array.isArray(musicas) || musicas.length === 0) {
        res.status(400).send("O array de músicas está inválido ou vazio!");
        return;
    }

    if (fk_usuario == undefined) {
        res.status(400).send("O id do usuário (idUsuario) está undefined!");
        return;
    }
    
    musicaModel.buscarMusica(musicas)
    .then(function (naoEncontradas) {
        if (naoEncontradas.length > 0) {
            return res.status(404).json({
                erro: "Alguma música que você escolheu não está na lista !", naoEncontradas : naoEncontradas
            })
        }
        
        return musicaModel.top7(fk_usuario,musicas)
        .then(function (resultado) {
            res.json({ mensagem: "Top7 cadastrado com sucesso", resultado: resultado });
        })
    })
    .catch(function (erro) {
        console.log(erro);
        console.log("\nHouve um erro ao realizar o envio do pódio! Erro: ", erro.sqlMessage || erro.message);
        res.status(500).json(erro.sqlMessage || erro.message);
    });
}

function obterTop7(req, res) {
    const fk_usuario = req.query.idUsuario || req.params.idUsuario;
    if (!fk_usuario) {
        res.status(400).send('idUsuario undefined !')
        return
    }
    musicaModel.buscarTop7PorUsuario(fk_usuario)
    .then(top7 => res.status(200).json({top7}))
    .catch(erro =>{
        console.error(erro)
        res.status(500).json({erro: erro.message || erro})
    })
}

module.exports = {
    autenticarMusica,
    top7,
    obterTop7
}
