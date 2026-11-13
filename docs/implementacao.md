# Plano de Implementação

Objetivo: implementar a funcionalidade de gerenciamento de espécies no projeto web-data-viz conforme a especificação em especificacao.md. O plano abaixo descreve os arquivos a serem criados/alterados, componentes, fluxo, regras de negócio, decisões técnicas e um roteiro numerado de etapas com a forma de validar cada uma.

1) Resumo da solução

- Criar backend (rota, controller, model) para CRUD de espécies e filtros de pesquisa.
- Criar front-end (página na dashboard + JS) para cadastro, edição, exclusão, listagem e filtros.
- Persistir as espécies em uma nova tabela SQL com normalização de nomes para evitar duplicidade.
- Adicionar vínculo opcional entre espécie e aquário e garantir consistência de tipo (água doce / água salgada).

2) Arquivos a serem criados/alterados

- Criados (novos)
  - src/models/especieModel.js  — funções SQL para operações com espécies
  - src/controllers/especieController.js — validações e regras de negócio expostas pela API
  - src/routes/especies.js — roteador Express para endpoints de espécies
  - public/dashboard/especies.html — página da dashboard para gerenciar espécies
  - public/js/especies.js — frontend JS para chamadas à API, validação e renderização
  - src/database/migrations/001-create-especies.sql — script SQL para criar tabela e índices

- Alterados
  - app.js — registrar a nova rota (require + app.use('/especies', ...))
  - src/database/script-tabelas.sql — (opcional) adicionar DDL de exemplo para a nova tabela
  - src/database/script-tabelas.sql ou migration separado — adicionar alteração para coluna `tipo` em aquario (se for adotada)

3) Componentes e responsabilidades

- Rota (src/routes/especies.js)
  - Endpoints: GET /especies, GET /especies/:id, POST /especies, PUT /especies/:id, DELETE /especies/:id
  - Query params suportados: ?q=<texto>, ?tipo=agua-doce|agua-salgada, ?fk_aquario=<id>, ?limit, ?offset

- Controller (src/controllers/especieController.js)
  - Normalização de nome antes de gravar (função local normalizarNome)
  - Validações: campos obrigatórios, duplicidade, consistência entre espécie.tipo_aquario e aquario.tipo
  - Mensagens de sucesso/erro coerentes com padrão do projeto

- Model (src/models/especieModel.js)
  - Queries parametrizadas que recebem conexões do DB (padrão do projeto)
  - Funções: cadastrar, editar, excluir, buscarPorId, buscarComFiltros, verificarDuplicidade

- Front-end (public/dashboard/especies.html + public/js/especies.js)
  - Página com lista paginada, formulário de cadastro/edição, filtros por nome/tipo/aquario
  - Feedback visual (mensagens de sucesso/erro) seguindo padrões das outras abas da dashboard
  - Reuso de estilos existentes (public/css) para manter consistência visual

- Banco de Dados
  - Nova tabela `especie` (ou `especies`) com constraints e índice único em (fk_empresa, nome_normalizado)
  - Opcional: coluna `tipo` em tabela `aquario` para permitir validação cruzada (recomendado)

4) Esquema proposto (SQL)

- Tabela `especie` (exemplo):
  - id INT PK AUTO_INCREMENT
  - nome VARCHAR(150) NOT NULL
  - nome_normalizado VARCHAR(150) NOT NULL
  - tipo_aquario ENUM('agua-doce','agua-salgada') NOT NULL
  - caracteristicas TEXT NULL
  - fk_aquario INT NULL -- aquário onde a espécie está alocada (opcional)
  - fk_empresa INT NOT NULL -- manter por multi-empresa como padrão do projeto
  - created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  - updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
  - FOREIGN KEY (fk_aquario) REFERENCES aquario(id)
  - FOREIGN KEY (fk_empresa) REFERENCES empresa(id)
  - UNIQUE KEY ux_especie_empresa_nome_normalizado (fk_empresa, nome_normalizado)

- Alteração recomendada na tabela `aquario`:
  - adicionar coluna `tipo ENUM('agua-doce','agua-salgada') NOT NULL DEFAULT 'agua-doce'`
  - Racional: permite validar que uma espécie que exige água salgada não seja atribuída a um aquário de água doce

5) Regras de negócio (detalhadas)

- Ao cadastrar ou editar uma espécie:
  - `nome` é obrigatório
  - `tipo_aquario` é obrigatório e deve ser 'agua-doce' ou 'agua-salgada'
  - `nome` será normalizado (remover acentos, lowercase, substituir não-alfanum por hífen) e a verificação de duplicidade será feita usando `nome_normalizado` dentro da mesma empresa (fk_empresa)
  - Se informado `fk_aquario`, validar que o aquário existe, pertence à mesma empresa e tem `tipo` compatível com `tipo_aquario` da espécie; caso contrário rejeitar a operação com código 400 e mensagem explicativa

- Ao excluir:
  - Exclusão física (DELETE) é aceitável e a mais simples; documentar a possibilidade de soft-delete se for necessária no futuro

- Listagem e filtros:
  - Permitir busca por texto (q) que case com `nome` ou `caracteristicas`
  - Filtrar por `tipo_aquario` e por `fk_aquario`
  - Paginação por limit/offset

6) Decisões técnicas e justificativas

