import { Repo } from '@prisma/client'
import { db } from '../database'
import { bitbucketApi } from '../services/bitbucketApi'
import { BitbucketRepo } from '../types/global'
import { reposView } from '../views/reposView'

export const reposController = {
	async create(repo: Repo): Promise<Repo> {
		const createdRepo = await db.repo.create({
			data: repo
		})

		return createdRepo
	}
}
