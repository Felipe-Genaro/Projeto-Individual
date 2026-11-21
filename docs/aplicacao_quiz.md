# Aplicação do Quiz — Implementação e explicação passo a passo

Este documento descreve como os resultados do quiz devem ser coletados no front-end e persistidos no banco de dados seguindo as convenções do projeto.

1. Visão geral

- Quando o usuário finalizar o quiz, o front-end deve calcular: acertos, erros (e opcionalmente duração).
- O front-end obtém o id do usuário em `sessionStorage.ID_USUARIO` (padrão do projeto).
- O front-end envia um POST para o backend em `/quiz` com um payload JSON contendo os campos necessários.
- O backend (controller) valida os dados e chama o model para inserir no banco de dados.

2. Esquema recomendado no banco (opção recomendada)

É preferível criar uma tabela de tentativas (histórico) para cada tentativa do usuário:

```sql
CREATE TABLE quiz_attempt (
  id INT PRIMARY KEY AUTO_INCREMENT,
  fk_usuario INT NOT NULL,
  acertos INT NOT NULL,
  erros INT NOT NULL,
  data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
  duracao_ms INT NULL,
  CONSTRAINT fk_quizattempt_usuario FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);
```

Alternativa: usar a tabela `quiz` que já existe no projeto (ela tem `acertos`, `erros`, `fk_usuario`). Se usar `quiz` atual, insira uma linha por tentativa (mantendo histórico) ou ajuste conforme a modelagem desejada.

3. Arquivos a criar/implementar (local e responsabilidade)

- src/models/quizModel.js — funções SQL para persistência (usar `database.executar(instrucaoSql)`).
- src/controllers/quizController.js — validações e envio de respostas (padrão do projeto: mensagens e códigos HTTP).
- src/routes/quiz.js — roteador Express, expondo POST /quiz (e GET se desejar consultar resultados).
- public/js/quiz.js — funções do front-end que calculam resultados e fazem `fetch` para a API.
- app.js — (alteração opcional) registrar a rota: `app.use('/quiz', require('./src/routes/quiz'))`.

4. Contrato (payload e rota)

- Endpoint: POST /quiz
- Content-Type: application/json
- Payload (exemplo):

```json
{
  "acertosServer": 8,
  "errosServer": 2,
  "fkUsuarioServer": 1,
  "duracaoMsServer": 12345
}
```

- Resposta: 201 Created com o resultado do INSERT (ou 400/500 conforme erro).

5. Exemplo de implementação (padrão do projeto)

- Model (exemplo resumido):

```js
var database = require('../database/config');

function cadastrarResposta(acertos, erros, fk_usuario, duracaoMs) {
  acertos = parseInt(acertos) || 0;
  erros = parseInt(erros) || 0;
  duracaoMs = duracaoMs != null ? parseInt(duracaoMs) : null;

  var duracaoCampo = duracaoMs !== null ? `, ${duracaoMs}` : ', null';

  var instrucao = `INSERT INTO quiz (acertos, erros, fk_usuario) VALUES (${acertos}, ${erros}, ${fk_usuario});`;
  // Se usar quiz_attempt, altere o INSERT para a tabela nova
  return database.executar(instrucao);
}

module.exports = { cadastrarResposta };
```

- Controller (resumo): validar `fkUsuarioServer`, `acertosServer` e `errosServer`, e chamar `quizModel.cadastrarResposta`.

- Route: `POST /quiz` que chama `quizController.cadastrar`.

- Front-end: função `enviarResultadoQuiz(acertos, erros, duracaoMs)` que faz `fetch('/quiz', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ acertosServer: acertos, errosServer: erros, fkUsuarioServer: idUsuario, duracaoMsServer: duracaoMs }) })`.

6. Onde e o que alterar no index.html (passos e trechos de código)

Observação: não altere nada até revisar. Abaixo há recomendações do que inserir em `public/index.html` (ou no arquivo onde o quiz está implementado). Eu não editei esse arquivo — aplique as mudanças quando autorizar.

- 1) Incluir o script do front-end do quiz

Insira a linha abaixo próximo ao final do `body`, antes da tag `</body>` (após quaisquer outros scripts):

```html
<script src="/js/quiz.js"></script>
```

- 2) Chamar a função de envio ao finalizar o quiz

No código do quiz (função que roda quando o usuário finaliza o questionário), adicione a chamada para enviar os resultados. Exemplo (adaptar nomes das variáveis à sua implementação atual):

```html
<script>
  // Exemplo: supondo que ao finalizar você calcula acertos e erros
  function finalizarQuiz() {
    var acertos = calcularAcertos(); // sua função existente
    var erros = calcularErros();     // sua função existente
    var duracaoMs = calcularDuracao(); // opcional

    // envia para o backend (arquivo public/js/quiz.js deve conter enviarResultadoQuiz)
    enviarResultadoQuiz(acertos, erros, duracaoMs);

    // atualizar UI local (mostrar resultado, botão jogar novamente, etc.)
    mostrarTelaResultado(acertos, erros);
  }
</script>
```

- 3) Verificar sessão do usuário

Antes de enviar, garanta que `sessionStorage.ID_USUARIO` exista. Se não existir, redirecione para login ou mostre mensagem. Exemplo dentro de `enviarResultadoQuiz`:

```js
var idUsuario = sessionStorage.ID_USUARIO;
if (!idUsuario) { alert('Faça login antes de enviar o resultado'); return; }
```

- 4) IDs/elementos de UI

Se sua interface mostrar um botão finalizar ou área de resultado, não é estritamente necessário alterar o HTML além de inserir o script e chamar a função de envio no ponto correto. Caso ainda não exista um botão ou container para resultado, crie um elemento (por exemplo, `<div id="quiz_resultado"></div>`) para exibir feedback ao usuário.

7. Testes (manuais)

- Com servidor rodando (npm run dev), finalize um quiz e verifique no console do navegador se o POST foi realizado com sucesso.
- Use o MySQL Workbench / CLI para confirmar que os registros foram persistidos: `SELECT * FROM quiz WHERE fk_usuario = <id> ORDER BY id DESC LIMIT 5;` (ou na tabela `quiz_attempt` se criada).

8. Boas práticas e observações

- O estilo do projeto atual utiliza concatenação de SQL via template strings. Para evitar SQL injection, prefira validar/parsear campos numéricos antes de inserir (ex.: `parseInt`) e escape strings se inseri-las.
- Em produção, valide a autoria do `fk_usuario` no backend (por exemplo, associando o id ao token/sessão) para evitar envios falsos.
- Documente as alterações no README ou em docs para que outros desenvolvedores conheçam o contrato do endpoint.

9. Próximos passos sugeridos (opções)

1. Eu posso gerar os arquivos de código (`src/models/quizModel.js`, `src/controllers/quizController.js`, `src/routes/quiz.js`, `public/js/quiz.js`) e abrir um PR/local commit — preciso da sua autorização para modificar o repositório.
2. Se preferir, você pode aplicar apenas o arquivo de documentação que eu criei aqui e depois me autorizar as implementações de código.

----

Arquivo criado automaticamente por instrução do colaborador. Não foi feita nenhuma alteração em outros arquivos do projeto.
