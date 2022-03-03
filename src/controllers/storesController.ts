import { db } from '../database'
import { componentsController } from './componentsController'

export const storesController = {
	async index() {
		const stores = await db.store.findMany({
			include: {
				repo: true
			}
		})

		return stores
	},

	async show(id: string) {
		const store = await db.store.findFirst({
			where: { id },
			include: {
				components: {
					include: {
						component: {
							include: {
								repo: true
							}
						}
					}
				},
				repo: true
			}
		})

		return store
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
					create: newComponentsIds
				}
			},
			where: { repoId }
		})

		return updated
	}
}
