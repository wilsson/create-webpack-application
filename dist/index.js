#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer = require("inquirer");
var configTargets_1 = require("./configTargets");
var createApp_1 = require("./createApp");
var configKeys = Object.keys(configTargets_1.configTargets);
inquirer
    .prompt([
    {
        type: 'list',
        name: 'target',
        message: 'Which Webpack configuration?',
        choices: configKeys.map(function (key) { return configTargets_1.configTargets[key].message; })
    },
    {
        type: 'input',
        name: 'name',
        message: 'Name your project'
    }
])
    .then(function (response) {
    for (var i = 0; i < configKeys.length; ++i) {
        if (configTargets_1.configTargets[configKeys[i]].message === response['target']) {
            response['target'] = configKeys[i];
            break;
        }
    }
    createApp_1.createApp(response);
});
