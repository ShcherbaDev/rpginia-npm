const Config = require('./Config');
const cfg = new Config();

/**
 * Main engine class.
 * @class
 * @global
 */
class RPGinia {
	/**
	 * @constructor
	 * @param {String} [environment=developement] - Project status.
	 */
	constructor(environment = cfg.getOption('projectEnvironment')) {
		/**
		 * App's status / environment
		 * @private
		 */
		this._environment = environment === 'developement' || environment === 'test' || environment === 'production' 
		? environment : new Error('Unknown environment value!');

		if(this._environment !== cfg.getOption('projectEnvironment'))
			cfg.setOption('projectEnvironment', this._environment);

		/**
		 * Debug mode. Using to log warning and errors.
		 * @private
		 */
		this._debugMode = this._environment === 'developement' || this._environment === 'test' ? true : false;

		if(this._debugMode !== cfg.getOption('projectDebugModeEnabled'))
			cfg.setOption('projectDebugModeEnabled', this._debugMode);

		/**
		 * App path
		 * @private
		 */
		this._appPath = __dirname;

		if(this._appPath !== cfg.getOption('projectPath'))
			cfg.setOption('projectAppPath', this._appPath);
	}
}

module.exports = RPGinia;
module.exports.App = require('./App');