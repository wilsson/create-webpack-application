#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer = require("inquirer");
var configTargets_1 = require("./configTargets");
var createApp_1 = require("./createApp");
inquirer
    .prompt([
    {
        type: 'list',
        name: 'target',
        message: 'What config webpack?',
        choices: [
            configTargets_1.configTargets['only'].message,
            configTargets_1.configTargets['react'].message,
            configTargets_1.configTargets['react-ts'].message
        ]
    },
    {
        type: 'input',
        name: 'name',
        message: 'Name you project'
    }
])
    .then(function (response) {
    if (configTargets_1.configTargets['only'].message === response['target']) {
        response['target'] = 'only';
    }
    if (configTargets_1.configTargets['react'].message === response['target']) {
        response['target'] = 'react';
    }
    if (configTargets_1.configTargets['react-ts'].message === response['target']) {
        response['target'] = 'react-ts';
    }
    console.log(response);
    createApp_1.createApp(response);
});
