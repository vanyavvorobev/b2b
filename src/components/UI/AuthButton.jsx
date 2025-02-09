import { Button } from '@mui/material'
import { styled } from '@mui/system'

const StyledButton = styled(Button)`
	&& {
		cursor: pointer;
		color: #1b170f;
		font-family: Noto Sans;
		font-size: 20px;
		font-weight: 400;
		text-transform: uppercase;
		border-radius: 5px;
		background: #80f7ff;
		transition: 0.3s;
		&:hover {
			background: #75e1e8;
		}
		@media (max-width: 1300px) {
			font-size: 18px;
		}
		@media (max-width: 400px) {
			font-size: 16px;
		}
	}
`

export default function AuthButton({ children, ...props }) {
	return (
		<StyledButton type={props.type} style={props.style} onClick={props.onClick}>
			{children}
		</StyledButton>
	)
}
