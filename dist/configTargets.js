"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var commonDependencies = [
    'webpack',
    'webpack-cli',
    'webpack-dev-server'
];
exports.configTargets = {
    react: {
        templateDir: path_1.join(__dirname, '../templates/webpack-react'),
        dependencies: [
            'react',
            'react-dom',
            'babel-loader',
            'babel-core',
            'babel-preset-env',
            'babel-preset-react'
        ].concat(commonDependencies)
    },
    'react-ts': {
        templateDir: path_1.join(__dirname, '/../templates/webpack-react-ts'),
        dependencies: [
            'react',
            'react-dom',
            '@types/react',
            '@types/react-dom',
            'typescript',
            'ts-loader'
        ].concat(commonDependencies)
    },
    only: {
        templateDir: path_1.join(__dirname, '/../templates/webpack-alone'),
        dependencies: commonDependencies.slice()
    }
};
