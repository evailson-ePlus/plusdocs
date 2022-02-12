import { Router } from 'express'
import { bitbucketService } from '../services/bitbucketService'

const bitBucketRoutes = Router()

bitBucketRoutes.get('/', bitbucketService.index)
bitBucketRoutes.get('/stores', bitbucketService.storesIndex)
bitBucketRoutes.get('/components', bitbucketService.componentsIndex)

export { bitBucketRoutes }
