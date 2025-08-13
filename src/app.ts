import express from 'express'
import { router } from './routes'

const createApp = () => {
    const app = express()

    app.use(express.json())
    app.get('/', router)

    return app
}

export { createApp }

