import React, { useState } from 'react'
import { Typography, Menu, MenuItem, styled } from '@mui/material'

const StyledMenu = styled(Menu)(({ theme }) => ({
	'& .MuiList-root': {
		backgroundColor: 'EAEEE8',
		border: '1px solid #80f7ff',
		borderRadius: 5,
		marginTop: 2,
		width: '200px',
		padding: '5px 13px',
	},
}))

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
	'&.MuiMenuItem-root': {
		color: theme.palette.text.primary,
		textTransform: 'uppercase',
	},
	'&.MuiMenuItem-option': {
		color: 'orange',
		textTransform: 'uppercase',
	},
}))

const DropdownMenu = ({ buttonLabel, options }) => {
	const [anchorEl, setAnchorEl] = useState(null)

	const handleClick = event => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<div>
			<div onClick={options ? handleClick : null}>{buttonLabel}</div>
			{options && (
				<StyledMenu
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={handleClose}
				>
					{options.map((option, index) => (
						<StyledMenuItem key={index} onClick={handleClose}>
							<>
								{option.name && (
									<Typography variant='closed_cells'>
										{option.name} -{' '}
									</Typography>
								)}
								<Typography variant='closed_cells' style={{ color: '#008000' }}>
									{option.count}
								</Typography>
							</>
						</StyledMenuItem>
					))}
				</StyledMenu>
			)}
		</div>
	)
}

export default DropdownMenu
