import { Router } from 'express'
import { bitBucket } from './bitbucket.routes'

const routes = Router()

routes.get('/', (req, res) => {
	return res.status(201).json({ message: 'Welcome to PlusDocs API!' })
})

routes.use('/bitbucket', bitBucket)

export default routes
