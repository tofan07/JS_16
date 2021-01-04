'use strict';

const path = require('path');

module.exports = {
	entry: './lesson30/src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'lesson30/dist'),
	},
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/env']
					},
				},
				exclude: /node_modules/,
			}
		]
	}
};
