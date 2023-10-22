## Projeto de Compras de Produtos com Vue.js e Quasar ##
Este projeto é uma aplicação de compras de produtos desenvolvida usando Vue.js e o framework Quasar. A aplicação consome APIs por meio do Axios e é testada usando o Cypress.

## Pré-requisitos
Certifique-se de que você tenha as seguintes versões instaladas:

Node.js: 16.14.2
NPM: 8.6.0 ou Yarn: 1.22.18
Configuração do Projeto
Instale o servidor JSON usando o seguinte comando:

npm install -g json-server
Inicie o servidor JSON para fornecer os dados de exemplo. O arquivo data.json contém os dados simulados.

json-server --watch data.json
Executando o Projeto
Para executar o projeto, utilize o seguinte comando:

quasar dev
Isso iniciará o servidor de desenvolvimento.

Executando Testes
Para executar os testes E2E com o Cypress, siga as etapas abaixo:

Abra o Cypress usando o seguinte comando:

npx cypress open
Selecione "E2E Testing" na lista de testes disponíveis.

Escolha seu navegador preferido.

Clique em "Start E2E Testing in 'SEU NAVEGADOR'".

Os testes estão localizados na seção "Specs".

### Vue Router
Este projeto utiliza o Vue Router para a navegação de rotas. O Vue Router é uma biblioteca que permite criar rotas e navegar entre diferentes páginas em um aplicativo Vue.js de forma simples e eficaz.
Configuração e definição de rotas podem ser encontradas nos arquivos relacionados ao Vue Router neste projeto.

## Teste Cypress
O teste "Loginfish" e "Register Finish" realizam o fluxo completo de login e registro.
Observe que este projeto foca principalmente no desenvolvimento da interface do usuário, e questões de segurança não foram priorizadas. Para autenticar um usuário, a aplicação faz uma verificação simples no JSON para validar o CPF, tanto para criar um novo usuário quanto para fazer login.

## Gerenciamento de Estado e Comunicação de Componentes
Neste projeto, utilizo o Vuex para gerenciamento de estado e props para comunicação entre componentes. Isso nos permitiu manter um fluxo de dados eficiente e organizado na aplicação.

## Design Responsivo e Dinâmico
Este projeto é totalmente responsivo, Isso foi alcançado com a ajuda das bibliotecas do Quasar, que oferecem suporte para o desenvolvimento de aplicativos web responsivos.

## Dados de Exemplo
Foram feitos ajustes no arquivo JSON para conter dados de exemplo. Por exemplo:



"pessoas": [
  {
    "nome": "Alisson",
    "cpf": "111.111.111-11",
    "dataNascimento": "1997-11-26",
    "senha": "123",
    "id": 1
  }
]

"produtos": [
  {
    "id": 1,
    "descricao": "Produto 1",
    "valorUnitario": 10,
    "imagem": "https://m.media-amazon.com/images/I/51A2YQw5VjL.__AC_SX300_SY300_QL70_ML2_.jpg"
  }
]

Esses dados são usados na aplicação para simular informações de usuário e produtos.