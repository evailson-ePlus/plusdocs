import { db } from '../database'

export const storesController = {
	async index() {
		const stores = await db.store.findMany()

		return stores
	},

	async create(store: any, repoId: string, componentIds: string[]) {
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

	async update(component: any, repoId: string, componentIds: string[]) {
		const updated = await db.store.update({
			data: {
				...component
				// components: {
				// 	create: { componentId: 'e83f3b32-f5f0-47b6-ac8c-3566840b0062' }
				// }
			},
			where: { repoId }
		})

		return updated
	}
}
