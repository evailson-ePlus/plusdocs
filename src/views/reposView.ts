import { BitbucketRepo } from '../types/global'

export const reposView = {
	render(repo: BitbucketRepo) {
		return {
			id: repo.uuid.replace('{', '').replace('}', ''),
			name: repo.slug,
			link: repo.links.html.href,
			type: repo.project.name
		}
	},

	renderMany(repos: BitbucketRepo[]) {
		return repos.map((repo) => this.render(repo))
	}
}
