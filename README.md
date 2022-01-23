# Boas vindas ao repositório do projeto App de Delivery!

## Instruções iniciais
1. Clone o repositório
  * `git clone https://github.com/alexandredamasceno/App-Delivery`.
2. Entre na pasta do repositório que você acabou de clonar:
  * `cd App-Delivery`.
3. Instale as dependências
  * `npm install`.
4. Para rodar o projeto:
  - Abra a pasta back-end:
  * `npm start`
  - Abra a pasta front-end:
  * `npm start`
 
## Configurando o arquivo .env
Crie um arquivo `.env` na pasta back-end do projeto. Para que serve esse arquivo? Para criar váriáveis de ambiente que serão usadas para rodar o projeto com as suas próprias informações do MySQL.

#### Variáveis:

* `MYSQL_DB_NAME`(Opcional)
* `MYSQL_HOST`(Opcional)
* `MYSQL_PORT`(Opcional)
* `MYSQL_USER`
* `MYSQL_PASSWORD`

### ⚠️ Atenção: você precisa ter instalado o MySQL na sua máquina para rodar o projeto!

## Do que se trata a Aplicação?

### Contextualizando(fictício)

A distribuidora de cervejas da dona Tereza está se informatizando! 🚀 Seu negócio, antes focado em um local específico da cidade, passou a receber uma quantidade massiva de encomendas de outros pontos, expandindo sua atuação, sobretudo via delivery. Isso tudo graças ao excelente preço das bebidas e atendimento da equipe de vendas.

Agora a distribuidora possui alguns pontos de venda na cidade para agilizar no atendimento dessas áreas. Cada ponto de venda, por sua vez, possui uma pessoa vendedora responsável.

Como seu antigo sistema, que era um conjunto de planilhas, já não atende a necessidade do negócio, pois gera muita manutenção, dona Tereza procurou a **sua equipe de pessoas desenvolvedoras** com uma ideia de aplicativo que pudesse agilizar a vida de sua equipe e das pessoas que compram seus produtos. O aplicativo precisa:

- Ter acesso via login: tanto clientes como pessoas vendedoras, assim como a própria dona Tereza, que administra o sistema, devem ter acesso ao aplicativo via login, porém para funções diferentes: (1) A pessoa cliente, que compra da lista de produtos; (2) A pessoa vendedora, que aprova, prepara e entrega; (3) A pessoa administradora, que gerencia quem usa o aplicativo;
- Fazer a comunicação entre clientes e pessoas vendedoras: a pessoa cliente faz o pedido via "carrinho de compras" e a pessoa vendedora aprova, prepara e envia esse pedido. Quando o produto é recebido por quem comprou, essa pessoa marca o pedido como "recebido". Ambos devem possuir detalhes sobre seus pedidos;
- Funcionar em tempo real: as telas de pedidos/detalhes do pedido devem ser atualizadas em tempo real, à medida que essas interações acontecem. Se a pessoa cliente faz o pedido, o mesmo deve aparecer para a pessoa vendedora em seu dash de pedidos sem que ela precise atualizar a página. A pessoa cliente, por sua vez, deve ter as informações sobre seu pedido também atualizadas em tempo real, ou seja, ter informações se o pedido está sendo preparado ou se já saiu pra entrega;

