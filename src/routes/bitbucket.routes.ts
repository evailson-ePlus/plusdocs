import { Router } from 'express'
import { reposService } from '../services/reposService'

const bitBucket = Router()

bitBucket.get('/', reposService.index)
bitBucket.get('/stores', reposService.storesIndex)
bitBucket.get('/components', reposService.componentsIndex)

bitBucket.put('/', reposService.saveRepos)

export { bitBucket }
