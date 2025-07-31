
# Smart Maître - Backend

API desenvolvida com Node.js, Express, TypeScript e Sequelize para gerenciar pedidos e pagamentos em estabelecimentos como bares e restaurantes.

## Tecnologias Utilizadas

- Node.js
- Express
- TypeScript
- Sequelize
- PostgreSQL
- dotenv
- body-parser
- ts-node-dev

## Estrutura do Projeto

```bash
src/
├── controllers/ # Lógica das rotas
├── database/ # Configuração do banco e Sequelize
├── models/ # Modelos de dados
├── routes/ # Definição das rotas
├── services/ # Lógica de negócios (em breve)
└── app.ts # Ponto de entrada da aplicação
```

## Como Rodar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/alberyReis/smart_maitre_backend.git
cd smart_maitre_backend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo .env na raiz do projeto com os dados do seu banco:

```bash
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=smart_maitre
```

### 4. Crie o banco de dados e rode o projeto

```bash
npx sequelize db:create
npm run dev
```

A API ficará disponível em http://localhost:3000.

### Funcionalidades
 Cadastro e autenticação de usuários

 Abertura e fechamento de mesas

 Registro e controle de pedidos

 Pagamento via débito, crédito e Pix

 Histórico e relatórios


