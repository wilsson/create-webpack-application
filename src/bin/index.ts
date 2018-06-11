#!/usr/bin/env node

import * as inquirer from 'inquirer';
import { configTargets } from './configTargets';
import { createApp } from './createApp';
inquirer
    .prompt([
        {
            type: 'list',
            name: 'target',
            message: 'What config webpack?',
            choices: [
                configTargets['only'].message,
                configTargets['react'].message,
                configTargets['react-ts'].message
            ]
        },
        {
            type: 'input',
            name: 'name',
            message: 'Name you project'
        }
    ])
    .then(response => {
        if(configTargets['only'].message === response['target']) {
            response['target'] = 'only';
        }
        if(configTargets['react'].message === response['target']) {
            response['target'] = 'react';
        }
        if(configTargets['react-ts'].message === response['target']) {
            response['target'] = 'react-ts';
        }
        console.log(response);
        createApp(response);
    });