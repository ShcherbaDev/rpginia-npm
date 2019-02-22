#!/usr/bin/env node

const program = require('commander');

const express = require('express');
const expressApp = express();

const package = require('../package.json');

program
    .version(package.version);

program
    .command('start <env>')
    .alias('run')
    .option('-e, --environment', 'Environment. Can be "developement", "testing" or "production"', 'developement')
    .description('start a local server for an app')
    .action((env, cmd) => {
        console.log(cmd);
        if(env === 'developement' || env === 'testing' || env === 'production') {
            expressApp.listen(3000, () => {
                console.log(`Runned with environment: ${env}`);
            });
        }

        else
            throw new Error(`Type of environment "${env}" is undefined!`);
    });

program.parse(process.argv);
