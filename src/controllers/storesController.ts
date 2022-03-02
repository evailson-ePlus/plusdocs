import { db } from '../database'
import { componentsController } from './componentsController'

export const storesController = {
	async index() {
		const stores = await db.store.findMany({
			include: {
				components: {
					include: {
						component: true
					}
				},
				repo: true
			}
		})

		return stores
	},

	async create(store: any, repoId: string, componentIds: string[]) {
		console.log(componentIds)

		const createdStore = await db.store.create({
			data: {
				...store,
				repo: {
					connect: { id: repoId }
				},
				components: {
					create: componentIds.map((componentId) => ({ componentId: componentId }))
				}
			}
		})

		return createdStore
	},

	async update(store: any, repoId: string, componentsIds: string[]) {
		const componentsInStore = await componentsController.indexByRepoId(repoId)

		const newComponentsIds = componentsIds.filter((componentId) => {
			return componentsInStore.some((component) => component.id === componentId)
		})

		console.log(newComponentsIds)

		const updated = await db.store.update({
			data: {
				...store,
				components: {
					create: { componentId: 'e83f3b32-f5f0-47b6-ac8c-3566840b0062' }
				}
			},
			where: { repoId }
		})

		return updated
	}
}
