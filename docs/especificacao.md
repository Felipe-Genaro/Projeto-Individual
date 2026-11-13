# Titulo do documento

## 1. Contexto
 
O projeto web-data-viz encontrou um problema pois ele opera com dois tipos de aquários que são de Agua Doce ou de Agua Salgada. Cada aquário tem suas respectivas espécies que habitam nele, e não pode ocorrer de peixes estarem em aquários inadequados para garantir o bem-estar dos peixes.

Essas informações sobre as espécies estão organizadas em forma de planilhas e gostaria de montar um sistema para neutralizar esses problemas que são eles:
- **Diferentes Espécies cadastradas com os mesmos nomes** 
- **Espécies associadas a aquarios que não são os corretos**
- **Falta de flexibilidade na visualização das espécies e nos filtros por carácteristicas**
## 2. Objetivo


O Objetivo da produção desse sistema seria facilitar, automatizar e garantir que os processos vão ser feitos corretamente, evitando perda de espécies por uma má organização das informações e falta de praticidade na visualização das informações cadastradas.

## 3. Escopo


- **Dentro do escopo:** funcionalidades e recursos que serão implementados.

    **Diferentes Espécies cadastradas com os mesmos nomes:** Evitar duplicidade e verificar se aquela espécie foi cadastrada mesmo de forma diferente. (Ex: 'Peixe Dourado', 'peixe-dourado' 'Peixe dourado') São formatos diferentes de informar a mesma espécie.
    
    **Espécies associadas a aquarios que não são os corretos** Para evitar que espécies sejão enviadas para um tipo de aquário inadequado para ela, evitando assim prejuizos e perda de qualidade na vida do animal

    **Falta de flexibilidade na visualização das espécies e nos filtros por carácteristicas** Fazer com que seja mais maleável a visualização das informações e facilite na busca por informações especificas como: buscas por espécie/tipo/nome para validar se foi cadastrado ou não no sistema. Deve ter também uma função para informar sobre os aquários também, contendo opções como: Capacidade dentro do aquário, tamanho do aquário.

    **Especificação da Espécie e em qual aquário será transferido**Informar corretamente em qual aquário será inserido a espécie para que quando for análisar aparecer corretamente em qual aquário está localizado



- **Fora do escopo:** funcionalidades e recursos que não serão contemplados.
    **Repitir funcoes que já tem no projeto**

## 4. Funcionalidades


- **cadastrar espécies**
- **definir o tipo de aquário da espécie**
- **criar filtros por carácteristicas importantes como por aquário ou espécie**
- **deixar informações sempre atualizadas**

## 5. Regras de negócio

- **Deixe campos para editar as informações cadastradas**
- **Não deixar informações duplicadas serem registradas**
- **Botões para editou ou excluir os registros**
- **deixar simples e expecifico**


## 6. Interface

Siga o padrão do modelo que já está feito no projeto até o momento nas outras abas da dashboard.

## 7. Critérios de aceitação

Defina condições objetivas para verificar se as funcionalidades foram implementadas corretamente.

- **Cadastro realizado com sucesso** Quando as informações for inserida sem nenhum erro ou duplicidade
- **mensagem quando a edição for feita corretamente** Mostrar que não ouve nenhum problema se as informações forem editadas corretamente
- **mensagem quando a exclusão for feita corretamente** Mostrar que não ouve nenhum problema se as informações foram excluidas corretamente
