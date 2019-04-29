#!/usr/bin/env node

const program = require('commander');

const Listr = require('listr');
const { Observable } = require('rxjs');
const mkdirp = require('mkdirp');
const fs = require('fs');

const customConsole = require('./console');
const rpginiaPackage = require('../package');

program
	.version(rpginiaPackage.version, '-v, --version');

program
	.command('create <type> <path>')
	.description('create a new RPGinia project')
	.action((type, path) => {
		if (type !== 'project') {
			throw new Error('Type is not defined!');
		}

		const tasks = new Listr([
			{
				title: 'Create project structure',
				task: () => new Observable((observer) => {
					const consolePath = process.cwd().replace(/\\/g, '/');
					const projectPath = `${consolePath}/${path}`;
					const resourcesPath = `${projectPath}/resources`;

					observer.next('Creating project folder');
					mkdirp.sync(projectPath);

					observer.next('Creating resources folder');
					mkdirp.sync(resourcesPath);
					mkdirp.sync(`${resourcesPath}/css`);
					mkdirp.sync(`${resourcesPath}/js`);
					
					mkdirp.sync(`${resourcesPath}/levels`);
					mkdirp.sync(`${resourcesPath}/sprites`);
					mkdirp.sync(`${resourcesPath}/audio`);
					
					fs.writeFileSync(`${projectPath}/index.html`, '<h1>Hello, world!</h1>');

					observer.complete();

					setTimeout(() => {
						customConsole.info(`Project was created!\n\nWhat to do next?\n1. cd ${path}/\n2. Type npm start\n3. Open http://localhost:3000/\n\nHappy developing!`);
					}, 500);
				})
			}
		]);

		tasks.run().catch((err) => { throw err; });
	});

program.parse(process.argv);
