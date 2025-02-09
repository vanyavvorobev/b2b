import { Button, Typography, styled } from '@mui/material'
import { South } from '@mui/icons-material'
export default function DropdownLabel({ name, title }) {
	const StatButton = styled(Button)({
		display: 'flex',
		alignItems: 'center',
		cursor: 'pointer',
		gap: 5,
		width: '100%',
		maxWidth: 240,
		minWidth: 210,
		color: '#23201C',
		textAlign: 'center',
		textShadow: '1px 1px 1px #fff',
		fontFamily: 'Noto Sans',
		fontSize: '14px',
		fontWeight: 400,
		textTransform: 'uppercase',
		borderRadius: '5px',
		border: '1px solid #80f7ff',
		background: '#EAEEE8',
		cursor: 'pointer',
		transition: '.3s',
		'&:hover': {
			border: '1px solid #80f7ff',
			background: "#dAdEd8"
		},
		'&:disabled': {
			cursor: 'not-allowed',
			color: 'rgb(123, 123, 122)',
			border: '1px solid rgba(217, 217, 217, 0.2)',
			background: 'rgba(217, 217, 217, 0.2)',
		},
		p: {
			color: '#008000',
			fontSize: 16,
			fontWeight: 700,
		},
	})

	return (
		<StatButton variant='outline'>
			{name !== null && (
				<Typography variant='footer_buttons'>{name} - </Typography>
			)}
			<p> {title}</p>
			<South style={{ transform: 'scale(0.8)' }} />
		</StatButton>
	)
}
