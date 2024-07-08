SQLiteseu# Projeto de Carrinho de Compras

Este é um projeto de carrinho de compras utilizando Node.js para o backend, Angular para o frontend, e SQLite como banco de dados. Este guia irá levá-lo através dos passos de instalação e inicialização do projeto.

## Pré-requisitos

- Node.js
- NPM (Node Package Manager)
- SQLite

## Instalação do SQLite

Para instalar o SQLite, você pode baixar o instalador a partir do seguinte link:

- [SQLiteStudio-3.4.4-windows-x64-installer.exe](install\SQLiteStudio-3.4.4-windows-x64-installer.exe)

Após o download, execute o instalador e siga as instruções na tela para completar a instalação.

## Configuração do Projeto

### Backend

1. Clone o repositório do projeto para o seu diretório local.
2. Navegue até o diretório do backend.
3. Instale as dependências.
4. Inicie o servidor da API.
5. Inicie o servidor de autenticação.

```bash
# Clone o repositório
git clone https://github.com/luizhenrique14/MercadoLivre-Case.git

# Navegue até o diretório do backend
cd seu-projeto/Backend

# Instale as dependências
npm install

# Inicie o servidor da API
node index.js

# Navegue até o diretório de autenticação
cd auth

# Inicie o servidor de autenticação
node server.js
```

### Frontend

1. Navegue até o diretório do frontend.
2. Instale as dependências.
3. Inicie o servidor de desenvolvimento do Angular.

```bash
# Navegue até o diretório do frontend
cd seu-projeto/FrontEnd

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm start
```

## Estrutura do Projeto

O projeto está estruturado da seguinte maneira:

```
seu-projeto/
├── Backend/
│   ├── auth/
│   │   ├── server.js
│   ├── index.js
│   ├── ...
├── FrontEnd/
│   ├── src/
│   ├── ...
├── collections/
│   ├── MercadoLivre.postman_collection.json
├── README.md
```

- **Backend**: Contém o código do servidor da API e da autenticação.
- **FrontEnd**: Contém o código do frontend Angular.
- **collections**: Contém as coleções do Postman.
- **README.md**: Este arquivo de instruções.

## Utilizando a Coleção Postman

A pasta `collections` contém a coleção do Postman `MercadoLivre.postman_collection.json`, que inclui diversas requisições para interagir com a API do projeto. 

### Importando a Coleção no Postman

1. Abra o Postman.
2. Clique em `Import` no canto superior esquerdo.
3. Selecione a aba `Upload Files` e escolha o arquivo `MercadoLivre.postman_collection.json` localizado na pasta `collections`.
4. Clique em `Import`.

### Requisições na Coleção

A coleção contém as seguintes requisições:

1. **Alterar Quantidade de Produto no Carrinho**
   - Método: PUT
   - URL: `http://localhost:4000/api/cart/1`
   - Corpo: 
     ```json
     {
       "quantity": 5
     }
     ```

2. **Obter Carrinho**
   - Método: GET
   - URL: `http://localhost:4000/api/cart`

3. **Adicionar Produto ao Carrinho**
   - Método: POST
   - URL: `http://localhost:4000/api/cart/add`
   - Corpo:
     ```json
     {
       "productId": "1",
       "quantity": 2
     }
     ```

4. **Adicionar Produto**
   - Método: POST
   - URL: `http://localhost:4000/api/products/add`
   - Corpo:
     ```json
     {
       "name": "Produto de Teste",
       "price": 19.99
     }
     ```

5. **Obter Produtos**
   - Método: GET
   - URL: `http://localhost:4000/api/products`

6. **Deletar Produto do Carrinho**
   - Método: DELETE
   - URL: `http://localhost:5000/api/cart/1`

7. **Registrar Usuário**
   - Método: POST
   - URL: `http://localhost:5000/api/register`
   - Corpo:
     ```json
     {
       "username": "luizhenrique1994",
       "password": "Luiz1994@1994@"
     }
     ```

8. **Login**
   - Método: POST
   - URL: `http://localhost:5000/api/login`
   - Corpo:
     ```json
     {
       "username": "luizhenrique1994",
       "password": "Luiz1994@1994@"
     }
     ```

## Inicialização

Depois de seguir os passos de instalação e configuração acima, você deve ter os servidores do backend e do frontend em execução. O backend estará disponível na porta especificada no seu código (por padrão, `http://localhost:3000`), e o frontend estará disponível em `http://localhost:4200`.

## Contato

Para mais informações, entre em contato com [luiz.henrique1494@gmail.com](mailto:luiz.henrique1494@gmail.com).
```

Certifique-se de salvar este conteúdo em um arquivo chamado `README.md` na raiz do seu projeto. Substitua os placeholders como `https://github.com/seu-usuario/seu-projeto.git` e `luiz.henrique1494@gmail.com` pelas informações reais do seu projeto.