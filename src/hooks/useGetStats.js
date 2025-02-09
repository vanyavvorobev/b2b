import axios from 'axios'
import { useState, useCallback } from 'react'
import Cookies from 'js-cookie'

const useGetStats = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [success, setSuccess] = useState(false)
	const [data, setData] = useState(null)
	const apiUrl = process.env.API_URL
	const token = Cookies.get('access_token')

	const getStats = useCallback(async () => {
		setLoading(true)
		setError(null)

		const url = `${apiUrl}/cells/stats`

		try {
			const response = await axios.get(url, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			if (response.status === 200) {
				setSuccess(response.isSuccess)
				setData(response.data)
				return response.data
			} else {
				setError('Failed to fetch the data.')
			}
		} catch (err) {
			setError(err.message || 'Error occurred while fetching the data.')
		} finally {
			setLoading(false)
		}
	}, [data])

	return { getStats, data, loading, error, success }
}
export default useGetStats
