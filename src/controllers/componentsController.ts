import { Component } from '@prisma/client'
import { db } from '../database'

export const componentsController = {
	async index() {
		const components = await db.component.findMany()

		return components
	},

	async showByName(name: string) {
		const component = await db.component.findFirst({
			where: { name: name }
		})

		return component
	},

	async indexByRepoId(repoId: string) {
		const components = await db.component.findMany({
			where: { repoId: repoId }
		})

		return components
	},

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
			data: {
				...component
			},
			where: { repoId }
		})

		return createdComponent
	}
}
