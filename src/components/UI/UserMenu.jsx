import {
	ButtonBase,
	Button,
	Box,
	useMediaQuery,
	List,
	Typography,
} from '@mui/material'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import { useEffect, useState, useCallback } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import Image from 'next/image'
import { fetchData } from '@/api/fetchData'
import account from '@/assets/img/join_cell_bg.svg'
const UserAvatar = dynamic(() => import('./UserAvatar'))
import BurgerMenu from './BurgerMenu'
import logout from '@/assets/img/logout.svg'
import UserMenuDropdown from './UserMenuDropdown'
import DashboardIcon from '@/assets/img/menu/dashboard.jsx'
import AccountIcon from '@/assets/img/menu/my_account.jsx'
import SettingsIcon from '@/assets/img/menu/settings.jsx'
import FaqIcon from '@/assets/img/menu/faq.jsx'

const tabs = ['cells', 'account', 'account-settings', 'faq']
const tabNames = {
	cells: 'Dashboard',
	account: 'My Account',
	'account-settings': 'Account Settings',
	faq: 'FAQ',
}

export default function UserMenu() {
	const router = useRouter()
	const page = router.asPath.split('/')[1]
	const dispatch = useDispatch()
	const apiUrl = process.env.API_URL
	const token = Cookies.get('access_token')

	const [data, setData] = useState(null)
	const [open, setOpen] = useState(false)
	const [activeTab, setActiveTab] = useState(page)
	const [burgerOpen, setBurgerOpen] = useState(false)
	const isMobile = useMediaQuery('@media(max-width: 1300px)')

	const options = [
		{ title: 'About US', route: '/about' },
		{ title: 'rules', route: '/rules' },
		{ title: 'privacy policy', route: '/privacy-policy' },
		{ title: 'help', route: '/faq' },
		{ title: 'contact us', route: '/contacts' },
	]

	useEffect(() => {
		setActiveTab(page)
	}, [page])

	const handleTabClick = (tabName, callback) => {
		setActiveTab(tabName)
	}

	const getTabStyles = tabName => {
		return activeTab === tabName
			? { color: '#E06B00', textDecoration: 'underline' }
			: {}
	}

	const fetchDataAsync = useCallback(async () => {
		try {
			const response = await fetchData(`${apiUrl}/users/me`, token)
			setData(response?.data)
		} catch (error) {
			if (error.status === 401) {
				Cookies.remove('access_token')
				dispatch({ type: 'LOG_OUT' })
			}
			console.error('Error fetching data: ', error)
		}
	}, [apiUrl, token, dispatch])

	useEffect(() => {
		fetchDataAsync()
	}, [fetchDataAsync])

	const onExitClick = () => {
		Cookies.remove('access_token')
		Cookies.remove('refresh_token')
		dispatch({ type: 'LOG_OUT' })
		router.push('/')
	}

	const toggleBurgerMenu = () => {
		setBurgerOpen(!burgerOpen)
	}
	return (
		<>
			<Box
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					gap: isMobile ? 20 : 15,
					width: '100%',
				}}
			>
				{isMobile ? (
					<>
						<MenuIcon onClick={toggleBurgerMenu} />
						<BurgerMenu
							loggedIn={true}
							toggleBurgerMenu={toggleBurgerMenu}
							burgerOpen={burgerOpen}
						/>
					</>
				) : (
					<List
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							width: '100%',
							gap: 40,
						}}
					>
						{tabs.map((tab, index) => (
							<Link key={index} href={`/${tab}`}>
								<Typography
									variant='header_buttons'
									style={{
										display: 'flex',
										gap: 5,
										alignItems: 'center',
										...(activeTab === tab && {
											color: '#80F7FF',
											textDecoration: 'underline',
										}),
									}}
								>
									{tab === 'cells' && (
										<DashboardIcon
											fill={activeTab === tab ? '#80F7FF' : '#ffffff'}
										/>
									)}
									{tab === 'account' && (
										<AccountIcon
											fill={activeTab === tab ? '#80F7FF' : '#ffffff'}
										/>
									)}
									{tab === 'account-settings' && (
										<SettingsIcon
											fill={activeTab === tab ? '#80F7FF' : '#ffffff'}
										/>
									)}
									{tab === 'faq' && (
										<FaqIcon fill={activeTab === tab ? '#80F7FF' : '#ffffff'} />
									)}
									{tabNames[tab]}
								</Typography>
							</Link>
						))}
					</List>
				)}
				<Box style={{ display: 'flex', alignItems: 'center', gap: 10, color: "#ffffff" }}>
					<div
						style={{
							position: 'relative',
							width: '54px',
							height: '56px',
							backgroundImage: `url(${account.src})`,
							zIndex: 0,
							backgroundSize: 'cover',
							backgroundPosition: 'center',
							backgroundRepeat: 'no-repeat',
							display: 'flex',
							alignItems: 'end',
							paddingBottom: 2,
							justifyContent: 'center',
						}}
					>
						<UserAvatar
							previewImage={null}
							width={47}
							height={50}
							isClickable={true}
							avatarUrl='/users/me/photo'
						/>
					</div>
					{!isMobile && (
						<p>
							{data?.nickname.slice(0, 10)}
							{data?.nickname.length > 10 && '...'}
						</p>
					)}
				</Box>
				<Box style={{ padding: isMobile ? 20 : 0, display: 'flex', gap: 15 }}>
					{isMobile ? (
						<ButtonBase
							onClick={onExitClick}
							style={{ cursor: 'pointer', minWidth: 20, padding: 0, margin: 0, color: "#ffffff" }}
						>
							<Image src={logout.src} width={18} height={18} />
						</ButtonBase>
					) : (
						<>
							<UserMenuDropdown options={options} />
							<Button
								onClick={onExitClick}
								style={{ cursor: 'pointer', width: 20, padding: 0, margin: 0, color: "#ffffff" }}
							>
								<Image src={logout.src} width={18} height={18} />
							</Button>
						</>
					)}
				</Box>
			</Box>
		</>
	)
}
