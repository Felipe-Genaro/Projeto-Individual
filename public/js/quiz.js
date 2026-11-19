function enviarResultadoQuiz(acertos,erros, duracaoMs) {
    var idUsuario = sessionStorage.ID_USUARIO

    if (!idUsuario) {
        alert("Usuário não encontrado, faça seu login!")
        return
    }
    
    fetch("/quiz",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            acertosServer: acertos,
            errosServer: erros,
            fkUsuarioServer: idUsuario
            //duracaoMsServer: duracaoMs --------> ADICIONAR PARA VER O TEMPO QUE AS PESSOAS DEMORAM PARA RESPONDER
        })
    }).then(function (res) {
        if (res.ok) {
            return res.json();            
        }else{
            return res.text().then(function (t) {
                throw new Error (t)
            })
        }       
    }).then(function (json) {
        console.log("Resultado Gravado", json)  
        //Mostrar para jogar novamente
        mostrarTelaResultado(acertos,erros)      
    }).catch(function (erro) {
        console.error("Erro ao enviar o Quiz:", erro)  
        alert("Erro ao registrar resultado!")      
    })
}