Minha equipe, que já possui uma boa experiência com desenvolvimento, em pouco tempo apresentou um [protótipo](https://www.figma.com/file/cNKu41RhnPIgNqrbMTzmUI/Delivery-App-new-trybeer?node-id=0%3A1) e um [Diagrama de ER](./assets/readme/eer.png) conforme imagem:

![Diagrama de ER](./assets/readme/eer.png)

A ideia da minha equipe já pressupõe alguma escalabilidade, dado que foram estabelecidas algumas entidades genéricas no banco de dados e componentização no front-end, para que, caso o sistema cresça, não seja muito difícil mudar e ampliar essa estrutura.

**Enfim, apresentamos o nosso MVP. Enjoe!!!**

---

# Habilidades

Nesse projeto, fomos capazes de:

- Manter aderência do código à especificação. Seu programa deve se comportar como especificado no repositório, no [protótipo](https://www.figma.com/file/cNKu41RhnPIgNqrbMTzmUI/Delivery-App-new-trybeer?node-id=0%3A1) e no [Diagrama de ER](./assets/readme/eer.png);
- Manter a organização do seu código e a arquitetura geral da aplicação (tanto da API quando do front-end);
- Manter aderência ao padrão REST na API;
- Respeitar a estrutura do banco de dados. Sua implementação não deve adicionar ou remover tabelas, campos ou relacionamentos e sua API deve estar preparada para aproveitar essa estrutura por completo;
- Manter uma cobertura de testes. Seu código deve ser testável e possuir uma suíte de testes unitários e/ou de integração robusta e com alta cobertura.
- Implementar a funcionalidade de comunicação em tempo real, utilizando o socket.io.
- Manter aderência aos princípios SOLID;
- Autenticação JWT;
- Para o banco de dados, utilizaremos a biblioteca ORM `Sequelize`, que fará interface com o `MySQL`!

** Esse foi o projeto mais desafiador no módulo de back-end, porque nessa aplicação criamos e integramos tanto o back-end quanto o front-end!**

## Fluxos da aplicação:

- **Fluxo Comum** que compreende: 
  - (1) Tela de Login (`01login.test`); 
  - (2) Tela de Registro (`02register.test`).

- **Fluxo do Cliente** que compreende: : 
  - (3) Tela de Produtos (`03customer_products.test`); 
  - (4) Tela de Checkout (`04customer_checkout.test`); 
  - (5) Tela de Pedidos (`05customer_orders.test`); 
  - (6) Tela de Detalhes do Pedido (`06customer_order_details.test`).

- **Fluxo da Pessoa Vendedora** que compreende: 
  - (7) Tela de Pedidos (`07seller_orders.test`); 
  - (8) Tela de Detalhes/Controle do Pedido (`08seller_order_details.test`).

- **Validação do Status do Pedido** que compreende: 
  - (9) Teste de status sem atualização em tempo real (`09customer_seller_status_sync.test`); 
  - (10) Teste de status com atualização em tempo real (`10customer_seller_socket_status_sync.test`).

- **Fluxo da Pessoa Administradora** que compreende: 
  - (11) Tela de gerenciamento de usuários (`11admin_manage_users.test`).

## Linter

Usamos o [ESLint](https://eslint.org/) para fazer a análise estática do código.

Este projeto já vem com as dependências relacionadas ao _linter_ configuradas nos arquivos `package.json` nos seguintes caminhos:

- `App-Delivery/back-end/package.json`
- `App-Delivery/front-end/package.json`

Para poder rodar os `ESLint` em um projeto basta executar o comando `npm install` dentro do projeto de forma individual, ou seja, precisa-se executar esse comando dentro da pasta `back-end` e também na pasta `front-end` e depois `npm run lint` dentro de cada uma dessas pastas, assim você verifica as particularidades individualmente. Se a análise do `ESLint` encontrar problemas no seu código, tais problemas serão mostrados no seu terminal. Se não houver problema no seu código, nada será impresso no seu terminal.

Devido ao fato de as configurações das regras do `ESLint` dos projetos de front e back **serem diferentes**, **é preciso executar o `ESLint` em cada projeto**.

Você pode também instalar o plugin do `ESLint` no `VSCode`, bastar ir em extensions e baixar o [plugin `ESLint`](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).
  - **Dica**: Abra separadamente cada pasta do projeto (`back-end` e `front-end` em `VSCode`s separados, para tirar proveito do `ESLint` individual de cada projeto).

Usaremos também o [StyleLint](https://stylelint.io/) para fazer a análise estática do seu código.

**O Stylelint é aplicável _APENAS_ no frontend**

Para poder rodar o `StyleLint` em um projeto basta executar o comando `npm install` dentro do projeto de front-end e depois `npm run lint:styles`. Se a análise do `StyleLint` encontrar problemas no seu código, tais problemas serão mostrados no seu terminal. Se não houver problema no seu código, nada será impresso no seu terminal.

### ⚠️ Atenção: Esse é um projeto de avaliação da Trybe - instituição onde estou estudando. Todo o código desse projeto foi feito por mim e pelos integrantes do meu grupo, incluindo estrutura de pastas, exceto o código de implementação dos testes, esses foram feitos pelos instrutores da Trybe para testar as nossas implementações.

#### ⚠️ Não se assuste se encontrar algo fora do lugar, estou melhorando algumas implementações e eventualmente criando outras. Obrigado pela compreensão.
