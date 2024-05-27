import express from 'express'
import { getComponentes, addComponente, updateComponente, deleteComponente } from '../controllers/componente.js'

const router = express.Router()

router.get('/', getComponentes)
router.post('/', addComponente)
router.put('/:codigo_componente', updateComponente)
router.delete('/:codigo_componente', deleteComponente)

export default router