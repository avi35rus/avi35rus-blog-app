import axios from 'axios'

export default class BlogService {
	static async getArticles(limit, offset, userToken) {
		const headers = {
			Authorization: `Token ${userToken}`,
		}

		const response = await axios.get(`https://blog.kata.academy/api/articles?limit=${limit}&offset=${offset}`, {
			headers,
		})

		return response.data
	}

	static async getArticle(slug, userToken) {
		const headers = {
			Authorization: `Token ${userToken}`,
		}

		const response = await axios.get(`https://blog.kata.academy/api/articles/${slug}`, { headers })

		return response.data.article
	}

	static async registerUser(userData) {
		const response = await axios.post('https://blog.kata.academy/api/users', {
			user: {
				username: userData.username,
				email: userData.email,
				password: userData.password,
			},
		})

		return response.data
	}

	static async loginUser(credentials) {
		const response = await axios.post('https://blog.kata.academy/api/users/login', {
			user: {
				email: credentials.email,
				password: credentials.password,
			},
		})

		return response.data
	}

	static async updateUserProfile(userData, userToken) {
		const updatedUser = {
			email: userData.email,
			username: userData.username,
			password: userData.newPassword,
			image: userData.image,
		}

		const headers = {
			Authorization: `Token ${userToken}`,
			'Content-Type': 'application/json',
		}

		const response = await axios.put('https://blog.kata.academy/api/user', { user: updatedUser }, { headers })

		return response.data
	}

	static async createArticle(articleData, userToken) {
		const headers = {
			Authorization: `Token ${userToken}`,
			'Content-Type': 'application/json',
		}

		const response = await axios.post(
			'https://blog.kata.academy/api/articles',
			{
				article: articleData,
			},
			{ headers }
		)

		return response.data
	}

	static async deleteArticle(slug, userToken) {
		const headers = {
			Authorization: `Token ${userToken}`,
		}

		const response = await axios.delete(`https://blog.kata.academy/api/articles/${slug}`, { headers })

		return response.data
	}

	static async updateArticle(slug, articleData, userToken) {
		const headers = {
			Authorization: `Token ${userToken}`,
			'Content-Type': 'application/json',
		}

		const response = await axios.put(
			`https://blog.kata.academy/api/articles/${slug}`,
			{
				article: articleData,
			},
			{ headers }
		)

		return response.data
	}

	static async likeArticle(slug, userToken) {
		const headers = {
			Authorization: `Token ${userToken}`,
			'Content-Type': 'application/json',
		}

		const response = await axios.post(`https://blog.kata.academy/api/articles/${slug}/favorite`, {}, { headers })

		return response.data
	}

	static async unlikeArticle(slug, userToken) {
		const headers = {
			Authorization: `Token ${userToken}`,
			'Content-Type': 'application/json',
		}

		const response = await axios.delete(`https://blog.kata.academy/api/articles/${slug}/favorite`, { headers })

		return response.data
	}
}
