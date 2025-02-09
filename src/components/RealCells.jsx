import { Box, CircularProgress, Typography, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import useCells from '@/hooks/useCells'
import dynamic from 'next/dynamic'
import Image from 'next/image'
const RealCell = dynamic(() => import('@/components/UI/RealCell'))
import refresh from '@/assets/img/refresh_dark.svg'

const numberOfLevels = 5

export default function RealCells({ toggleOpen, isRegisterOpen }) {
	const { getCells, loading } = useCells()
	const [data, setData] = useState(null)

	const fetchData = async () => {
		const tempData = []
		for (let i = 1; i <= numberOfLevels; i++) {
			const dataForLevel = await getCells('real_cells', { levelId: i })
			tempData.push(dataForLevel?.data || [])
		}
		setData(tempData)
	}
	const onRefreshClick = () => {
		setData(null)
		fetchData()
	}
	useEffect(() => {
		fetchData()
	}, [])

	return (
		<div
			style={{
				padding: '2% 20px',
				height: '100%',
				width: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				userSelect: 'none',
			}}
		>
			<Box
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: 10,
					alignItems: 'center',
					justifyContent: 'center',
					width: '100%',
				}}
			>
				{loading ? (
					<CircularProgress />
				) : (
					<>
						{data?.map((item, index) => (
							<RealCell key={index} data={item} />
						))}
					</>
				)}
			</Box>
			<Button onClick={onRefreshClick} style={{ cursor: 'pointer' }}>
				<Image src={refresh.src} width={35} height={35} alt='refresh' />
			</Button>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					justifySelf: 'end',
					position: 'relative',
					height: 50,
					width: 80,
				}}
			>
				<Typography
					variant='auth_head'
					gutterBottom
					onClick={toggleOpen}
					style={{
						transform: 'rotate(90deg) translateY(-80%) translateX(100%)',
						top: '-300%',
						left: '0%',
						alignSelf: 'end',
						right: 0,
						color: isRegisterOpen ? '#80F7FF' : '#1B170F',
						textShadow: isRegisterOpen
							? '1px 1px 2px #1B170F'
							: '1px 1px 2px #80F7FF',
					}}
				>
					Real Cells
				</Typography>
			</div>
		</div>
	)
}
