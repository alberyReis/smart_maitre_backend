import { sequelize } from './database/database'
import { createApp } from './app'

const app = createApp()
const port = process.env.SERVER_PORT

try {
  sequelize.authenticate()
  console.log('Conexão com MySQL bem-sucedida')

  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
  })
} catch (error) {
  console.error('Erro ao conectar no banco:', error)
}



