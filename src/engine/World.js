class World {
	constructor(rpginiaApp) {
		this._app = rpginiaApp;
	
		this._levels = [];
		this._currentLevelId = null;
	}

	setLevel(levelObjOrName) {
		if (typeof levelObjOrName === 'object' && !Array.isArray(levelObjOrName)) {
			const searchedLevelId = this._levels.findIndex(level => level.settings.name === levelObjOrName.value.settings.name);

			// If level with typed name was found.
			if (searchedLevelId !== -1) {
				throw new Error(`Level with name "${levelObjOrName.value.settings.name}" is already exist!`);	
			}
			else {
				const level = levelObjOrName.value;

				const {settings, elements} = level;

				this._levels.push({
					id: this._levels.length,
					settings,
					elements
				});

				this._currentLevelId = this._levels[this._levels.length-1].id;

				if (this._app._environment === 'development') {
					console.info(`Level "${this._levels[this._currentLevelId].settings.name}" with ID ${this._levels[this._currentLevelId].id} is now active!`);
				}
			}
		}
		else if (typeof levelObjOrName === 'string') {
			const searchedLevelId = this._levels.findIndex(level => level.settings.name === levelObjOrName);

			// If level with typed name wasn't found.
			if (searchedLevelId === -1) {
				throw new Error(`Level with name "${levelObjOrName}" wasn't found!`);
			}
			else {
				this._currentLevelId = searchedLevelId;
			}
		}
		else {
			throw new TypeError('Argument should be a string or an object!');
		}
	}

	draw() {
		return false;
	}
}

module.exports = World;
