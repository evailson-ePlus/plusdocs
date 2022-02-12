import { Repo } from '@prisma/client'
import { db } from '../database'

export const reposController = {
	async index(): Promise<Repo[]> {
		const repos = await db.repo.findMany()

		return repos
	},

	async indexByType(type: string): Promise<Repo[]> {
		const repos = await db.repo.findMany({
			where: { type }
		})

		return repos
	},

	async create(repo: Repo): Promise<Repo> {
		const createdRepo = await db.repo.create({
			data: repo
		})

		return createdRepo
	},

	async update(repo: Repo): Promise<Repo> {
		const updatedRepo = await db.repo.update({
			where: { id: repo.id },
			data: repo
		})

		return updatedRepo
	}
}
