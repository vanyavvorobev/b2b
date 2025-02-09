import { useEffect, useMemo, useState } from 'react'
import {
	Drawer,
	List,
	Typography,
	ButtonBase,
	Box,
	LinearProgress,
} from '@mui/material'
import Link from 'next/link'
import Image from 'next/image'
import close from '@/assets/img/close_burger.svg'
import useGetStats from '@/hooks/useGetStats'
import StatsBar from './StatsBar'

export default function BurgerMenu({ loggedIn, toggleBurgerMenu, burgerOpen }) {
	const mobileTabsLoggedIn = {
		cells: 'Dashboard',
		account: 'My Account',
		'account-settings': 'Account Settings',
		'my-cells': 'my cells',
		'real-cells': 'Real cells',
		faq: 'FAQ',
		about: 'about us',
		rules: 'rules',
		'privacy-policy': 'Privacy policy',
		help: 'help',
		contacts: 'contact us',
	}

	const mobileTabsNotLoggedIn = {
		about: 'about us',
		rules: 'rules',
		'privacy-policy': 'Privacy policy',
		help: 'help',
		contacts: 'contact us',
	}

	const tabs = loggedIn ? mobileTabsLoggedIn : mobileTabsNotLoggedIn

	const [stats, setStats] = useState({})
	const { getStats, data, loading, error, success } = useGetStats()

	useEffect(() => {
		const fetchData = async () => {
			try {
				await getStats()
			} catch (err) {
				console.error('Error fetching stats:', err)
			}
		}
		fetchData()
	}, [])

	useEffect(() => {
		if (data !== null && error === null) {
			setStats(data)
		}
	}, [data])
	const statsBar = useMemo(() => <StatsBar stats={stats} />, [stats])

	return (
		<Drawer anchor='top' open={burgerOpen} onClose={toggleBurgerMenu}>
			<Box
				style={{
					backgroundColor: '#E06B00',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<ButtonBase
					onClick={toggleBurgerMenu}
					style={{
						cursor: 'pointer',
						alignSelf: 'end',
						color: '#FFF',
						margin: '30px 30px 0 0',
					}}
				>
					<Image src={close.src} width={40} height={40} />
				</ButtonBase>
				<Box
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: 15,
						height: '100dvh',
					}}
				>
					{loading ? <LinearProgress /> : statsBar}

					<List
						style={{
							height: '100%',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'flex-start',
							background: '#E06B00',
						}}
					>
						{Object.keys(tabs).map((tab, index) => (
							<Link key={index} href={`/${tab}`}>
								<Typography variant='burger_tabs' onClick={toggleBurgerMenu}>
									{tabs[tab]}
								</Typography>
							</Link>
						))}
					</List>
				</Box>
			</Box>
		</Drawer>
	)
}
