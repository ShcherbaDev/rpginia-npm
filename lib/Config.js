/**
 * Class for setting up engine and application settings
 * @class
 * @private
 */
class Config {
    /** @hideconstructor */
    constructor() {
        /** Default engine settings. */
        this._defaultEngineSettings = {
            projectEnvironment: 'developement',
            projectDebugModeEnabled: true,
            projectPath: undefined
        };

        /** Engine settings that you can change. */
        this._engineSettings = {
            projectEnvironment: 'developement',
            projectDebugModeEnabled: true,
            projectPath: undefined
        };
    }

    /**
     * Get a value of option.
     * @param {String} name - Option name. 
     */
    getOption(name) {
        return this._engineSettings[name];
    }

    /**
     * Set a new value for setting.
     * @param {String} name  - Option name.
     * @param {*} value - New option value.
     */
    setOption(name, value) {
        this._engineSettings[name] = value;
    }

    /**
     * Get an object of engine settings.
     * @readonly
     * @type {Object}
     */
    get engineSettings() { return this._engineSettings }
}

module.exports = Config;