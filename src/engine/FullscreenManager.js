class FullscreenManager {
	constructor(rpginiaApp) {
		this._app = rpginiaApp;
	
		this._toogleFullscreenKeyCode = 122;
		this._isFullscreenEnabled = false;

		this._init();
	}

	_doOnToggleFullscreenEvent(e) {
		return this._app.onToggleFullscreen ? this._app.onToggleFullscreen(e) : null;
	}

	_init() {
		document.addEventListener('keydown', (e) => {
			if (e.keyCode === this._toogleFullscreenKeyCode) {
				e.preventDefault();
			}
		});

		document.addEventListener('keyup', (e) => {
			if (e.keyCode === this._toogleFullscreenKeyCode) {
				if (!document.fullscreenElement) {
					this._isFullscreenEnabled = true;
					document.documentElement.requestFullscreen();

					this._doOnToggleFullscreenEvent(e);
				}
				else if (document.exitFullscreen) {
					this._isFullscreenEnabled = false;
					document.exitFullscreen();
					
					this._doOnToggleFullscreenEvent(e);
				}
			}
		});
	}
}

module.exports = FullscreenManager;
