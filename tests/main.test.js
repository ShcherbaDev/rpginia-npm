require('jsdom-global')();

const chai = require('chai');

const RPGinia = require('../src/engine/RPGinia');

const {assert} = chai;

const stubFunction = () => 0;

let canvas = null;
let rpginia = null;

// Defining canvas and engine for future tests.
before(() => {
	document.documentElement.requestFullscreen = () => {};
	document.exitFullscreen = () => {};

	canvas = document.createElement('canvas');
	rpginia = new RPGinia(
		{
			name: 'RPGinia mocha & chai tests',
			canvas,
			isImageSmoothingEnabled: false
		}
	);
});

describe('Debug mode', () => {
	describe('Development', () => {
		it('Enabled by default.', () => {
			const engine = new RPGinia();
			assert.strictEqual(engine.debugModeEnabled, true);
		});

		it('Typed in arguments as value by default.', () => {
			const engine = new RPGinia(undefined, {
				environment: 'development', 
				debugMode: true
			});
			assert.strictEqual(engine.debugModeEnabled, true);
		});

		it('Disabled from arguments.', () => {
			const engine = new RPGinia(undefined, {
				environment: 'development',
				debugMode: false
			});
			assert.strictEqual(engine.debugModeEnabled, false);
		});
	});

	describe('Production', () => {
		it('Disabled by default.', () => {
			const engine = new RPGinia(undefined, {
				environment: 'production'
			});
			assert.strictEqual(engine.debugModeEnabled, false);
		});

		it('Typed in arguments as value by default.', () => {
			const engine = new RPGinia(undefined, {
				environment: 'production',
				debugMode: false
			});
			assert.strictEqual(engine.debugModeEnabled, false);
		});

		it('Enabled from arguments.', () => {
			const engine = new RPGinia(undefined, {
				environment: 'production',
				debugMode: true
			});
			assert.strictEqual(engine.debugModeEnabled, true);
		});
	});
});

describe('Fullscreen', () => {
	it('On pressing F11 enabling full screen.', () => {
		const kbEvent = new window.KeyboardEvent('keyup', {
			keyCode: 122
		});

		document.dispatchEvent(kbEvent);

		assert.strictEqual(rpginia._fullScreen._isFullscreenEnabled, true);
	});
});
