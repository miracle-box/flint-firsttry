const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ addComponents }) {
	addComponents([require('./typography.cjs')]);
});
