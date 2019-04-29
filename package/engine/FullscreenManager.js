class FullscreenManager {
	constructor(rpginiaApp) {
		this._app = rpginiaApp;
	
		this._toogleFullscreenKeyCode = 122;
		this._isFullscreenEnabled = false;

		this._init();
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
				}
				else if (document.exitFullscreen) {
					this._isFullscreenEnabled = false;
					document.exitFullscreen();
				}
			}
		});

		document.addEventListener('fullscreenchange', (e) => {
			this._app._canvas.width = '100%';
			this._app._canvas.height = '100%';
			
			return this._app.onToggleFullscreen ? this._app.onToggleFullscreen(e) : null;
		});
	}
}

module.exports = FullscreenManager;
