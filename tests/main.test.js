const chai = require('chai');
const jsdom = require('mocha-jsdom');

const RPGinia = require('../src/engine/RPGinia');

const {assert, expect} = chai;

jsdom({
	url: 'http://localhost'
});

it('Has DOM for tests.', () => {
	const div = document.createElement('div');
	expect(div.nodeName).eql('DIV');
});

describe('Engine', () => {
	describe('RPGinia.js', () => {
		describe('Debug mode', () => {
			describe('Development', () => {
				it('Enabled by default.', () => {
					const engine = new RPGinia();
					assert.equal(engine.debugModeEnabled, true);
				});
	
				it('Typed in arguments as value by default.', () => {
					const engine = new RPGinia(undefined, {
						environment: 'development', 
						debugMode: true
					});
					assert.equal(engine.debugModeEnabled, true);
				});
	
				it('Disabled from arguments.', () => {
					const engine = new RPGinia(undefined, {
						environment: 'development',
						debugMode: false
					});
					assert.equal(engine.debugModeEnabled, false);
				});
			});

			describe('Production', () => {
				it('Disabled by default.', () => {
					const engine = new RPGinia(undefined, {
						environment: 'production'
					});
					assert.equal(engine.debugModeEnabled, false);
				});

				it('Typed in arguments as value by default.', () => {
					const engine = new RPGinia(undefined, {
						environment: 'production',
						debugMode: false
					});
					assert.equal(engine.debugModeEnabled, false);
				});

				it('Enabled from arguments.', () => {
					const engine = new RPGinia(undefined, {
						environment: 'production',
						debugMode: true
					});
					assert.equal(engine.debugModeEnabled, true);
				});
			});
		});
	});
});
