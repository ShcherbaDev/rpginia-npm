import LevelManager from './LevelManager';

class World {
	constructor(rpginiaApp) {
		this._app = rpginiaApp;

		this._requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
		window.requestAnimationFrame = this._requestAnimationFrame;

		this._levelManager = new LevelManager(this);
	}

	setLevel(levelObjOrName) {
		this._levelManager.setLevel(levelObjOrName);
	}

	render() {
		// const levelList = this._levelManager._levelList;
		// const activeLevel = this._levelManager.currentLevel;

		function renderFunc() {
			// Actions to load the activated scene...
			
			window.requestAnimationFrame(renderFunc);
		}
		return renderFunc();
	}

	static get LevelManager() {
		return LevelManager;
	}

	static get Level() {
		return LevelManager.Level;
	}
}

export default World;
