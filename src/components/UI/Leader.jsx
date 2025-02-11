import Image from 'next/image'
import UserAvatar from './UserAvatar'
import avatarBg from '@/assets/img/leader_avatar.svg'
import exclamation from '@/assets/img/exclamation.svg'
import { useMediaQuery } from '@mui/material'

export default function Leader({ style, onClick, avatar, isAllReturnPaid }) {
	const isMobile = useMediaQuery('@media(max-width: 400px)')
	return (
		<div
			onClick={onClick}
			style={{
				...style,
				background: `url(${avatarBg.src}) no-repeat center / cover`,
				width: isMobile ? '100px' : '168px',
				height: isMobile ? '116px' : '176px',
				cursor: 'pointer',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<UserAvatar
				avatarUrl={avatar}
				width={isMobile ? 90 : 148}
				height={isMobile ? 104 : 157}
				isLeader={true}
				style={{alignSelf: "center", justifySelf: "center", transform: "translateY(3%)"}}
			/>
			{isAllReturnPaid && (
				<div
					src={exclamation.src}
					style={{
						position: 'absolute',
						top: -15,
						right: 20,
						fontSize: 45,
						fontWeight: 700,
						color: '#FA0000',
					}}
				>
					!
				</div>
			)}
		</div>
	)
}
