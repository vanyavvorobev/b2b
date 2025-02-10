import React, { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { Box, Typography, useMediaQuery, LinearProgress } from '@mui/material'
import useGetStats from '@/hooks/useGetStats'
import StatsBar from '@/components/UI/StatsBar'
import main from '../assets/img/main.webp'

export default function MainPage() {
	const [stats, setStats] = useState({})
	const isMobile = useMediaQuery('@media(max-width:1300px)')
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
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				gap: 10,
				alignItems: 'center',
				width: '100%',
				height: '100%',
				userSelect: 'none',
			}}
		>
			{isMobile && (loading ? <LinearProgress /> : statsBar)}

			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					width: isMobile ? '70%' : '60%',
					margin: isMobile ? '0' : '0 auto',
				}}
			>
				{/* <Typography
					variant='main_head'
					style={{
						marginBottom: isMobile ? '0' : '-12%',
						marginLeft: isMobile ? '0' : '-5%',
						alignSelf: isMobile ? 'center' : 'start',
					}}
				>
					We are 3000+
				</Typography> */}
				<Image
					src={main.src}
					width={isMobile ? 245 : 672}
					height={isMobile ? 175 : 482}
				/>
				{/* <div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignSelf: isMobile ? 'center' : 'end',
						marginRight: isMobile ? '0' : '-35%',
						marginTop: isMobile ? '0' : '-14%',
						textAlign: isMobile ? 'center' : 'unset',
					}}
				>
					<Typography variant='main_bottom_highlight' component={'h6'}>
						Opportunities
					</Typography>
					<Typography variant='main_bottom' component={'h6'}>
						For everyone
					</Typography>
				</div> */}
			</div>
		</div>
	)
}
