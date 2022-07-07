module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./pages/*.{html,js,jsx}'
	],
	theme: {
		extend: {},
		fontFamily: {
			body: ['hubballi', 'sans-serif']
		},
		colors: {
			main: '#9901E0',
			slate: '#EEEEEE',
			black: '#555555',
			white: '#ffffff'
		}
	},
	plugins: []
};
