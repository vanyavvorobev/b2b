import { Box, Button, CircularProgress } from '@mui/material'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import useCells from '@/hooks/useCells'
import Wrapper from '../components/UI/Wrapper'
const RealCell = dynamic(() => import('@/components/UI/RealCell'))
import refresh from '@/assets/img/refresh_dark.svg'

const numberOfLevels = 5
export default function RealCells() {
	const { getCells, loading } = useCells()
	const [data, setData] = useState(null)

	const fetchData = async () => {
		const tempData = []
		for (let i = 1; i <= numberOfLevels; i++) {
			const dataForLevel = await getCells('real_cells', { levelId: i })
			tempData.push(dataForLevel?.data || [])
		}
		setData([tempData])
	}
	const onRefreshClick = () => {
		setData(null)
		fetchData()
	}
	useEffect(() => {
		fetchData()
	}, [])

	return (
		<Wrapper header={'Real Cells'}>
			<Box
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					gap: 35,
					height: '100%',
				}}
			>
				<Button onClick={onRefreshClick} style={{ cursor: 'pointer' }}>
					<Image src={refresh.src} width={35} height={35} alt='refresh' />
				</Button>
				<Box
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: 10,
						alignItems: 'center',
						justifyContent: 'center',
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
			</Box>
		</Wrapper>
	)
}
