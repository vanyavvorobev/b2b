import { useRouter } from 'next/router'
import { Box } from '@mui/material'
import Wrapper from '../components/UI/Wrapper'
import Account from '@/components/Account'

export default function MyAccount({ data, lottery }) {
	const router = useRouter()
	const handleEditClick = () => {
		router.push('account-settings')
	}
	return (
		<Wrapper header={'My Account'} style={{ minHeight: 800 }}>
			<Box
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					gap: 30,
					height: '100%',
				}}
			>
				<Account
					onEditClick={handleEditClick}
					data={data.data}
					lottery={lottery.cards}
				/>
			</Box>
		</Wrapper>
	)
}
