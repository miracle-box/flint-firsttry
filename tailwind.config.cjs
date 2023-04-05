/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			black: '#000000',
			white: '#ffffff',
			gray: {
				25: '#FCFCFD',
				50: '#F9FAFB',
				100: '#F2F4F7',
				200: '#EAECF0',
				300: '#D0D5DD',
				400: '#98A2B3',
				500: '#667085',
				600: '#475467',
				700: '#344054',
				800: '#1D2939',
				900: '#101828',
			},
			primary: {
				25: '#F5FBFF',
				50: '#F0F9FF',
				100: '#E0F2FE',
				200: '#B9E6FE',
				300: '#7CD4FD',
				400: '#36BFFA',
				500: '#0BA5EC',
				600: '#0086C9',
				700: '#026AA2',
				800: '#065986',
				900: '#0B4A6F',
			},
			error: {
				25: '#FFFBFA',
				50: '#FEF3F2',
				100: '#FEE4E2',
				200: '#FECDCA',
				300: '#FDA29B',
				400: '#F97066',
				500: '#F04438',
				600: '#D92D20',
				700: '#B42318',
				800: '#912018',
				900: '#7A271A',
			},
			warning: {
				25: '#FFFCF5',
				50: '#FFFAEB',
				100: '#FEF0C7',
				200: '#FEDF89',
				300: '#FEC84B',
				400: '#FDB022',
				500: '#F79009',
				600: '#DC6803',
				700: '#B54708',
				800: '#93370D',
				900: '#7A2E0E',
			},
			success: {
				25: '#F6FEF9',
				50: '#ECFDF3',
				100: '#D1FADF',
				200: '#A6F4C5',
				300: '#6CE9A6',
				400: '#32D583',
				500: '#12B76A',
				600: '#039855',
				700: '#027A48',
				800: '#05603A',
				900: '#054F31',
			},
		},
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
		},
		spacing: {
			px: '1px',
			0: '0px',
			1: '0.25rem',
			2: '0.5rem',
			3: '0.75rem',
			4: '1rem',
			5: '1.25rem',
			6: '1.5rem',
			8: '2rem',
			10: '2.5rem',
			12: '3rem',
			16: '4rem',
			20: '5rem',
			24: '6rem',
			32: '8rem',
			40: '10rem',
			48: '12rem',
			56: '14rem',
			64: '16rem',
		},
		ringWidth: {
			DEFAULT: '4px',
		},
		boxShadow: {
			xs: '0px 1px 2px rgba(16, 24, 40, 0.05)',
			sm: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)',
			md: '0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)',
			lg: '0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)',
			xl: '0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)',
			'2xl': '0px 24px 48px -12px rgba(16, 24, 40, 0.18)',
			'3xl': '0px 32px 64px -12px rgba(16, 24, 40, 0.14)',
		},
		blur: {
			none: '0',
			sm: '4px',
			md: '8px',
			lg: '12px',
			xl: '20px',
		},
		fontFamily: {
			sans: [
				'InterVariable',
				'Noto Sans SC',
				'system-ui',
				'-apple-system',
				'BlinkMacSystemFont',
				'Segoe UI',
				'Roboto',
				'Helvetica Neue',
				'Arial',
				'Noto Sans',
				'sans-serif',
				'Apple Color Emoji',
				'Segoe UI Emoji',
				'Segoe UI Symbol',
				'Noto Color Emoji',
			],
			mono: [
				'Fira Mono',
				'Noto Sans SC',
				'ui-monospace',
				'SFMono-Regular',
				'Menlo',
				'Monaco',
				'Consolas',
				'Liberation Mono',
				'Courier New',
				'monospace',
			],
		},
		fontSize: {
			'dp-xs': ['1.5rem', { lineHeight: '2rem' }],
			'dp-sm': ['1.875rem', { lineHeight: '2.375rem' }],
			'dp-md': ['2.25rem', { lineHeight: '2.75rem', letterSpacing: '-0.02em' }],
			'dp-lg': ['3rem', { lineHeight: '3.75rem', letterSpacing: '-0.02em' }],
			'dp-xl': ['3.75rem', { lineHeight: '4.5rem', letterSpacing: '-0.02em' }],
			'dp-2xl': ['4.5rem', { lineHeight: '5.625rem', letterSpacing: '-0.02em' }],
			xs: ['0.75rem', { lineHeight: '1.125rem' }],
			sm: ['0.875rem', { lineHeight: '1.25rem' }],
			md: ['1rem', { lineHeight: '1.5rem' }],
			lg: ['1.125rem', { lineHeight: '1.75rem' }],
			xl: ['1.25rem', { lineHeight: '1.875rem' }],
		},
		fontWeight: {
			regular: 400,
			medium: 500,
			semibold: 600,
			bold: 700,
		},
	},
	plugins: [require('./src/styles/index.cjs')],
};
