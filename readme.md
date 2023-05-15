# Teste Shopper


## Descrição

Este repositório contém um projeto de teste da empresa Shopper.

O projeto é dividido em dois diretórios principais:

- backend: contém a API em Node.js, utilizando o framework Fastify.js, que é responsável por fazer a comunicação com o banco de dados e fornecer dados para o frontend.
- frontend: contém a interface do usuário em React.js, responsável por consumir a API e exibir os dados para o usuário.

## Install
Para instalar as dependencias necesasrias, voce deve rodar o comando abaixo nos diretorios 'backend' e 'frontend'
```
npm install
```

## Configuração
Antes de iniciar o projeto, é necessário criar um arquivo .env na raiz do diretório backend com as variáveis de ambiente necessárias para conectar ao banco de dados.
Ex. abaixo:
```js
DBUSERNAME=teste
DBPASSWORD=senha
DBHOST='localhost'
DBPORT=3306
DBNAME='shopper'

```

## Execução
Para iniciar o projeto, execute o comando abaixo nos diretórios:

 'backend' 
 ```
 npm run start:dev
```
 
 'frontend'
 ```
npm run dev
```

## Funcionalidades

- A tela inicial exibe todos os produtos cadastrados no banco de dados.
- A tela de upload, é possivel carregar um arquvio.csv para atualizar os valore.
    - Apenas será permitido a alteração se não houver erros na arquivo .csv.
    - Caso tenha alguma alteração de valor acima de 10%, é exibido ao lado do produto.

## Tecnologias utilizadas

- Node.js
- TypeScript.js
- Fastify.js
- React.js
- MySQL
- Axios