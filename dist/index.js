#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var chalk_1 = require("chalk");
var createApp_1 = require("./createApp");
var errorApp_1 = require("./errorApp");
var paquete = require('../package.json');
var program = new commander_1.Command(paquete.name);
program
    .version(paquete.version, '-v, --version')
    .arguments('<project-directory>')
    .option('-t, --target <target>', 'Target optional: react, react-ts. For default webpack only', /^(react|react-ts)$/i, 'only')
    .usage(chalk_1.default.green('<project-directory>') + " " + chalk_1.default.magenta('-t') + " " + chalk_1.default.green('<target:react|react-ts>'))
    .action(createApp_1.default.bind(program))
    .parse(process.argv);
if (!program.args[1])
    errorApp_1.default(program.name());
