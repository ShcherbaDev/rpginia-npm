import * as path from 'path';

/**
 * Class for loading resources files.
 * @memberof RPGinia
 */
class Loaders {
	/**
	 * @constructor
	 * @param {RPGinia} rpginiaApp - RPGinia app.
	 */
	constructor(rpginiaApp) {
		this._app = rpginiaApp;
		
		this._files = [];
	}

	async _loadJsonFile(jsonFilePath, type = 'json') {
		const res = await fetch(path.normalize(jsonFilePath));
		const contentType = res.headers.get('content-type');
		
		let jsonContent = null;

		if (contentType && contentType.includes('application/json')) {
			jsonContent = await res.json();
		}
		else {
			throw new TypeError('File extension is not a .json');
		}

		const fileUrl = res.url;
		const ext = path.extname(fileUrl);
		const fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1).replace(ext, '');

		const settings = {
			name: fileName,
			type,
			url: fileUrl,
			extension: ext,
			content: jsonContent
		};

		this._files.push(settings);

		if (this._app._environment === 'development') {
			console.info(`${type.toUpperCase()} file loaded!\nURL: ${fileUrl}`);
		}

		return this._files[this._files.length - 1];
	}

	async _loadLevelJsFile(levelPath) {
		const fileName = levelPath.substring(levelPath.lastIndexOf('/') + 1).replace('.js', '');

		const res = await fetch(path.normalize(`${fileName}.bundle.js`));
		const filePath = res.url;
		const contentType = res.headers.get('content-type');

		let LevelJsClassContent = null;

		if (contentType && contentType.includes('application/javascript')) {
			LevelJsClassContent = window.eval(await res.text()).default;
		}
		else {
			throw new TypeError('File extension is not a .js');
		}

		const settings = {
			name: fileName,
			type: 'level',
			url: filePath,
			extension: '.js',
			content: new LevelJsClassContent()
		};

		this._files.push(settings);

		if (this._app._environment === 'development') {
			console.info(`LEVEL with name "${settings.content.name}" loaded!\nURL: ${filePath}`);
		}

		return this._files[this._files.length - 1];
	}

	async loadJson(filePath) {
		const content = await this._loadJsonFile(filePath);
		return content;
	}

	async loadSpriteSheet(spriteSheetPath) {
		const content = await this._loadJsonFile(spriteSheetPath, 'spriteSheet');
		return content;
	}

	async loadLevel(levelPath) {
		const content = await this._loadJsonFile(levelPath);
		return content;
	}

	get files() { return this._files; }
}

export default Loaders;
