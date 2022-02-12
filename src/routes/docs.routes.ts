import { Router } from 'express'
import { reposService } from '../services/reposService'

const reposRoutes = Router()

reposRoutes.get('/', reposService.index)
reposRoutes.put('/update', reposService.updateRepos)

export { reposRoutes }
