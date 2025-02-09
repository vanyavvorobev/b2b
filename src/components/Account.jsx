import { Box, Grid, Stack, Typography, useMediaQuery } from '@mui/material'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
const AuthButton = dynamic(() => import('./UI/AuthButton'))
const UserAvatar = dynamic(() => import('./UI/UserAvatar'))
import avatarBg from '@/assets/img/user_avatar_big.svg'

export default function Account({ onEditClick, data, lottery }) {
	console.log(lottery)
	const isMobile = useMediaQuery('@media(max-width:1300px)')
	const formatTelegramUrl = telegramHandle => {
		return telegramHandle.replace('@', '').replace(/\s+/g, '')
	}
	return (
		<Stack
			display={'flex'}
			flexDirection={'row'}
			flexWrap={'wrap'}
			width={'100%'}
			justifyContent={lottery ? 'space-between' : 'center'}
		>
			<Stack
				display={'flex'}
				column
				alignItems={lottery ? 'flex-start' : 'center'}
				gap={2}
			>
				<div
					style={{
						position: 'relative',
						width: '190px',
						height: '198px',
						backgroundImage: `url(${avatarBg.src})`,
						zIndex: 2,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
						display: 'flex',
						alignItems: 'end',
						paddingBottom: 7,
						justifyContent: 'center',
					}}
				>
					<UserAvatar
						previewImage={null}
						isClickable={true}
						clickUrl='/account-settings'
						avatarUrl='/users/me/photo'
						width={164}
						height={172}
					/>
				</div>
				<Box
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Typography variant='h6'>
						{data?.firstName} {data?.lastName}
					</Typography>
					<Typography variant='date'> date of birth: {data?.birth}</Typography>
				</Box>
				{/* <Grid
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						flexDirection: isMobile ? 'column' : 'row',
						gap: isMobile ? 0 : 60,
						width: isMobile ? '100%' : '50%',
					}}
				> */}
				{/* <Box
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: isMobile ? 'flex-start' : 'flex-end',
						}}
					> */}
				<Typography variant='user_key' display='flex' gap={1}>
					User #: <Typography variant='account_item'>{data?.id}</Typography>
				</Typography>
				<Typography variant='user_key' display='flex' gap={1}>
					Email: <Typography variant='account_item'>{data?.email}</Typography>
				</Typography>
				<Typography variant='user_key' display='flex' gap={1}>
					Country:{' '}
					<Typography variant='account_item'>{data?.country}</Typography>
				</Typography>
				{/* </Box> */}
				{/* <Box
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'flex-start',
						}}
					> */}
				<Typography variant='user_key' display='flex' gap={1}>
					Nickname:{' '}
					<Typography variant='account_item'>{data?.nickname}</Typography>
				</Typography>
				<Typography variant='user_key' display='flex' gap={1}>
					Phone: <Typography variant='account_item'>{data?.phone}</Typography>
				</Typography>
				<Typography variant='user_key' display='flex' gap={1}>
					Telegram:{' '}
					<Link
						href={`https://t.me/${formatTelegramUrl(data?.telegram || '')}`}
						target='_blank'
					>
						<Typography variant='account_item'>{data?.telegram}</Typography>
					</Link>
				</Typography>
				{/* </Box>
				</Grid> */}
				<AuthButton
					variant='contained'
					style={{ background: '#63b6bb' }}
					onClick={onEditClick}
				>
					Edit Account
				</AuthButton>
			</Stack>
			{lottery && (
				<Box
					style={{
						width: isMobile ? '100%' : '50%',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						gap: 20,
						overflowY: 'auto',
					}}
				>
					{lottery.map((card, index) => (
						<Image
							src={card}
							width={isMobile ? 250 : 595}
							height={isMobile ? 100 : 268}
							key={index}
						/>
					))}
				</Box>
			)}
		</Stack>
	)
}
