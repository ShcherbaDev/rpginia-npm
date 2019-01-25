const RPGinia = require('./RPGinia');

/**
 * Class with main engine functional.
 * @memberof RPGinia
 * @class
 */
class App extends RPGinia {
    /**
	 * @constructor
	 * @param {String} [title=RPGinia app] - App's title.
	 * @param {Object} canvas - App's playground.
	 * @param {Object} context - App's playground's context.
	 * @param {Array} [sizes=[800, 600]] - Playground sizes. First element - width, second element - height.
	 * @param {Boolean} [isImageSmoothingEnabled=false] - Image smoothing.
	 */
    constructor(title = 'RPGinia app', 
                canvas = {}, context = {}, 
                sizes = [800, 600], 
                isImageSmoothingEnabled = false) {
		super();
		
        this._title = title;
		this._canvas = canvas;
		this._context = context;
		this._sizes = sizes;
        this._isImageSmoothingEnabled = isImageSmoothingEnabled;

		this._init();
    }

    /**
	 * Initialize method for setting up the playground's sizes and image smoothing.
	 * @private
	 */
	_init() {
		this._canvas.width = this._sizes[0];
		this._canvas.height = this._sizes[1];
		this._context.imageSmoothingEnabled = this._isImageSmoothingEnabled;
	}
    
    /**
	 * Clears a playground.
	 */
	clearPlayground() {
		this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
	}

	/**
	 * Adds a global variable into an global variables array.
	 * @param {String} name - The name of a global variable. 
	 * @param {*} value - The value of a global variable.
	 * @returns {*} The value of a created global variable.
	 */
	setGlobalVariable(name, value) {
		this._globalVariables[name] = value;
		return this._globalVariables[name];
	}

	/**
	 * Gets a value of global variable by name.
	 * @param {String} name - Searched global variable name.
	 * @returns {*} The value of searched global variable.
	 */
	getGlobalVariable(name) {
		return this._globalVariables[name];
	}

	/** 
	 * Get a canvas object.
	 * @readonly
	 * @type {Object}
	 */
	get canvas() { return this._canvas }

	/** 
	 * Get a context object for draw object
	 * @readonly
	 * @type {Object}
	 */
	get context() { return this._context }

	/** 
	 * Get an array of global variables.
	 * @readonly
	 * @type {Object[]}
	 */
	get globalVariables() { return this._globalVariables }
}

module.exports = App;