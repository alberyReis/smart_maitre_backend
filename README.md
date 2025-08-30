
# Smart Maître Backend

API backend para gerenciar pedidos e pagamentos em estabelecimentos como bares e restaurantes, desenvolvida em Node.js com TypeScript e Express.
O projeto utiliza Sequelize ORM com banco de dados MySQL, suporte a autenticação via JWT e criptografia de senhas com bcrypt.
## 🚀 Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- Sequelize ORM
- MySQL
- bcrypt
- jsonwebtoken (JWT)
- dotenv

## 📂 Estrutura do Projeto

```bash
src/
│
├── controllers/       # Controladores da aplicação
├── database/          # Configuração do banco e instância do Sequelize
├── middlewares/       # Middlewares (autenticação, tratamento de erros, etc.)
├── models/            # Models do Sequelize
├── repositories/      # Camada de acesso a dados
├── services/          # Lógica de negócio
├── utils/             # Funções utilitárias (httpResponse, sanitizers, etc.)
├── validators/        # Validações e mensagens de erro
├── app.ts             # Configuração principal do Express
├── routes.ts          # Definição de rotas
└── server.ts          # Inicialização do servidor
```

## ⚙️ Configuração do Ambiente

Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

```bash
SERVER_PORT=3000
DB_NAME=smart_maitre
DB_USER=seu_usuario_aqui 
DB_PASSWORD=sua_senha_aqui 
DB_HOST=localhost
JWT_SECRET=seu_token_jwt_aqui 
```

### 🛠️ Scripts Disponíveis

```bash
npm install
```
```bash
npm run build
```
```bash
npm start
```

### 📌 Repositório

👉 GitHub - smart_maitre_backend


