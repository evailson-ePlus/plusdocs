import { BitbucketRepo } from '../types/global'

export const storesView = {
	render(repo: BitbucketRepo) {
		return {
			id: repo.uuid,
			repoName: repo.name,
			type: repo.project.name
		}
	},

	renderMany(repos: BitbucketRepo[]) {
		return repos.map((repo) => this.render(repo))
	}
}
