// Generated by https://quicktype.io

export interface BitbucketRepo {
	scm: string
	has_wiki: boolean
	links: RepoLinks
	created_on: string
	full_name: string
	owner: Owner
	size: number
	uuid: string
	type: string
	website: string
	override_settings: OverrideSettings
	description: string
	has_issues: boolean
	slug: string
	is_private: boolean
	name: string
	language: string
	fork_policy: string
	project: Project
	mainbranch: Mainbranch
	workspace: Project
	updated_on: string
}

export interface RepoLinks {
	watchers: Avatar
	branches: Avatar
	tags: Avatar
	commits: Avatar
	clone: Clone[]
	self: Avatar
	source: Avatar
	html: Avatar
	avatar: Avatar
	hooks: Avatar
	forks: Avatar
	downloads: Avatar
	pullrequests: Avatar
}

export interface Avatar {
	href: string
}

export interface Clone {
	href: string
	name: string
}

export interface Mainbranch {
	type: string
	name: string
}

export interface OverrideSettings {
	branching_model: boolean
	default_merge_strategy: boolean
	branch_restrictions: boolean
}

export interface Owner {
	username: string
	display_name: string
	type: string
	uuid: string
	links: OwnerLinks
}

export interface OwnerLinks {
	self: Avatar
	html: Avatar
	avatar: Avatar
}

export interface Project {
	links: OwnerLinks
	type: string
	name: string
	key?: string
	uuid: string
	slug?: string
}
