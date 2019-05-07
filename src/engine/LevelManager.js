import Level from './Level';

class LevelManager {
	constructor(worldClass) {
		this._world = worldClass;

		this._levelList = [];
	}

	_toggleLevelActive(id = this._levelList.length - 1) {
		// TODO: do normal changing activiti.
		this._levelList[id]._isActive = !this._levelList[id]._isActive;
	}

	_getActiveLevelId() {
		return this._levelList.findIndex(level => level._isActive);
	}

	setLevel(levelObjOrName) {
		if (typeof levelObjOrName === 'object' && !Array.isArray(levelObjOrName)) {
			const searchedLevelId = this._levelList.findIndex(level => level.settings.name === levelObjOrName.value.settings.name);

			// If level with typed object was found.
			if (searchedLevelId !== -1) {
				throw new Error(`Level with name "${levelObjOrName.value.settings.name}" is already exist!`);
			}
			else {
				this._levelList.push(levelObjOrName.content);
				this._toggleLevelActive();

				if (this._world._app._environment === 'development') {
					console.info(`Level "${this._levelList[this._getActiveLevelId()].name}" with ID ${this._getActiveLevelId()} is now active!`);
				}
			}
		}
		else if (typeof levelObjOrName === 'string') {
			const searchedLevelId = this._levelList.findIndex(level => level.settings.name === levelObjOrName);

			// If level with typed name wasn't found.
			if (searchedLevelId === -1) {
				throw new Error(`Level with name "${levelObjOrName}" wasn't found!`);
			}
			else {
				this._currentLevelId = searchedLevelId;

				if (this._world._app._environment === 'development') {
					console.info(`Level "${this._levelList[this._currentLevelId].level.name}" with ID ${this._levelList[this._currentLevelId].id} is now active!`);
				}
			}
		}
		else {
			throw new TypeError('Argument should be a string or an object!');
		}
	}

	get currentLevel() {
		return this._levelList[this._levelList.findIndex(level => level._isActive)];
	}

	static get Level() { return Level; }
}

export default LevelManager;
