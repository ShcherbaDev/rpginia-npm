import * as EventEmitter from 'wolfy87-eventemitter';
import FullscreenManager from './FullscreenManager';
import Loaders from './Loaders';
import World from './World';

/**
 * Main engine class which is using to create a new app. See {@tutorial test-tutorial} for details.
 * @global
 * @constructor
 * 
 * @example
 * const engine = new RPGinia(
 *  {
 *    name: 'My RPGinia app',
 *    canvas: document.querySelector('canvas#playground'),
 *    sizes: [1280, 720],
 *    isImageSmoothingEnabled: false
 *  },
 *  {
 *    environment: 'production'
 *  }
 * );
 * @example
 * // These codes will define engine with all settings by default.
 * 
 * const engine = new RPGinia();
 * 
 * // Or
 * 
 * const engine = new RPGinia(undefined, undefined); // To skip argument write undefined
 */
class RPGinia {
	/**
	 * Create new RPGinia app.
	 * 
	 * @param {object} appSettings - App settings.
	 * @param {string} [appSettings.name=RPGinia app] - App name.
	 * @param {object} [appSettings.canvas=Empty object] - App playground.
	 * @param {number[]} [appSettings.sizes=Width: 800; Height: 600] - Playground sizes. First array item - width; second array item - height.
	 * @param {boolean} [appSettings.isImageSmoothingEnabled=false] - Enable image smoothing on the playground. Details watch [here]{@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/imageSmoothingEnabled}
	 * 
	 * @param {object} environmentSettings - Environment settings.
	 * @param {string} [environmentSettings.environment=development] - Project environment. Possible values are "development" and "production".
	 * @param {string} [environmentSettings.appPath=__dirname] - App path.
	 * @param {boolean} [environmentSettings.debugMode=true if environment is development] - Enable debug mode. True if environment is development; False if environment is production.
	 */
	constructor(appSettings = {}, environmentSettings = {}) {
		/**
		 * Name of the RPGinia app.
		 * @private
		 */
		this._name = appSettings.name || 'RPGinia app';
		
		/**
		 * App playground.
		 * @private
		 */
		this._canvas = appSettings.canvas || {};
		
		/**
		 * Playground's context for drawing.
		 * @private
		 */
		this._context = Object.keys(this._canvas).length ? this._canvas.getContext('2d') : {};
		
		/**
		 * An array of playground sizes.
		 * @private
		 */
		this._sizes = appSettings.sizes || [800, 600];

		/**
		 * Enable image smoothing.
		 * @private
		 */
		this._isImageSmoothingEnabled = appSettings.isImageSmoothingEnabled || false;

		// Set up playground sizes and image smoothing for it.
		this._initializeApp();

		/**
		 * App's status / environment.
		 * Supported values: development, production. 
		 * @private
		 */
		this._environment = environmentSettings.environment || 'development';

		/**
		 * Debug mode. Using to log warning and errors.
		 * @private
		 */
		this._setDebugMode(environmentSettings.debugMode);

		/**
		 * RPGinia app path
		 * @private
		 */
		this._appPath = environmentSettings.appPath || window.location.href;

		/**
		 * Variables for saving game data.
		 * @private
		 */
		this._globalVariables = [];

		/**
		 * An event emitter.
		 * @private
		 */
		this._eventEmitter = new EventEmitter();

		/**
		 * Connecting fullscreen manager.
		 * @private
		 */
		this._fullScreen = new FullscreenManager(this);
	}

	/**
	 * App initialization method for setting up playground's sizes and image smoothing for it.
	 * @private
	 */
	_initializeApp() {
		[this._canvas.width, this._canvas.height] = this._sizes;
		this._context.imageSmoothingEnabled = this._isImageSmoothingEnabled;
	}

	/**
	 * Set debug mode value.
	 * @private
	 * @param {(boolean|undefined)} debugMode
	 * @returns {boolean} Should engine enable debug mode or not.
	 */
	_setDebugMode(debugMode) {
		if (debugMode !== undefined) {
			this._debugMode = debugMode;
		}
		else {
			this._debugMode = this._environment === 'development';
		}
	}

	/**
	 * Add new global variable.
	 * @param {string} name - The name of a global variable.
	 * @param {*} value - The value of a global variable.
	 * @returns {*} - The value of a created global variable.
	 */
	setGlobalVariable(name, value) {
		this._globalVariables[name] = value;
		return this._globalVariables[name];
	}

	/**
	 * Get global variable by name.
	 * @param {string} name - The name of a searched global variable.
	 * @returns {*} The value of a global variable.
	 */
	getGlobalVariable(name) {
		return this._globalVariables[name];
	}

	/**
	 * Get app environment.
	 * @readonly
	 * @returns {string}
	 */
	get environment() { return this._environment; }

	/**
	 * Get app path.
	 * @readonly
	 * @returns {string}
	 */
	get appPath() { return this._appPath; }

	/**
	 * Get debug mode.
	 * @readonly
	 * @returns {boolean} Is debug mode enabled. 
	 */
	get debugModeEnabled() { return this._debugMode; }

	/**
	 * Get global variables list.
	 * @readonly
	 * @returns {array}
	 */
	get globalVariables() { return this._globalVariables; }

	/**
	 * Event emitter.
	 * @readonly
	 */
	get eventEmitter() { return this._eventEmitter; }

	static get Loaders() { return Loaders; }
	
	static get World() { return World; }
}

export default RPGinia;
