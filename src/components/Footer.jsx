import { useMediaQuery, LinearProgress, styled } from '@mui/material'

import { useState, useEffect, useMemo } from 'react'
import Socials from './UI/Socials'
import StatsBar from './UI/StatsBar'
import useGetStats from '@/hooks/useGetStats'

const FooterEl = styled('footer')(({ isMobile }) => ({
	width: '100%',
	minHeight: '80px',
	marginBottom: '12px',
	borderRadius: '20px',
	padding: '16px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: isMobile ? 'center' : 'space-between',
	alignSelf: 'end',
	justifySelf: 'end',
	userSelect: 'none',
	overflow: 'hidden',
	position: 'relative',
	background: 'linear-gradient(90deg, #E06B0050, #C03AFF50, #80F7FF50)', // Градиент фона
	border: 'solid 2px #b55bff',
	boxSizing: 'border-box'
}));

export default function Footer() {
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

	const isMobile = useMediaQuery('@media(max-width:1300px)')
	const statsBar = useMemo(() => <StatsBar stats={stats} />, [stats])

	return (
		<FooterEl isMobile={isMobile}>
			{isMobile ? <div /> : loading ? <LinearProgress /> : statsBar}
			<div>
				<Socials width={isMobile ? 30 : 40} height={isMobile ? 30 : 40} />
			</div>
		</FooterEl>
	)
}
