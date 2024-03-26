import { Router } from 'express'
import NoticiaController from './app/controllers/NoticiaController.js'

const router = Router()

//ROTAS
router.get('/selecoes', NoticiaController.index)
router.get('/selecoes/:id', NoticiaController.show)
router.post('/selecoes', NoticiaController.store)
router.put('/selecoes/:id', NoticiaController.update)
router.delete('/selecoes/:id',NoticiaController.delete)

export default router
