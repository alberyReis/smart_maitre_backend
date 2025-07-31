import dotenv from 'dotenv'
import express from 'express'
import { sequelize } from './database/database'

const app = express()

dotenv.config()

app.use(express.json())

const PORT = process.env.SERVER_PORT

app.get('/', (_, res) => {
  res.send('Smart Maître backend rodando!')
})

try {
  sequelize.authenticate()
  console.log('Conexão com MySQL bem-sucedida')

  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
  })
} catch (error) {
  console.error('Erro ao conectar no banco:', error)
}