- Normalização de nomes: implementar função JS própria (sem dependências externas) para remover acentos e caracteres especiais. Evita adicionar novas bibliotecas (conforme restrição do projeto).
- Localização das validações: fazer validação básica no front-end (usabilidade) e validação obrigatória no controller (servidor). Controller é fonte de verdade.
- Migrations SQL: usar scripts SQL simples em src/database/migrations/ para que o mantenedor do BD execute (o projeto atual não usa um ORM/migrator). Evitar adicionar novas ferramentas de migração.
- Tipo de exclusão: hard delete por simplicidade. Se houver necessidade de histórico, migrar para soft-delete posteriormente.
- Consistência entre aquario.tipo e especie.tipo: exigir coluna `tipo` em aquario. Caso não seja possível modificar a tabela aquario, documentar uma validação alternativa (ex.: bloquear associação via UI e permitir somente manualmente com aviso).

7) Endpoints (contrato mínimo)

- GET /especies?empresaId=<id>&q=&tipo=&fk_aquario=&limit=&offset=
  - Retorna lista paginada com total

- GET /especies/:id
  - Retorna objeto da espécie

- POST /especies
  - Payload: { nome, tipo_aquario, caracteristicas?, fk_aquario?, empresaId }
  - Respostas: 201 created / 400 bad request / 409 conflito (duplicidade)

- PUT /especies/:id
  - Payload similar ao POST

- DELETE /especies/:id
  - 200 OK / 404 not found

8) Etapas numeradas de implementação e validação

1. Criar migration SQL e aplicar localmente
   - O que: criar arquivo src/database/migrations/001-create-especies.sql contendo DDL da tabela `especie` e, se acordado, alteração `ALTER TABLE aquario ADD COLUMN tipo ...`.
   - Validação: executar o script no banco de desenvolvimento e rodar `SHOW TABLES; DESCRIBE especie;` e `DESCRIBE aquario;` para confirmar colunas e índices

2. Implementar model (src/models/especieModel.js)
   - O que: funções SQL parametrizadas: cadastrar, editar, excluir, buscarPorId, buscarComFiltros, existePorNomeNormalizado
   - Validação: rodar pequenos scripts Node (ou usar REPL) chamando cada função contra DB de desenvolvimento e confirmar retorno esperado; inserir registros de teste e verificar leituras

3. Implementar controller (src/controllers/especieController.js)
   - O que: receber requisições, normalizar nome, aplicar validações de negócio, chamar model e formatar respostas (códigos e mensagens) seguindo padrão do projeto
   - Validação: usar Postman/curl para testar cenários
     - criar espécie válida -> 201 e registro no DB
     - criar espécie duplicada com variações de nome ('Peixe Dourado' vs 'peixe-dourado') -> 409 Conflito
     - criar espécie com fk_aquario incompatível -> 400 com mensagem explicativa

4. Implementar rotas (src/routes/especies.js) e registrar em app.js
   - O que: criar router Express que liga endpoints ao controller; adicionar require e app.use('/especies', ...) em app.js
   - Validação: iniciar servidor (npm run dev) e acessar endpoints básicos via curl: GET /especies deve retornar 200 e JSON (lista vazia inicialmente)

5. Implementar front-end (public/dashboard/especies.html + public/js/especies.js)
   - O que: página na dashboard com tabela/lista, formulário modal para criar/editar, filtros e botões de excluir; chamadas AJAX para endpoints
   - Validação: abrir a página na UI, criar/editar/excluir espécies; validar mensagens de sucesso/erro aparecem e as alterações são refletidas no frontend e no DB (verificar via interface de administração do BD)

6. Regras de UX e mensagens
   - O que: padronizar mensagens de sucesso/erro para seguir o padrão das outras abas do dashboard (mensagens compactas e informativas)
   - Validação: checar consistência visual e textos; confirmar no fluxo de criação/edição/exclusão que o usuário vê o feedback apropriado

7. Testes manuais e checklist de aceitação (critério de aceitação)
   - Criar registro com nome 'Peixe Dourado' -> sucesso
   - Tentar criar 'peixe-dourado' ou 'Peixe dourado' -> receber erro de duplicidade (409)
   - Editar nome para outra string normalizada diferente -> novo nome aceito
   - Atribuir espécie a aquário com tipo incompatível -> rejeitado
   - Filtrar por tipo/aquario/nome -> resultados corretos
   - Excluir espécie -> registro removido do banco e lista atualizada

8. Documentação e entrega
   - O que: atualizar README.md ou criar docs/README-especies.md com instruções de migração SQL, endpoints e exemplos de payloads
   - Validação: seguir o documento para executar migração e testar os endpoints com os exemplos fornecidos

9) Riscos, dependências e observações

- Dependência de schema: alteração na tabela aquario (adicionar campo tipo) exige coordenação com dados existentes — migração manual possivelmente necessária para atribuir tipos corretos aos aquários já cadastrados
- Não adicionar bibliotecas novas (ex.: slugify) para manter conformidade com regras do projeto. Implementar normalização simples em JS.
- Caso o projeto precise de histórico (rollback/versões de espécies), avaliar soft-delete e auditoria posteriormente

10) Sigla de execução mínima (tarefas concretas para um dev seguir)

1. Criar migration SQL em src/database/migrations/001-create-especies.sql
2. Implementar src/models/especieModel.js
3. Implementar src/controllers/especieController.js
4. Implementar src/routes/especies.js e registrar em app.js
5. Implementar front-end public/dashboard/especies.html e public/js/especies.js
6. Testes manuais conforme checklist de aceitação
7. Atualizar documentação (README ou docs)

Se desejar, posso gerar um esqueleto (arquivos vazios com comentários e TODOs) ou criar apenas o migration SQL como próximo passo. Não implementarei nada sem sua confirmação.
