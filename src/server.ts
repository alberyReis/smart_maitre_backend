import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import { db } from './config/db'

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Smart Maître backend rodando!')
})

const start = async () => {
  try {
    await db.authenticate()
    console.log('Conexão com MySQL bem-sucedida')

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`)
    })
  } catch (error) {
    console.error('Erro ao conectar no banco:', error)
  }
}

start()
