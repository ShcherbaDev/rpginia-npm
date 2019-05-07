/**
 * Fullscreen manager.
 * @memberof RPGinia
 * @private
 */
class FullscreenManager {
	/**
	 * Create new fullscreen manager.
	 * @param {RPGinia} rpginiaApp - RPGinia app.
	 */
	constructor(rpginiaApp) {
		this._app = rpginiaApp;
	
		this._toogleFullscreenKeyCode = 122;
		this._isFullscreenEnabled = false;

		this._init();
	}

	/**
	 * Initialize events.
	 * @private
	 */
	_init() {
		document.addEventListener('keydown', (event) => {
			const {keyCode} = event;
			
			if (keyCode === this._toogleFullscreenKeyCode) {
				event.preventDefault();
			}
		});

		document.addEventListener('keyup', (event) => {
			if (event.keyCode === this._toogleFullscreenKeyCode) {
				if (!document.fullscreenElement) {
					this._isFullscreenEnabled = true;
					document.documentElement.requestFullscreen();
				}
				else if (document.exitFullscreen) {
					this._isFullscreenEnabled = false;
					document.exitFullscreen();
				}

				/**
				 * My event.
				 * 
				 * @event RPGinia#toggleFullscreen
				 * @type {KeyboardEvent}
				 * @property {object} event - event...
				 */
				this._app._eventEmitter.emitEvent('toggleFullscreen', [event]);
			}
		});
	}
}

export default FullscreenManager;
