import React from 'react'
import background from '../../assets/img/join_cell.svg'
import backgroundReverse from '../../assets/img/join_cell_reverse.svg'
import Image from 'next/image'
import { Button, Typography, Box, useMediaQuery } from '@mui/material'
import Link from 'next/link'

export default function Cell({
	bee,
	join,
	canJoin,
	level,
	price,
	index,
	onJoinClick,
}) {
	const isMobile = useMediaQuery('@media(max-width: 1300px)')
	return (
		<Box
			style={{
				position: "relative",
				display: 'flex',
				flexDirection: index % 2 === 1 ? 'column-reverse' : "column",
				alignItems: 'center',
				justifyContent: index % 2 === 1 ? 'center' : 'center',
				gap: 10,
				minWidth: isMobile ? '100%' : '60%',
				minHeight: '33vh',
				background: `url(${index % 2 === 1 ? backgroundReverse.src : background.src})  center / contain no-repeat`,
				paddingBottom: index === 3 || index === 4 ? 20 : 0,
				transform: isMobile ? "" : `translateX(${index * -45}%)`,
				// cursor: canJoin ? 'pointer' : 'default',
			}}
		>
			<Box
				style={{
					width: isMobile ? '75px' : 'fit-content',
					height: isMobile ? '90px' : '120px',
					transform: isMobile ? `translateY(-2%)` : `translateY(-15%)`,
					transform:
						index === 3 || index === 4 ? 'translateY(0%)' : `translateY(-15%)`,
				}}
			>
				{/* <Image
					src={bee}
					alt='cell'
					style={{ objectFit: 'cover', width: '100%', height: '100%' }}
				/> */}
			</Box>
			{canJoin ? (
				<Link
					href={`cells/${join}`}
				>
					<Button
						variant='outlined'
						onClick={onJoinClick}
						style={{
							maxWidth: 150,
							color: '#ce69ff',
							textAlign: 'center',
							textShadow: '1px 1px 1px #FFF',
							fontFamily: 'Noto Sans',
							fontSize: 24,
							fontWeight: 900,
							textTransform: 'uppercase',
							borderRadius: 5,
							border: '1px solid #ce69ff',
							background: 'rgba(217, 217, 217, 0.00)',
							cursor: 'pointer',
							transform: isMobile ? "" : `translateX(15%) translateY(${index % 2 === 1 ? "-150%" : "180%"})`
						}}
					>
						JOIN
					</Button>
				</Link>
			) : (
				<div style={{ height: 0 }} />
			)}
			<Typography variant='level_small' component={'h6'} style={{transform: isMobile ? "" : `translateX(5%) translateY(${index % 2 === 1 ? "-250%" : "300%"})`}}>
				{level} {price}$
			</Typography>
		</Box>
	)
}
