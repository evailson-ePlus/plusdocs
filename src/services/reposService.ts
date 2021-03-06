import { Request, Response } from 'express'
import { bitbucketReposController } from '../controllers/bitbucketReposController'
import { reposController } from '../controllers/reposController'

export const reposService = {
	async index(req: Request, res: Response) {
		const repos = await reposController.index()

		return res.status(201).json({ message: 'success', repos })
	},

	async updateRepos(req: Request, res: Response) {
		const bitbucketRepos = await bitbucketReposController.index()

		const updatedRepos = await Promise.all(
			bitbucketRepos.map(async (repo) => {
				let updatedRepos

				try {
					updatedRepos = await reposController.create(repo)
				} catch (err) {
					updatedRepos = await reposController.update(repo)
				}

				return updatedRepos
			})
		)

		return res.status(200).json({ message: 'success', updatedRepos })
	}
}
