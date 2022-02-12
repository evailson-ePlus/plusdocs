import { Router } from 'express'
import { bitBucketRoutes } from './bitbucket.routes'
import { componentsRoutes } from './components.routes'
import { reposRoutes } from './repos.routes'

const routes = Router()

routes.get('/', (req, res) => {
	return res.status(201).json({ message: 'Welcome to PlusDocs API!' })
})

routes.use('/bitbucket', bitBucketRoutes)
routes.use('/repos', reposRoutes)
routes.use('/components', componentsRoutes)

export default routes
