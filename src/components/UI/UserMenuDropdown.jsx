import Image from 'next/image'
import React, { useState } from 'react'
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import en from '@/assets/img/en.png'
import ge from '@/assets/img/ge.png'
import ru from '@/assets/img/ru.png'
import { useRouter } from 'next/router'

export default function UserMenuDropdown({ buttonLabel, options }) {
	const router = useRouter()
	const [anchorEl, setAnchorEl] = useState(null)

	const handleClick = event => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const handleOptionClick = route => {
		router.push(route)
		handleClose()
	}

	return (
		<Box
			style={{ display: 'flex', justifyContent: 'flex-start', maxWidth: 10 }}
		>
			<Button
				aria-controls='dropdown-menu'
				aria-haspopup='true'
				onClick={handleClick}
				endIcon={<ArrowDropDownIcon />}
				style={{
					textTransform: 'uppercase',
					color: 'black',
					cursor: 'pointer',
					width: '100%',
					padding: 0,
					justifyContent: 'space-between',
				}}
			>
				{buttonLabel}
			</Button>
			<Menu
				id='dropdown-menu'
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				{options.map((option, index) => (
					<MenuItem key={index} onClick={() => handleOptionClick(option.route)}>
						<Typography variant='closed_cells'>{option.title}</Typography>
					</MenuItem>
				))}
				<MenuItem>
					<Box style={{ display: 'flex', gap: 10 }}>
						<Image src={en.src} width={32} height={24} />
						<Image src={ge.src} width={32} height={24} />
						<Image src={ru.src} width={32} height={24} />
					</Box>
				</MenuItem>
			</Menu>
		</Box>
	)
}
