import { Component } from '@prisma/client'
import { db } from '../database'

export const componentsController = {
	async create(component: any, repoId: string) {
		const createdComponent = await db.component.create({
			data: {
				...component,
				repo: {
					connect: { id: repoId }
				}
			}
		})

		return createdComponent
	},

	async update(component: any, repoId: string) {
		const createdComponent = await db.component.update({
			data: component,
			where: { repoId }
		})

		return createdComponent
	}
}
