Banco API Tests — Automação de Testes de API REST
Projeto de automação de testes funcionais para validar a API REST do sistema bancário banco-api, utilizando JavaScript e ferramentas do ecossistema Node.js.
Repositório dos testes: https://github.com/carlapatara49-prog/banco-api-tests
API sob teste: https://github.com/juliodelimas/banco-api
Objetivos
- Automatizar testes funcionais de endpoints da API REST bancária.
- Verificar respostas HTTP e comportamentos esperados da API.
- Organizar e reutilizar recursos de teste, dados e funções auxiliares.
- Facilitar a execução local dos testes.
- Gerar relatórios HTML para apoiar a análise dos resultados e a identificação de falhas.
Stack utilizada
Tecnologia / biblioteca	Finalidade
JavaScript	Linguagem utilizada na implementação dos testes.
Node.js	Ambiente de execução JavaScript.
Mocha	Framework para organizar e executar os testes automatizados.
Supertest	Realização de requisições HTTP para testar a API.
Chai	Asserções para validar os resultados das requisições.
dotenv	Carregamento de variáveis de ambiente definidas no arquivo .env.
Mochawesome	Geração de relatórios de execução em HTML e JSON.
npm	Instalação e gerenciamento das dependências e execução dos scripts.


As versões declaradas no package.json são utilizadas como referência. Para conferir as versões efetivamente instaladas, consulte package-lock.json e execute npm list --depth=0.
Pré-requisitos
Antes de executar o projeto, instale:
- Node.js — preferencialmente uma versão LTS compatível com as dependências.
- npm, incluído na instalação do Node.js.
- A API banco-api em execução e acessível pela URL configurada em BASE_URL.
Estrutura de diretórios
A estrutura identificada no repositório é:
banco-api-tests/
├── fixtures/
├── helpers/
├── mochawesome-report/
├── test/
├── .env                 # arquivo local de configuração; não deve ser versionado
├── .gitignore
├── package.json
└── package-lock.json
Diretórios e arquivos
- test/ — contém os arquivos de teste automatizado. O script npm procura arquivos que correspondam ao padrão ./test/**/*.test.js.
- fixtures/ — diretório destinado a dados e recursos reutilizáveis pelos testes.
- helpers/ — diretório destinado a funções auxiliares compartilhadas pela suíte.
- mochawesome-report/ — diretório usado para armazenar relatórios gerados durante a execução, quando configurado pelo reporter.
- .env — arquivo local que informa a URL-base da API a ser testada.
- .gitignore — exclui do controle de versão node_modules/, mochawesome-report/ e .env.
- package.json — define as dependências e o comando de teste.
- package-lock.json — registra a árvore de dependências instalada para favorecer instalações reproduzíveis.
A pasta node_modules/ é criada durante a instalação das dependências e não precisa ser versionada.

Configuração do ambiente
1. Clonar o repositório de testes
git clone https://github.com/carlapatara49-prog/banco-api-tests.git
cd banco-api-tests
2. Instalar as dependências
npm install
Esse comando instala as bibliotecas declaradas no package.json.
3. Criar o arquivo .env
Crie manualmente um arquivo chamado .env na raiz do projeto, no mesmo nível do package.json.
Conteúdo esperado:
BASE_URL=http://localhost:3000
A variável BASE_URL define o endereço-base da API que será testada. O exemplo pressupõe que a API esteja disponível localmente na porta 3000; se ela estiver em outro host ou porta, ajuste o valor de acordo com o ambiente.
Importante:
- O nome do arquivo deve ser exatamente .env, sem extensão adicional.
- Não coloque o arquivo dentro de test/, fixtures/ ou helpers/.
- O arquivo .env está listado no .gitignore; cada pessoa que clonar o projeto deve criar sua própria configuração local.
- Não inclua senhas, tokens ou outras informações sensíveis no repositório.
- Verifique se o código carrega as variáveis com dotenv e lê process.env.BASE_URL.
4. Iniciar a API sob teste
Clone e configure o projeto da API conforme as instruções do repositório original:
https://github.com/juliodelimas/banco-api
Inicie o servidor seguindo o README e os scripts desse projeto. Antes de executar a suíte, confirme que a API está ativa e que a URL definida em BASE_URL corresponde ao endereço em que ela está escutando.
Execução dos testes
Na raiz do projeto de automação, execute:
npm test
O script definido no package.json é:
mocha ./test/**/*.test.js --timeout=200000 --reporter mochawesome
Isso significa que o Mocha procura arquivos com extensão .test.js dentro de test/ e seus subdiretórios, aplica timeout de 200000 milissegundos por teste e utiliza o reporter Mochawesome.
Resultado da execução
O terminal apresenta o resumo da execução, incluindo testes aprovados e falhos. Se houver falhas, examine as mensagens de erro e o relatório para investigar a causa.
Relatórios Mochawesome
O Mochawesome permite gerar relatórios em HTML e JSON. Com o reporter configurado no script npm, o relatório é gerado durante a execução dos testes.
O diretório de relatórios identificado no .gitignore é:
mochawesome-report/
Após executar npm test, verifique se esse diretório foi criado e procure o arquivo HTML gerado (normalmente mochawesome.html). Abra o HTML em um navegador para consultar o resultado detalhado.
Gerar relatório com diretório e nome explícitos
Se quiser definir explicitamente o local e o nome do relatório, execute:
npx mocha "./test/**/*.test.js" --timeout=200000 --reporter mochawesome --reporter-options reportDir=mochawesome-report,reportFilename=mochawesome,html=true,json=true
Esse comando solicita ao Mochawesome os formatos HTML e JSON no diretório mochawesome-report/.
Os nomes e caminhos efetivamente gerados dependem das opções do reporter. Se nenhum relatório aparecer, confira a saída do comando e a configuração do Mochawesome instalada.

Limpar relatórios antigos
Como os relatórios são artefatos de execução, você pode excluir mochawesome-report/ antes de uma nova execução se desejar começar com uma pasta limpa. Faça isso apenas quando não precisar preservar os resultados anteriores.
Solução de problemas
- Erro de conexão ou requisição recusada: confirme que a API está em execução e que BASE_URL contém o host e a porta corretos.
- Variável BASE_URL indefinida: confira se o .env está na raiz do projeto e se o código carrega o dotenv antes de acessar a variável.
- Nenhum teste encontrado: confirme se os arquivos de teste estão em test/ ou em seus subdiretórios e terminam com .test.js.
- Relatório HTML não localizado: confira se o comando terminou, se o reporter Mochawesome foi carregado e se a pasta mochawesome-report/ foi criada.
- Problemas de dependências: tente instalar novamente com npm install e consulte a versão do Node.js com node --version.
Documentação oficial e referências
- Projeto de automação: https://github.com/carlapatara49-prog/banco-api-tests
- API sob teste: https://github.com/juliodelimas/banco-api
- Node.js: https://nodejs.org/docs/latest/api/
- npm: https://docs.npmjs.com/
- Mocha: https://mochajs.org/
- Supertest: https://github.com/ladjs/supertest
- Chai: https://www.chaijs.com/
- dotenv: https://github.com/motdotla/dotenv
- Mochawesome: https://github.com/adamgruber/mochawesome
- JavaScript — MDN: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript
- Git — documentação: https://git-scm.com/doc
Observações
Este repositório contém a suíte de testes; a API é um projeto separado e precisa estar disponível para que os testes de integração possam executá-la. Os resultados dependem da versão e da configuração da API em uso.
