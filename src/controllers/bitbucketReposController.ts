import { db } from '../database'
import { bitbucketApi } from '../services/bitbucketApi'
import { BitbucketRepo } from '../types/global'
import { reposView } from '../views/reposView'

export const bitbucketReposController = {
	async index() {
		const { data } = await bitbucketApi.get(
			'/?project.name="Lojas Vtex" OR project.name="IO Blocks"'
		)
		const { pagelen, size } = data
		const pages = size / pagelen

		console.log('pages: ' + pages)

		if (pages > 1) {
			let repos = []

			for (let i = 1; i < pages; i++) {
				const { data } = await bitbucketApi.get(
					`/?project.name="Lojas Vtex" OR project.name="IO Blocks"&page=${i}`
				)

				repos.push(...data.values)
			}

			return reposView.renderMany(repos)
		}

		return reposView.renderMany(data.values)
	},

	async indexByType(name: string) {
		const { data } = await bitbucketApi.get(`/?q=project.name="${name}"`)
		const { pagelen, size } = data
		const pages = size / pagelen

		console.log('pages: ' + pages)

		if (pages > 1) {
			let repos = []

			for (let i = 1; i < pages; i++) {
				const { data } = await bitbucketApi.get(`/?q=project.name="${name}"&page=${i}`)

				repos.push(...data.values)
			}

			return reposView.renderMany(repos)
		}

		return reposView.renderMany(data.values)
	},

	async showManifestByRepoName(repoName: string): Promise<any> {
		const { data } = await bitbucketApi.get(`/${repoName}/src/HEAD/manifest.json`)

		return data
	},

	async showReadmeByRepoName(repoName: string): Promise<string> {
		const { data } = await bitbucketApi.get(`/${repoName}/src/HEAD/docs/README.md`)

		return data
	}
}
