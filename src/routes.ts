import { Router } from "express"
import { clientController } from "./controllers/clientController"

const router = Router()

router.post('/clients/create', clientController.createClient)
router.get('/clients/getall', clientController.getAllClients)
router.get('/clients/getbyid/:id', clientController.getClientById)
router.put('/clients/updateemailandpassword/:id', clientController.updateClientEmailAndPasswordById)
router.delete('/clients/delete/:id', clientController.deleteClient)

export { router }