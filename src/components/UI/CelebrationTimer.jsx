'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Box, Typography, useMediaQuery } from '@mui/material'
import baloons from '@/assets/img/baloons.svg'

const CelebrationTimer = () => {
	const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining())

	function calculateTimeRemaining() {
		const targetDate = new Date('2025-01-01T00:00:00+04:00')
		const now = new Date()

		let timeDiff = targetDate - now
		if (timeDiff < 0) {
			timeDiff = 0
		}

		const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
		const hours = Math.floor(
			(timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
		)
		const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
		const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)

		return { days, hours, minutes, seconds }
	}

	useEffect(() => {
		const timerInterval = setInterval(() => {
			setTimeRemaining(calculateTimeRemaining())
		}, 1000)

		return () => clearInterval(timerInterval)
	}, [])

	const isMobile = useMediaQuery('@media(max-width:1200px)')

	// Функция для добавления ведущих нулей
	const padNumber = number => String(number).padStart(2, '0')

	return (
		<Box
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				flexDirection: isMobile ? 'row' : 'column',
			}}
		>
			<style jsx global>{`
				@import url('https://fonts.googleapis.com/css2?family=Itim:wght@400&display=swap');
			`}</style>

			<Image src={baloons.src} width={60} height={60} alt='baloons' />
			<Typography
				fontFamily={`'Roboto', cursive`}
				style={{
					color: '#E06B00',
					fontSize: 20,
					fontWeight: 500,
				}}
			>
				{`${timeRemaining.days}:${padNumber(timeRemaining.hours)}:${padNumber(
					timeRemaining.minutes
				)}:${padNumber(timeRemaining.seconds)}`}
			</Typography>
		</Box>
	)
}

export default CelebrationTimer
