import React, { use } from 'react'
import {
	Box,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	useMediaQuery,
} from '@mui/material'
import AuthButton from './AuthButton'

const ConfirmationModal = ({
	open,
	handleClose,
	handleConfirm,
	title,
	isLoading,
	children,
}) => {
	const isMobile = useMediaQuery('@media(max-height:560px)')
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			BackdropProps={{
				style: {
					backdropFilter: 'grayscale(30%)',
				},
			}}
			PaperProps={{
				style: {
					background: `linear-gradient(90deg, #E06B00, #C03AFF, #80F7FF)`,
					borderRadius: 74,
					border: '5px solid #b55bff',
					overflow: 'hidden',
					padding: 15,
					aspectRatio: isMobile ? 'unset' : '1.1/1',
					minHeight: 400,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
				},
			}}
		>
			<DialogTitle style={{ color: '#fff', textAlign: 'center', fontSize: 25 }}>
				{title}
			</DialogTitle>
			<DialogContent
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'flex-start',
					overflow: 'auto',
				}}
			>
				<DialogContentText
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: isMobile ? 'flex-start' : 'center',
						width: '100%',
					}}
				>
					{children}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Box style={{ display: 'flex', gap: 10 }}>
					{handleClose && (
						<AuthButton
							onClick={handleClose}
							style={{
								background: '#FF0000',
								width: '100%',
							}}
						>
							Cancel
						</AuthButton>
					)}
					<Box
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						{isLoading ? (
							<CircularProgress />
						) : (
							<AuthButton
								onClick={handleConfirm}
								style={{
									background: '#119A48',
									width: '100%',
								}}
								autoFocus
							>
								Confirm
							</AuthButton>
						)}
					</Box>
				</Box>
			</DialogActions>
		</Dialog>
	)
}

export default ConfirmationModal
