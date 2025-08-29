import { Router } from "express"
import { clientController } from "./controllers/clientController"

const router = Router()

router.post('/clients', clientController.createClient)
router.get('/clients', clientController.getAllClients)
router.get('/clients/:id', clientController.getClientById)
router.put('/clients/:id', clientController.updateClientEmailAndPasswordById)
router.delete('/clients/:id', clientController.deleteClient)

export { router }