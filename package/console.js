const boxen = require('boxen');

const {log} = console;

const rpginiaInfoHeader = 'RPGinia - Information\n─────────────────────\n';

module.exports = {
	info: (text = '...') => {
		log(
			boxen(`${rpginiaInfoHeader}${text}`, {
				padding: 1,
				margin: 0,
				borderStyle: 'double',
				borderColor: 'blue'
			})
		);

		return text;
	}
};
