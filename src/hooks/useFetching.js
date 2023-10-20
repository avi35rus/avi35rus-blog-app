import { useState } from 'react'

export const useFetching = (callback) => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')

	const fetching = async (arg1, arg2, arg3) => {
		try {
			setIsLoading(true)
			await callback(arg1, arg2, arg3)
		} catch (error) {
			if (error.response && error.response.status === 422) {
				console.log(error.response.data.errors)
				setError(formatErrors(error.response.data.errors))
			} else {
				setError(error.message)
			}
		} finally {
			setIsLoading(false)
		}
	}

	const formatErrors = (errors) => {
		const formattedErrors = {}
		for (const key in errors) {
			formattedErrors[key] = { message: `${key.charAt(0).toUpperCase() + key.slice(1)} ${errors[key]}` }
		}
		return formattedErrors
	}

	return [fetching, isLoading, error]
}
