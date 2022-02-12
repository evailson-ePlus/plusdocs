import { Request, Response } from 'express'
import { bitbucketReposController } from '../controllers/bitbucketReposController'
import { reposController } from '../controllers/reposController'
import { componentsController } from '../controllers/componentsController'

export const componentsService = {
	async index(req: Request, res: Response) {
		const repos = await reposController.index()

		return res.status(201).json({ message: 'success', repos })
	},

	async updateComponents(req: Request, res: Response) {
		const componentRepos = await reposController.indexByType('IO Blocks')

		console.log(componentRepos)

		const createdComponents = await Promise.all(
			componentRepos.map(async (repo) => {
				try {
					const manifest = await bitbucketReposController.showManifestByRepoName(repo.name)
					const readme = await bitbucketReposController.showReadmeByRepoName(repo.name)

					const component = {
						name: manifest.name,
						titles: manifest.title,
						description: manifest.description,
						readme: readme
					}

					console.log(component, repo.id)

					const createdComponent = await componentsController.create(component as any, repo.id)

					return createdComponent
				} catch (error) {
					return 'not created'
				}
			})
		)

		// const createdComponents = await Promise.all(
		// 	components.map(async (component) => {
		// 		return await componentsController.create(component as any)
		// 	})
		// )
		// const manifest = await bitbucketReposController.showManifestByRepoName(componentRepos)

		// const updatedRepos = await Promise.all(
		// 	bitbucketComponentRepos.map(async (repo) => {
		// 		let updatedRepos

		// 		try {
		// 			updatedRepos = await reposController.create(repo)
		// 		} catch (err) {
		// 			updatedRepos = await reposController.update(repo)
		// 		}

		// 		return updatedRepos
		// 	})
		// )

		return res.status(200).json({ message: 'success', createdComponents })
	}
}
