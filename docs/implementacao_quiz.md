# Plano de Implementação

Objetivo: implementar a funcionalidade de quando o usuário terminar de responder o quiz, as informações serem direcionadas para o banco de dados contendo o id da pessoa, quantidade de erros e acertos e quantidade de tentativas pelo id que foi realizado o quiz.

1) Resumo da solução

- Criar backend (rota, controller, model) para CRUD das respostas no quiz presente no home.
- Conectar as informações do quiz que foi respondido no MySQL e qual foi o responsavel por responder aquele questionário

2) Arquivos a serem criados/alterados

- Criados (novos)
  - src/models/quizModel.js  — funções SQL para operações com espécies
  - src/controllers/quizController.js — validações e regras de negócio expostas pela API
  - src/routes/quiz.js — roteador Express para endpoints de espécies
  - public/js/quiz.js — frontend JS para chamadas à API, validação e renderização

- Alterados
  - app.js — registrar a nova rota (require + app.use('/quiz', ...))

3) Componentes e responsabilidades

- Rota (src/routes/especies.js)
  - Endpoints: GET /quiz, GET /quiz/:id, POST /quiz, PUT /quiz/:id

- Controller (src/controllers/quizController.js)
  - Validações: Verificar se foi finalizado o quiz, se foi deixado no meio não enviar diretamente ao banco de dados
  - Mensagens de sucesso/erro se ocorrer tudo corretamente no registro do quiz do usuário

- Model (src/models/quizModel.js)
  - Queries parametrizadas que recebem conexões do DB (padrão do projeto)
  - Funções: cadastrar respostas do quiz, buscarPorId, verificarSeFoiFinalizado

- Banco de Dados
  - Use a tabela `quiz` que contem constraints e índice único em (fk_usuario) para puxar a informação de quem foi a resposta e regostrar na coluna `acertos` a quantidade de acertos, e em `erros` as que não foram corretamente. 

4) Regras de negócio (detalhadas)

- Ao cadastrar uma resposta do quiz:
  - `fk_usuario` é obrigatório para reconhecer de quem foi a resposta
  - `acertos` é obrigatório para contabilizar a quantidade de acertos
  - `erros` é obrigatório para contabilizar a quantidade de erros

5) Decisões técnicas e justificativas

- Normalização de nomes: implementar função JS própria (sem dependências externas) para remover acentos e caracteres especiais. Evita adicionar novas bibliotecas (conforme restrição do projeto).
- Localização das validações: fazer validação básica no front-end (usabilidade) e validação obrigatória no controller (servidor). Controller é fonte de verdade.

6) Endpoints (contrato mínimo)

- GET /quiz?quizId=<id>&q=&tipo=&fk_usuario=&limit=&offset=
  - Retorna lista paginada com total

- GET /quiz/:id
  - Retorna objeto do quiz

- POST /quiz
  - Payload: { acertos, erros, fk_usuario?}
  - Respostas: 201 created / 400 bad request / 409 conflito (duplicidade)

- PUT /quiz/:id
  - Payload similar ao POST

- DELETE /quiz/:id
  - 200 OK / 404 not found

7) Etapas numeradas de implementação e validação

1. Implementar model (src/models/quizModel.js)
   - O que: funções SQL parametrizadas: cadastrar, buscarPorId
   - Validação: rodar pequenos scripts Node (ou usar REPL) chamando cada função contra DB de desenvolvimento e confirmar retorno esperado; inserir registros de teste e verificar leituras

2. Implementar controller (src/controllers/quizController.js)
   - O que: receber requisições, normalizar nome, aplicar validações de negócio, chamar model e formatar respostas (códigos e mensagens) seguindo padrão do projeto
   - Validação: usar Postman/curl para testar cenários
     - cadastrar resposta -> 201 e registro no DB
     - criar resposta do quiz com fk_usuario incompatível -> 400 com mensagem explicativa

3. Implementar rotas (src/routes/quiz.js) e registrar em app.js
   - O que: criar router Express que liga endpoints ao controller; adicionar require e app.use('/quiz', ...) em app.js
   - Validação: iniciar servidor (npm run dev) e acessar endpoints básicos via curl: GET /quiz deve retornar 200 e JSON (lista vazia inicialmente)

4. Regras de UX e mensagens
   - O que: padronizar mensagens de sucesso/erro para seguir o padrão das outras abas (mensagens compactas e informativas se a resposta for eenviada corretamente)
   - Validação: checar consistência visual e textos

5. Documentação e entrega
   - O que: atualizar README.md ou criar docs/README-quiz.md com instruções de endpoints e exemplos de payloads e como vai ser aplicado
   - Validação: seguir o documento para executar migração e testar os endpoints com os exemplos fornecidos

8) Riscos, dependências e observações

- Dependência de schema: alteração na tabela quiz (adicionar campo tipo) exige coordenação com dados existentes — migração manual possivelmente necessária para atribuir os tipos de forma correta
- Não adicionar bibliotecas novas (ex.: slugify) para manter conformidade com regras do projeto. Implementar normalização simples em JS.
- Caso o projeto precise de histórico (rollback/versões de espécies), avaliar soft-delete e auditoria posteriormente

9) Sigla de execução mínima (tarefas concretas para um dev seguir)

1. Acessar src/database/script-tabelas.sql para ver o que foi realizado até o momento
2. montar o src/models/quizModel.js 
3. montar o src/controllers/quizController.js
4. montar o src/routes/quiz.js e registrar em app.js
5. montar o public/js/quiz.js
6. Testes manuais conforme checklist de aceitação
7. Atualizar documentação (README ou docs)