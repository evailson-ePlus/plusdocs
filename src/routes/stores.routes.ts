import { Router } from 'express'
import { storesService } from '../services/storesService'

const storesRoutes = Router()

storesRoutes.get('/', storesService.index)
storesRoutes.put('/update', storesService.update)

export { storesRoutes }
