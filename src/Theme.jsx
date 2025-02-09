import { createTheme, responsiveFontSizes } from '@mui/material/styles'

const theme = createTheme({
	overrides: {
		'*': {
			scrollBehavior: 'smooth',
		},
	},
	components: {
		MuiCheckbox: {
			styleOverrides: {
				root: {
					color: '#80f7ff',
					'&:hover': {
						backgroundColor: 'transparent',
					},
					'&.Mui-checked': {
						color: '#80f7ff',
					},
				},
			},
			defaultProps: {
				color: 'default',
			},
		},
		MuiSvgIcon: {
			styleOverrides: {
				root: {
					'&.MuiCheckbox-colorPrimary.Mui-checked': {
						color: '#000',
					},
				},
			},
		},
		MuiInputLabel: {
			styleOverrides: {
				root: {
					color: '#ceb2f2',
					'&.Mui-focused': {
						color: '#80f7ff',
					},
				},
			},
		},
		MuiInputBase: {
			styleOverrides: {
				input: {
					fontFamily: 'Noto Sans',
					fontSize: 16,
					fontWeight: 500,
					color: '#ffffff',
				},
			},
		},
		MuiInput: {
			styleOverrides: {
				underline: {
					'&:before': {
						borderBottom: '2px solid #ffffff',
					},
					'&:hover:not(.Mui-disabled):before': {
						borderBottom: '2px solid rgb(105, 204, 211)',
					},
					'&:after': {
						borderBottom: '2px solid #80f7ff',
					},
				},
			},
		},
	},

	palette: {
		primary: {
			main: '#80f7ff',
			contrastText: '#FFF',
		},
		secondary: {
			main: '#FFFFFFB2',
			contrastText: '#FFFFFFB2',
		},
	},
	button: {
		fontFamily: 'Noto Sans',
		fontSize: 20,
		allVariants: {
			cursor: 'default',
			fontSize: 20,
			fontWeight: 300,
			color: '#241f55',
			lineHeight: 1.55,
			zIndex: 2,
		},
		auth: {},
	},
	typography: {
		fontFamily: 'Noto Sans',
		fontSize: 14,
		button: {
			textTransform: 'none',
		},
		allVariants: {
			cursor: 'default',
			fontSize: 20,
			fontWeight: 300,
			color: '#241f55',
			lineHeight: 1.55,
		},
		body1: {
			fontFamily: 'Noto Sans',
			fontSize: 16,
			color: '#FFFFFF',
			fontWeight: 300,
		},
		main_head: {
			fontSize: 36,
			color: '#63b6bb',
			fontWeight: 400,
			textShadow: '1px 1px 1px rgba(0, 0, 0, 0.25)',
			textTransform: 'uppercase',
		},
		main_bottom_highlight: {
			color: '#FFFFFF',
			fontSize: 56,
			fontWeight: 900,
			textTransform: 'uppercase',
			'@media (max-width:1300px)': {
				fontSize: 30,
			},
		},
		main_bottom: {
			color: '#80f7ff',
			fontSize: 72,
			fontWeight: 700,
			letterSpacing: '-0.7px',
			textTransform: 'uppercase',
			'@media (max-width:1300px)': {
				fontSize: 40,
			},
		},
		auth_head: {
			display: 'block',
			position: 'absolute',
			left: 0,
			transform: 'rotate(-90deg) translateY(48%) translateX(25%)',
			whiteSpace: 'nowrap',
			width: '10%',
			height: '100%',
			fontSize: 40,
			fontWeight: 900,
			textTransform: 'uppercase',
			cursor: 'pointer',
			lineHeight: 1,
			userSelect: 'none',
			transition: '.3s',
		},
		footer_buttons: {
			cursor: 'pointer',
			color: '#1B170F',
			fontFamily: 'Noto Sans',
			fontSize: 16,
			fontWeight: 500,
			textTransform: 'uppercase',
			active: {
				color: '#75e1e8',
				textDecoration: 'underline',
			},
		},
		header_buttons: {
			cursor: 'pointer',
			color: '#ffffff',
			fontFamily: 'Noto Sans',
			fontSize: 16,
			fontWeight: 400,
			textDecoration: 'none',
			textTransform: 'uppercase',
			active: {
				color: '#E06B00',
			},
		},
		block_header: {
			color: '#ffffff',
			fontFamily: 'Noto Sans',
			fontSize: 42,
			fontWeight: 700,
			textTransform: 'uppercase',
			'@media (max-width:1300px)': {
				fontSize: 32,
			},
		},
		burger_tabs: {
			color: '#FFF',
			fontFamily: 'Noto Sans',
			fontSize: 22,
			fontWeight: 700,
			textTransform: 'uppercase',
		},
		level_small: {
			color: '#ce69ff',
			textAlign: 'center',
			fontFamily: 'Noto Sans',
			fontSize: 30,
			fontWeight: 700,
			textTransform: 'uppercase',
			padding: '0 10%',
			lineHeight: 1,
		},
		level_big: {
			color: '#FFF',
			textAlign: 'center',
			fontFamily: 'Noto Sans',
			fontSize: 36,
			fontWeight: 700,
			textTransform: 'uppercase',
		},
		my_cells_button: {
			cursor: 'pointer',
			color: '#ffffff',
			fontFamily: 'Noto Sans',
			fontSize: 32,
			fontWeight: 700,
			textDecoration: 'none',
			textTransform: 'uppercase',
			active: {
				color: '#80f7ff',
			},
			'@media(max-width:1300px)': {
				fontSize: 24,
			},
		},
		h6: {
			color: '#FFFFFF',
			fontFamily: ' Noto Sans',
			fontSize: 36,
			fontWeight: 700,
			textTransform: 'uppercase',
		},
		h6_light: {
			color: '#fff',
			fontFamily: ' Noto Sans',
			fontSize: 24,
			fontWeight: 700,
			textTransform: 'uppercase',
			'@media(max-width:1300px)': {
				color: '#1B170F',
			},
		},
		user_key: {
			color: '#FFFFFF',
			fontFamily: 'Noto Sans',
			fontSize: 20,	
			fontWeight: 400,
		},
		user_item: {
			color: '#8C7F77',
			fontFamily: 'Noto Sans',
			fontSize: 20,
			fontWeight: 700,
		},
		account_item: {
			color: '#119A48',
			fontFamily: 'Noto Sans',
			fontSize: 20,
			fontWeight: 700,
		},
		cell_user_key: {
			color: '#fff',
			fontFamily: 'Noto Sans',
			fontSize: 20,
			fontWeight: 400,
			'@media(max-width:1300px)': {
				color: '#1B170F',
			},
		},
		cell_user_item: {
			color: '#fff',
			fontFamily: 'Noto Sans',
			fontSize: 20,
			fontWeight: 700,
			textTransform: 'uppercase',
			'@media(max-width:1300px)': {
				color: '#1B170F',
			},
		},
		cell_user_subtext: {
			color: '#1b170f',
			fontFamily: 'Noto Sans',
			fontSize: 16,
			fontWeight: 400,
		},
		cell_id: {
			color: '#fff',
			fontFamily: 'Noto Sans',
			fontSize: 28,
			fontWeight: 700,
			textTransform: 'uppercase',
			lineHeight: 1,
		},
		cell_id_mobile: {
			color: '#1B170F',
			fontFamily: 'Noto Sans',
			fontSize: 28,
			fontWeight: 700,
			textTransform: 'uppercase',
			lineHeight: 1,
		},
		date: {
			color: '#FFFFFF',
			fontFamily: 'Noto Sans',
			fontSize: 18,
			fontWeight: 400,
		},
		forgot: {
			color: '#1B170F',
			fontFamily: 'Noto Sans',
			fontSize: 16,
			fontWeight: 400,
			display: 'flex',
			gap: 5,
		},
		active_cells: {
			color: '#119A48',
			fontFamily: 'Noto Sans',
			fontSize: 14,
			fontWeight: 400,
			textTransform: 'uppercase',
		},
		closed_cells: {
			color: '#1B170F',
			fontFamily: 'Noto Sans',
			fontSize: 14,
			fontWeight: 400,
			textTransform: 'uppercase',
		},
		level_dark: {
			color: '#FFFFFF',
			fontFamily: 'Noto Sans',
			fontSize: 24,
			fontWeight: 700,
			textTransform: 'uppercase',
		},
		my_cells_titles: {
			color: '#fff',
			fontFamily: 'Noto Sans',
			fontSize: 20,
			fontWeight: 700,
			textTransform: 'uppercase',
		},
		real_cells_queue: {
			textAlign: 'center',
			color: '#1b170f',
			fontFamily: 'Noto Sans',
			fontSize: 14,
			fontWeight: 700,
			textTransform: 'uppercase',
		},
		consultant_name: {
			color: '#80f7ff',
			fontFamily: 'Noto Sans',
			fontSize: 24,
			fontWeight: 700,
			lineHeight: 1.16,
			textTransform: 'uppercase',
		},
		consultant_header: {
			color: '#1B170F',
			fontFamily: 'Noto Sans',
			fontSize: 22,
			fontWeight: 400,
			lineHeight: 1.1,
		},
		consultant_label: {
			color: '#1B170F',
			fontFamily: 'Noto Sans',
			fontSize: 16,
			fontWeight: 400,
			lineHeight: 1,
		},
		consultant_data: {
			color: '#1B170F',
			fontFamily: 'Noto Sans',
			fontSize: 16,
			fontWeight: 700,
			textTransform: 'uppercase',
		},
		join_cells_titles: {
			color: '#fff',
			fontFamily: 'Noto Sans',
			fontSize: 17,
			fontWeight: 700,
			textTransform: 'uppercase',
		},
		join_cells_titles_mobile: {
			color: '#63b6bb',
			fontFamily: 'Noto Sans',
			fontSize: 16,
			fontWeight: 700,
			textTransform: 'uppercase',
			paddingLeft: 12,
		},
		join_cells: {
			color: '#EAEEE8',
			fontFamily: 'Noto Sans',
			fontSize: 13.5,
			fontWeight: 400,
			textTransform: 'uppercase',
		},
		closed_congrats: {
			background: 'linear-gradient(#ffa700, #ffeb25)',
			'-webkit-background-clip': 'text',
			'-moz-background-clip': 'text',
			backgroundClip: 'text',
			color: 'transparent',
			textShadow: '-3px -2px 1px #A5560F',
			fontFamily: 'Noto Sans',
			fontSize: 26,
			fontWeight: 700,
			textTransform: 'uppercase',
		},
		register_warn: {
			fontSize: 17,
			textTransform: 'none',
			color: '#fff',
			span: {
				color: '#fff',
				fontWeight: 700,
			},
			a: {
				color: '#fff',
				textDecoration: 'underline',
			},
		},
	},
})

const responsiveTheme = responsiveFontSizes(theme, {
	breakpoints: ['xs', 'sm', 'md', 'lg', 'xl'],
	factor: 4,
})

export default responsiveTheme
