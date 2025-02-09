import {
	Container,
	useMediaQuery,
	Box,
	Typography,
	styled,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { fetchData } from '@/api/fetchData'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import AuthButton from './AuthButton'
const Login = dynamic(() => import('../Login'))
const Register = dynamic(() => import('../Register'))
const MyCells = dynamic(() => import('../../components/MyCells'))
const RealCells = dynamic(() => import('../../components/RealCells'))
const SideModal = dynamic(() => import('./SideModal'))
const ConfirmationModal = dynamic(() => import('./ConfirmationModal'))
import background from '../../assets/img/background.webp'
import georgia from '@/assets/img/Georgia.gif'
// import NewYearPage from './Garland/Garland'
import { Fireworks } from '@fireworks-js/react';

const token = Cookies.get('access_token')
const url = process.env.API_URL

const HolydayContainer = styled('div')`
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	z-index: 0;
	overflow: hidden;
	background: #00000050;
	width: 100%;
	height: 100vh;
`

const SnowfallContainer = styled('div')`
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	z-index: 0;
	overflow: hidden;
	background: #00000050;
	width: 100%;
	height: 100vh;
	filter: blur(500px);
`

const IndexWrapper = ({ children, ...props }) => {
	const [isLoginOpen, setIsLoginOpen] = useState(false)
	const [isRegisterOpen, setIsRegisterOpen] = useState(false)
	const router = useRouter()
	const dispatch = useDispatch()
	const loggedIn = useSelector(state => state.user.loggedIn)
	const isMobile = useMediaQuery('@media(max-width: 1300px)')
	const isLow = useMediaQuery('@media(min-height: 880px)')

	const [modalOpen, setModalOpen] = useState(false)
	const [actionToConfirm, setActionToConfirm] = useState(null)

	const handleOpenModal = action => {
		setActionToConfirm(() => action)
		setModalOpen(true)
	}

	const handleConfirmAction = () => {
		if (actionToConfirm) {
			actionToConfirm()
		}
		setModalOpen(false)
	}

	const toggleLogin = () => {
		setIsLoginOpen(!isLoginOpen)
	}
	const toggleRegister = () => {
		setIsRegisterOpen(!isRegisterOpen)
	}
	useEffect(() => {
		const fetchDataAsync = async () => {
			const user = await fetchData(`${url}/users/me`, token)
			if (user.data.deletedAt || user.data.isBlocked) {
				Cookies.remove('access_token')
				Cookies.remove('refresh_token')
				dispatch({ type: 'LOG_OUT' })
				router.push('/')
			}
		}
		fetchDataAsync()
	}, [])

	useEffect(() => {
		console.log(router.pathname)
		if (router.pathname === '/register') {
			handleOpenModal(() => null)
		}
	}, [router.pathname])

	return (
		<>
			<div
				style={{
					overflow: 'hidden auto',
					position: 'relative',
					background: `url(${background.src}) no-repeat center / cover`,
					height: '100%',
					minHeight: isLow ? 880 : '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					alignItems: 'center',
					boxShadow: `
						0 0 50px 50px rgba(0, 0, 0, 0.3)
						0 0 100px 100px rgba(0, 0, 0, 0.25)
						0 0 150px 150px rgba(0, 0, 0, 0.2)
						0 0 200px 200px rgba(0, 0, 0, 0.15)
					`
				}}
				className='ScrollbarWhite'
			>
				<HolydayContainer>
					<Image
						src={georgia.src}
						width={311}
						height={270}
						alt='georgia flag'
					/>
				</HolydayContainer>
				<Container
					className='ScrollbarDefault'
					style={{
						overflow: 'hidden auto',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: 20,
						height: '100%',
						minHeight: '100svh',
						width: '100%',
						justifyContent: 'space-between',
						zIndex: 1,
					}}
					{...props}
				>
					<Header loggedIn={loggedIn} />

					{isMobile && !loggedIn && (
						<Box
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								gap: 15,
								width: '100%',
							}}
						>
							<AuthButton
								onClick={() => router.push('/register')}
								style={{ width: '50%' }}
							>
								New members
							</AuthButton>
							<AuthButton
								onClick={() => router.push('/login')}
								style={{ background: '#63b6bb', width: '50%' }}
							>
								Log in
							</AuthButton>
						</Box>
					)}
					{children}
					<Footer loggedIn={loggedIn} />
				</Container>
				{!isMobile && (
					<>
						{loggedIn ? (
							<>
								<div
									style={{
										position: 'absolute',
										top: 0,
										left: 0,
										right: 0,
										bottom: 0,
										backgroundColor:
											isLoginOpen || isRegisterOpen
												? 'rgba(0, 0, 0, 0.2)'
												: 'transparent',
										transition: 'all .3s',
										pointerEvents:
											isLoginOpen || isRegisterOpen ? 'auto' : 'none',
										zIndex: 9,
									}}
									onClick={() => {
										setIsLoginOpen(false)
										setIsRegisterOpen(false)
									}}
								></div>
								<SideModal
									isLoginOpen={isLoginOpen}
									isRegisterOpen={isRegisterOpen}
									isRight={false}
								>
									<MyCells toggleOpen={toggleLogin} isLoginOpen={isLoginOpen} />
								</SideModal>
								<SideModal
									isLoginOpen={isLoginOpen}
									isRegisterOpen={isRegisterOpen}
									isRight={true}
								>
									<RealCells
										toggleOpen={toggleRegister}
										isRegisterOpen={isRegisterOpen}
									/>
								</SideModal>
							</>
						) : (
							<>
								<div
									style={{
										position: 'absolute',
										top: 0,
										left: 0,
										right: 0,
										bottom: 0,
										backgroundColor:
											isLoginOpen || isRegisterOpen
												? 'rgba(0, 0, 0, 0.2)'
												: 'transparent',
										transition: 'all .3s',
										pointerEvents:
											isLoginOpen || isRegisterOpen ? 'auto' : 'none',
										zIndex: 9,
									}}
									onClick={() => {
										setIsLoginOpen(false)
										setIsRegisterOpen(false)
									}}
								></div>
								<SideModal
									isLoginOpen={isLoginOpen}
									isRegisterOpen={isRegisterOpen}
									isRight={false}
								>
									<Login toggleOpen={toggleLogin} isLoginOpen={isLoginOpen} />
								</SideModal>
								<SideModal
									isLoginOpen={isLoginOpen}
									isRegisterOpen={isRegisterOpen}
									isRight={true}
								>
									<Register
										toggleOpen={() => {
											// !isRegisterOpen && handleOpenModal(() => null)
											toggleRegister()
										}}
										isRegisterOpen={isRegisterOpen}
									/>
								</SideModal>
							</>
						)}
					</>
				)}
			</div>
			<ConfirmationModal open={modalOpen} handleConfirm={handleConfirmAction}>
				<Typography
					variant='register_warn'
					style={{ fontSize: isMobile ? 13 : 17 }}
				>
					მოხარული ვართ მოგესალმოთ ჩვენს პროექტში! რეგისტრაციამდე, გთხოვთ
					დაემატოთ ჩვენს საპრეზენტაციო სასაუბროს (ჩათს) ტელეგრამში —
					<a href='https://t.me/+IJ9ZXZva1RwzNWY0' target='_blank'>
						https://t.me/+IJ9ZXZva1RwzNWY0
					</a>
					. <br />
					<br />
					ყურადღება! გთხოვთ, პლატფორმაზე არ განახორციელოთ რაიმე მოქმედება საიტის
					ადმინისტრატორის თანხლების გარეშე!!!
					<br /> <br />
					Мы рады приветствовать Вас в нашем проекте. Перед регистрацией
					присоединитесь, пожалуйста, к нашему презентационному чату в телеграме
					—{' '}
					<a href='https://t.me/+UEb5EYod-pw4ZmE8' target='_blank'>
						https://t.me/+UEb5EYod-pw4ZmE8
					</a>
					. <br />
					<br /> Внимание! Без сопровождения администратора сайта никаких
					действий на платформе не предпринимать!!!
				</Typography>
			</ConfirmationModal>
		</>
	)
}

export default IndexWrapper
