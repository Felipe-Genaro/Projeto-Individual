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
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var musica = req.body.musicaServer;
    var posicao = req.body.posicaoServer;

    // Faça as validações dos valores
    if (musica == undefined) {
        res.status(400).send("A música está undefined!");
    } else if (posicao == undefined) {
        res.status(400).send("A posição está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        musicaModel.cadastrar(musica, posicao)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o envio do pódio! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    autenticarMusica,
    top7
}