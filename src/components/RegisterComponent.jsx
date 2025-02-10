import {
	Checkbox,
	Box,
	Grid,
	TextField,
	Select,
	Typography,
	FormControl,
	InputLabel,
	MenuItem,
	useMediaQuery,
	InputAdornment,
	IconButton,
	CircularProgress,
} from '@mui/material'
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined'
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined'
import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import ReCAPTCHA from 'react-google-recaptcha'
import useRegister from '@/hooks/useRegister'
const AuthButton = dynamic(() => import('./UI/AuthButton'))

import countryList from '@/countryList'
import countryCodes from '@/countryCodes'

export default function RegisterComponent() {
	const captchaKey = process.env.CAPTCHA_KEY

	const { register, loading, error, success } = useRegister()
	const [validationErrors, setValidationErrors] = useState({})
	const [hasAgreedToPrivacyPolicy, setHasAgreedToPrivacyPolicy] =
		useState(false)
	const [iconColors, setIconColors] = useState({
		name: '#8C7F77',
		lastName: '#8C7F77',
		nickname: '#8C7F77',
		email: '#8C7F77',
		phone: '#8C7F77',
		country: '#8C7F77',
		date: '#8C7F77',
		telegram: '#8C7F77',
		password: '#8C7F77',
		confirmPassword: '#8C7F77',
	})
	const [captchaValue, setCaptchaValue] = useState(null)

	const [telegram, setTelegram] = useState(null)
	const [countryCode, setCountryCode] = useState('+1')

	const handleChange = e => {
		const inputValue = e.target.value
		if (inputValue.startsWith('@')) {
			setTelegram(inputValue)
		} else {
			setTelegram(null)
		}
	}

	const handleCaptchaChange = value => {
		setCaptchaValue(value)
	}

	const handleCountryCodeChange = event => {
		setCountryCode(event.target.value)
	}

	const handleIconFocus = iconName => {
		setIconColors(prevColors => ({ ...prevColors, [iconName]: 'action' }))
	}

	const handleIconBlur = iconName => {
		setIconColors(prevColors => ({ ...prevColors, [iconName]: '#8C7F77' }))
	}

	const validateDateOfBirth = date => {
		const birthDate = new Date(date)
		const today = new Date()
		const year1900 = new Date('1900-01-01')
		const sixteenYearsAgo = new Date(
			today.getFullYear() - 16,
			today.getMonth(),
			today.getDate()
		)
		return birthDate >= year1900 && birthDate <= sixteenYearsAgo
	}

	const validateName = name =>
		/^[a-zA-Z\u0400-\u04FF\u10A0-\u10FF\s]+$/.test(name)

	const validatePassword = password => {
		return (
			password.length >= 8 &&
			/[a-zA-Z]/.test(password) &&
			/[0-9]/.test(password)
		)
	}

	const validatePhone = phone => {
		return /^\+?[0-9]{0,1}[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
	}

	const handleSubmit = async event => {
		event.preventDefault()

		const formData = {
			firstName: event.target.name.value,
			lastName: event.target.lastName.value,
			nickname: event.target.nickname.value,
			country: event.target.country.value,
			phone: String(countryCode + event.target.phone.value),
			telegram: telegram,
			birth: event.target.date.value,
			email: event.target.email.value.toLowerCase(),
			password: event.target.password.value,
			passwordConfirmation: event.target.confirm_password.value,
		}
		const errors = {}
		if (!validateDateOfBirth(formData.birth)) {
			errors.birth =
				'Invalid date of birth. It should be between 1900 and 16 years ago.'
		}

		if (!validateName(formData.firstName)) {
			errors.firstName =
				'Invalid first name. Only alphabets and spaces are allowed.'
		}

		if (!validateName(formData.lastName)) {
			errors.lastName =
				'Invalid last name. Only alphabets and spaces are allowed.'
		}

		if (formData.nickname.length > 25) {
			errors.nickname = 'Invalid nickname. It must be shorter than 25 symbols.'
		}

		if (
			!formData.phone ||
			formData.phone === '' ||
			!validatePhone(formData.phone)
		) {
			errors.phone = 'Please enter your phone number.'
		}
		if (!formData.telegram || formData.telegram === '' || telegram === '@') {
			errors.telegram = 'Please enter your telegram.'
		}
		if (!validatePassword(formData.password)) {
			errors.password =
				'Password must be at least 8 characters long, with at least one digit and one letter.'
		}

		if (formData.password !== formData.passwordConfirmation) {
			errors.password = 'Passwords do not match.'
		}

		if (!hasAgreedToPrivacyPolicy) {
			errors.checkbox = 'You must agree to the privacy policy.'
		}

		if (!captchaValue) {
			errors.captcha = 'Please pass captcha'
		}

		if (Object.keys(errors).length > 0) {
			setValidationErrors(errors)
			return
		}
		console.log(validationErrors)
		register(formData)
	}
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)

	const handlePasswordToggle = () => {
		setShowPassword(prevShow => !prevShow)
	}

	const handleConfirmPasswordToggle = () => {
		setShowConfirmPassword(prevShow => !prevShow)
	}
	const isMobile = useMediaQuery('@media(max-width:1300px)')
	const showRegistration = true
	return (
		<>
			<Box
				style={{
					width: '75%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					gap: 20,
				}}
			>
				{showRegistration ? (
					<form
						onSubmit={handleSubmit}
						style={{
							width: '100%',
							display: 'flex',
							flex: '3',
							flexDirection: 'column',
							gap: 5,
						}}
					>
						<Box
							item
							xs={12}
							style={{
								display: 'flex',
								gap: isMobile ? 5 : 20,
								width: '100%',
								flexDirection: isMobile ? 'column' : 'row',
							}}
						>
							<TextField
								label={
									<Box
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: 5,
										}}
									>
										<PermIdentityOutlinedIcon sx={{ color: iconColors.name }} />
										Name
									</Box>
								}
								variant='standard'
								fullWidth
								type='text'
								name='name'
								onFocus={() => handleIconFocus('name')}
								onBlur={() => handleIconBlur('name')}
							/>
							<TextField
								label={
									<Box
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: 5,
										}}
									>
										<PersonAddOutlinedIcon
											sx={{ color: iconColors.lastName }}
										/>
										Last Name
									</Box>
								}
								variant='standard'
								fullWidth
								type='text'
								name='lastName'
								onFocus={() => handleIconFocus('lastName')}
								onBlur={() => handleIconBlur('lastName')}
							/>
						</Box>
						<Box
							item
							xs={12}
							style={{
								display: 'flex',
								gap: isMobile ? 5 : 20,

								width: '100%',
								flexDirection: isMobile ? 'column' : 'row',
							}}
						>
							<TextField
								label={
									<Box
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: 5,
										}}
									>
										<PermContactCalendarOutlinedIcon
											sx={{ color: iconColors.nickname }}
										/>
										Nickname
									</Box>
								}
								variant='standard'
								fullWidth
								type='nickname'
								name='nickname'
								onFocus={() => handleIconFocus('nickname')}
								onBlur={() => handleIconBlur('nickname')}
							/>
							<TextField
								label={
									<Box
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: 5,
										}}
									>
										<EmailOutlinedIcon sx={{ color: iconColors.email }} />
										Email
									</Box>
								}
								variant='standard'
								fullWidth
								type='email'
								name='email'
								onFocus={() => handleIconFocus('email')}
								onBlur={() => handleIconBlur('email')}
							/>
						</Box>
						<Box
							item
							xs={12}
							style={{
								display: 'flex',
								gap: isMobile ? 15 : 20,
								width: '100%',
								flexDirection: isMobile ? 'column' : 'row',
							}}
						>
							<Box
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: 5,
									width: '100%',
								}}
							>
								<FormControl
									variant='standard'
									sx={{ minWidth: 95, width: '30%' }}
								>
									<InputLabel id='country-code-label'>Code</InputLabel>
									<Select
										labelId='country-code-label'
										value={countryCode}
										onChange={handleCountryCodeChange}
									>
										{countryCodes.map((code, index) => (
											<MenuItem value={code.dial_code} key={index} style={{color: "black"}}>
												{code.code} {code.dial_code}
											</MenuItem>
										))}
									</Select>
								</FormControl>
								<TextField
									label={
										<Box
											style={{
												display: 'flex',
												alignItems: 'center',
												gap: 5,
											}}
										>
											<PhoneOutlinedIcon sx={{ color: iconColors.phone }} />
											Phone
										</Box>
									}
									variant='standard'
									fullWidth
									type='tel'
									name='phone'
									onFocus={() => handleIconFocus('phone')}
									onBlur={() => handleIconBlur('phone')}
								/>
							</Box>

							<FormControl fullWidth variant='standard'>
								<InputLabel htmlFor='country-select'>
									<Box
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: 5,
										}}
									>
										<LanguageOutlinedIcon sx={{ color: iconColors.country }} />
										Your Country
									</Box>
								</InputLabel>
								<Select label='Your Country' id='country-select' name='country'>
									{countryList.map(country => (
										<MenuItem key={country.code} value={country.name} style={{color: "black"}}>
											{country.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Box>
						<Box
							item
							xs={12}
							style={{
								display: 'flex',
								gap: isMobile ? 5 : 20,
								marginTop: isMobile ? 10 : 0,
								width: '100%',
								height: '100%',
								flexDirection: isMobile ? 'column' : 'row',
							}}
						>
							<TextField
								label={
									<Box
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: 5,
										}}
									>
										<CalendarMonthOutlinedIcon
											sx={{ color: iconColors.birth }}
										/>
										Date of birth
									</Box>
								}
								variant='standard'
								fullWidth
								type='date'
								name='date'
								InputLabelProps={{ shrink: true }}
								onFocus={() => handleIconFocus('birth')}
								onBlur={() => handleIconBlur('birth')}
							/>

							<TextField
								label={
									<Box
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: 5,
										}}
									>
										<SendOutlinedIcon sx={{ color: 'iconColors.telegram' }} />
										Telegram
									</Box>
								}
								variant='standard'
								fullWidth
								type='text'
								name='telegram'
								value={telegram}
								onChange={handleChange}
								onFocus={() => {
									handleIconFocus('telegram')
									setTelegram('@')
								}}
								onBlur={() => {
									handleIconBlur('telegram')
								}}
							/>
						</Box>
						<Box
							item
							xs={12}
							style={{
								display: 'flex',
								gap: isMobile ? 5 : 20,
								width: '100%',
								height: '100%',
								flexDirection: isMobile ? 'column' : 'row',
							}}
						>
							<TextField
								label={
									<Box
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: 5,
										}}
									>
										<LockOutlinedIcon sx={{ color: iconColors.password }} />
										Password
									</Box>
								}
								variant='standard'
								fullWidth
								type={showPassword ? 'text' : 'password'}
								name='password'
								InputProps={{
									endAdornment: (
										<InputAdornment position='end'>
											<IconButton onClick={handlePasswordToggle}>
												{showPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									),
								}}
								onFocus={() => handleIconFocus('password')}
								onBlur={() => handleIconBlur('password')}
							/>
							<TextField
								label={
									<Box
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: 5,
										}}
									>
										<LockOutlinedIcon
											sx={{ color: iconColors.confirmPassword }}
										/>
										Confirm Password
									</Box>
								}
								variant='standard'
								fullWidth
								type={showConfirmPassword ? 'text' : 'password'}
								name='confirm_password'
								InputProps={{
									endAdornment: (
										<InputAdornment position='end'>
											<IconButton onClick={handleConfirmPasswordToggle}>
												{showConfirmPassword ? (
													<VisibilityOff />
												) : (
													<Visibility />
												)}
											</IconButton>
										</InputAdornment>
									),
								}}
								onFocus={() => handleIconFocus('confirmPassword')}
								onBlur={() => handleIconBlur('confirmPassword')}
							/>
						</Box>
						<Box
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								width: '100%',
								flex: 1,
								flexDirection: isMobile ? 'column' : 'row',
							}}
						>
							<Grid
								item
								style={{
									width: '50%',
									display: 'flex',
									justifyContent: 'center',
								}}
							>
								<div style={{ transform: 'scale(0.8)' }}>
									<ReCAPTCHA
										sitekey={captchaKey}
										theme='light'
										size='normal'
										onChange={handleCaptchaChange}
									/>
								</div>
							</Grid>

							<Grid
								item
								style={{
									display: 'flex',
									flexDirection: 'column',
									width: isMobile ? '100%' : '50%',
									gap: 10,
								}}
							>
								<Box style={{ display: 'flex', alignItems: 'center' }}>
									<Checkbox
										name='confirm'
										color='primary'
										checked={hasAgreedToPrivacyPolicy}
										onChange={e =>
											setHasAgreedToPrivacyPolicy(e.target.checked)
										}
									/>
									<Typography variant='forgot'>
										Agree with{' '}
										<Link
											href='privacy-policy'
											style={{ color: '#63b6bb', textDecoration: 'underline' }}
										>
											Privacy policy
										</Link>
									</Typography>
								</Box>
								<Box
									style={{
										display: 'flex',
										width: '100%',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									{loading ? (
										<CircularProgress />
									) : (
										<AuthButton type='submit' style={{ width: '100%' }}>
											Register
										</AuthButton>
									)}
								</Box>
							</Grid>
						</Box>
					</form>
				) : (
					<p style={{ fontSize: '1.25rem' }}>
						კერძო დახურულ მოძრაობაზე (წრიულზე) გადასვლასთან დაკავშირებით,
						პროექტში რეგისტრაციები შეწყვეტილია.
						<br />  <br /> В связи с переходом на закрытую частную систему
						(закольцовку), регистрации в проекте прекращены!
					</p>
				)}
				{validationErrors.captcha && <div style={{color: "white"}}>{validationErrors.captcha}</div>}
				{validationErrors.birth && <div style={{color: "white"}}>{validationErrors.birth}</div>}
				{validationErrors.phone && <div style={{color: "white"}}>{validationErrors.phone}</div>}
				{validationErrors.firstName && <div style={{color: "white"}}>{validationErrors.firstName}</div>}
				{validationErrors.telegram && <div style={{color: "white"}}>{validationErrors.telegram}</div>}
				{validationErrors.lastName && <div style={{color: "white"}}>{validationErrors.lastName}</div>}
				{validationErrors.nickname && <div style={{color: "white"}}>{validationErrors.nickname}</div>}
				{validationErrors.password && <div style={{color: "white"}}>{validationErrors.password}</div>}
				{validationErrors.checkbox && <div style={{color: "white"}}>{validationErrors.checkbox}</div>}
				{error && <div>{error}</div>}
				{success && (
					<div>
						Successfully registered! Confirm your email address, then you can
						enter your account
					</div>
				)}
			</Box>
		</>
	)
}
