import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import MyAccount from '@/containers/MyAccount'
import { universalServerSideProps } from '@/api/ssr'

export default function AccountPage({ accountData, lotteryData }) {
	const dispatch = useDispatch()
	const token = Cookies.get('access_token')
	if (token) {
		dispatch({ type: 'LOG_IN' })
	}
	return <MyAccount data={accountData} lottery={lotteryData} />
}

export async function getServerSideProps(context) {
	const { req } = context
	const token = req.cookies.access_token
	const apiUrl = process.env.API_URL
	const url = `${apiUrl}/users/me`
	const lotteryUrl = `${apiUrl}/cards/me/card`
	const accountData = await universalServerSideProps(url, token, 'accountData')
	const lotteryData = await universalServerSideProps(
		lotteryUrl,
		token,
		'lotteryData'
	)

	return { props: { ...accountData.props, ...lotteryData.props } }
}
