import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

const bitbucketApi = axios.create({
	baseURL: 'https://api.bitbucket.org/2.0/repositories/osfeladaeplus',
	headers: {
		Authorization: `Basic ${Buffer.from(
			process.env.BITBUCKET_USERNAME + ':' + process.env.BITBUCKET_PASSWORD,
			'utf-8'
		).toString('base64')}`
	}
})

bitbucketApi.interceptors.request.use((config) => {
	const { url, method, baseURL, data } = config

	console.log(`> [request] ${method} ${url}`)

	return config
})

bitbucketApi.interceptors.response.use(
	(response) => {
		const { data } = response
		const { method, url, baseURL } = response.config

		console.log(`> [response] ${method} ${url}`)

		return response
	},
	(error) => {
		const { data } = error
		const { method, url, baseURL } = error.config

		console.log(`> [response error] ${method} ${url}`)

		return Promise.reject(error)
	}
)

export { bitbucketApi }
