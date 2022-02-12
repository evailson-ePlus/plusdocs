import { Router } from 'express'
import { componentsService } from '../services/componentsService'

const componentsRoutes = Router()

componentsRoutes.get('/', componentsService.index)
componentsRoutes.put('/update', componentsService.updateComponents)

export { componentsRoutes }
