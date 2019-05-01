const path = require('path');

class Loaders {
	constructor(rpginiaApp) {
		this._app = rpginiaApp;
		
		this._files = [];
	}

	async jsonFile(filePath) {
		const res = await fetch(path.normalize(filePath).replace(this._app._appPath, ''));
		const contentType = res.headers.get('content-type');
		
		let json = null;

		if (contentType && contentType.includes('application/json')) {
			json = await res.json();
		}
		else {
			throw new TypeError('File is not a JSON.');
		}

		const fileUrl = res.url;
		const ext = path.extname(fileUrl);
		const fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1).replace(`.${ext}`, '');

		const settings = {
			name: fileName,
			url: fileUrl,
			extension: ext,
			value: json
		};

		this._files.push(settings);

		if (this._app._environment === 'development') {
			console.info(`JSON file loaded!\nPath: ${fileUrl}`);
		}

		return this._files[this._files.length - 1];
	}
}

module.exports = Loaders;
