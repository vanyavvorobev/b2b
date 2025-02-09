import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, Typography, CircularProgress, useMediaQuery } from '@mui/material'

const Wrapper = ({ children, style, ...props }) => {
	const [loading, setLoading] = useState(true)
	const isMobile = useMediaQuery('@media(max-width:1300px)')
	const router = useRouter()

	useEffect(() => {
		const handleRouteChangeStart = () => {
			console.log('Route change started')
			setLoading(true)
		}
		const handleRouteChangeComplete = () => {
			console.log('Route change complete')
			setLoading(false)
		}

		router.events.on('routeChangeStart', handleRouteChangeStart)
		router.events.on('routeChangeComplete', handleRouteChangeComplete)
		router.events.on('routeChangeError', error => {
			console.error('Route change error:', error)
			setLoading(false)
		})

		return () => {
			router.events.off('routeChangeStart', handleRouteChangeStart)
			router.events.off('routeChangeComplete', handleRouteChangeComplete)
			router.events.off('routeChangeError', handleRouteChangeComplete)
		}
	}, [router.events])

	useEffect(() => {
		setLoading(false)
	}, [])

	const styles = {
		width: '100%',
		height: isMobile ? '100%' : '80dvh',
		maxHeight: isMobile ? 'unset' : '100%',
		minHeight: isMobile ? 'unset' : '1200px',
		background: 'linear-gradient(90deg, #E06B0050, #C03AFF50, #80F7FF50)', // Градиент фона
		border: 'solid 2px #b55bff',
		boxSizing: 'border-box',
		borderRadius: 20,
		overflow: 'hidden',
		padding: isMobile ? '10px 30px 20px' : '25px 10px 20px 30px',
		display: 'flex',
		flexDirection: 'column',
		gap: 30,
		...style,
	}
	
	return (
		<Box style={styles} {...props} className='ScrollbarDefault'>
			<Box style={{width: "100%"}}>
				<Box
					sx={{
						width: "100%",
						display: 'flex',
						alignItems: 'center',
						gap: 2,
					}}
				>
					<Typography
						variant='block_header'
						sx={{
							padding: '10px',
							alignSelf: 'start',
						}}
					>
						{props.header}
					</Typography>
					{loading && <CircularProgress size={24} />}
				</Box>
				<div
					style={{
						transform: 'translateX(-20px)',
						borderBottom: '3px solid #80f7ff',
						width: 100,
						marginLeft: 30
					}}
				/>
			</Box>
			{children}
		</Box>
	)
}

export default Wrapper
