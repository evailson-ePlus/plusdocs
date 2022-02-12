import { Request, Response } from 'express'
import { bitbucketController } from '../controllers/bitbucketController'

export const reposService = {
	async index(req: Request, res: Response) {
		const repos = await bitbucketController.index()

		return res.status(201).json({ message: 'success', repos })
	},

	async storesIndex(req: Request, res: Response) {
		const repos = await bitbucketController.indexByType('Lojas Vtex')

		return res.status(201).json({ message: 'success', repos })
	},

	async componentsIndex(req: Request, res: Response) {
		const repos = await bitbucketController.indexByType('IO Blocks')

		return res.status(201).json({ message: 'success', repos })
	},

	async saveRepos(req: Request, res: Response) {
		const repos = await bitbucketController.index()

		return res.status(201).json({ message: 'success', repos })
	}
}
