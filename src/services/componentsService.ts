import { Request, Response } from 'express'
import { bitbucketReposController } from '../controllers/bitbucketReposController'
import { reposController } from '../controllers/reposController'
import { componentsController } from '../controllers/componentsController'
import { Component } from '@prisma/client'

export const componentsService = {
	async index(req: Request, res: Response) {
		const components = await componentsController.index()

		return res.status(201).json({ message: 'success', components })
	},

	async updateComponents(req: Request, res: Response) {
		const componentRepos = await reposController.indexByType('IO Blocks')

		const createdComponents = await Promise.all(
			componentRepos.map(async (repo) => {
				let readme: string
				let component: {
					name: string
					title: string | null
					description: string | null
					version: string | null
					readme: string | null
				}

				try {
					readme = await bitbucketReposController.showReadmeByRepoName(repo.name)
				} catch (error) {
					readme = null
				}

				try {
					const manifest = await bitbucketReposController.showManifestByRepoName(repo.name)

					component = {
						name: manifest.name,
						title: manifest.title,
						version: manifest.version,
						description: manifest.description,
						readme: readme
					}
				} catch (error) {
					component = {
						name: repo.name,
						title: null,
						description: null,
						version: null,
						readme: readme
					}
				}

				let createdComponent: Component

				try {
					createdComponent = await componentsController.update(component as any, repo.id)
				} catch (error) {
					createdComponent = await componentsController.create(component as any, repo.id)
				}

				return createdComponent
			})
		)

		return res.status(200).json({ message: 'success', createdComponents })
	}
}
