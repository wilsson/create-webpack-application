#!/usr/bin/env node

import * as inquirer from 'inquirer';
import { configTargets } from './configTargets';
import { createApp } from './createApp';

const configKeys = Object.keys(configTargets);

inquirer
    .prompt([
        {
            type: 'list',
            name: 'target',
            message: 'Which Webpack configuration?',
            choices: configKeys.map(key => configTargets[key].message)
        },
        {
            type: 'input',
            name: 'name',
            message: 'Name your project'
        }
    ])
    .then(response => {
        for (var i = 0; i < configKeys.length; ++i) {
            if (configTargets[configKeys[i]].message === response['target']) {
                response['target'] = configKeys[i];
                break;
            }
        }
        createApp(response);
    });
