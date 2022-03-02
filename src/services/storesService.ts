import { Component, Repo, Store } from '@prisma/client'
import { Request, Response } from 'express-serve-static-core'
import { bitbucketReposController } from '../controllers/bitbucketReposController'
import { componentsController } from '../controllers/componentsController'
import { reposController } from '../controllers/reposController'
import { storesController } from '../controllers/storesController'
import { Manifest } from '../types/global'
import { timeout } from '../utils/timeout'

export const storesService = {
	async index(req: Request, res: Response) {
		const stores = await storesController.index()
		return res.status(200).json({ message: 'Index', stores })
	},

	async update(req: Request, res: Response) {
		const storesRepos = await reposController.indexByType('Lojas Vtex')

		let createdStores = []
		let repo: Repo

		// console.log(storesRepos)

		for (let i = 0; i < storesRepos.length; i++) {
			repo = storesRepos[i]

			let manifest: Manifest
			let isIo = false
			let createdStore: Store
			let storeComponentsIds = []

			console.log(
				`${((i / storesRepos.length) * 100).toFixed(2)}% complete, indexing ${repo.name} `
			)

			try {
				// if (repo.name == 'binne-comfort') {
				manifest = await bitbucketReposController.showManifestByRepoName(repo.name, 'src/')

				const { dependencies } = manifest

				const componentsNames = [
					...new Set(Object.keys(dependencies).map((dependency) => dependency.split('.')[1]))
				]

				for (let i = 0; i < componentsNames.length; i++) {
					try {
						storeComponentsIds.push((await componentsController.showByName(componentsNames[i])).id)
					} catch (error) {
						// console.log(error)
					}
				}

				// console.log(componentsNames)

				isIo = true
				// }
			} catch (error) {
				// console.log(error)
			}

			if (isIo) {
				// console.log(storeComponentsIds)

				try {
					createdStore = await storesController.update(
						{
							name: manifest.name,
							type: 'io'
						},
						repo.id,
						storeComponentsIds
					)
				} catch (error) {
					// console.log(error)
					createdStore = await storesController.create(
						{
							name: repo.name,
							type: 'io'
						},
						repo.id,
						storeComponentsIds
					)
				}
			}

			if (createdStore) {
				createdStores.push(createdStore)
			}
		}

		return res.status(200).json({
			message: 'update',
			createdStores
		})
	}
}
