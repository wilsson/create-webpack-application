#!/usr/bin/env node

import { Command }  from 'commander';
import chalk        from 'chalk';
import createApp    from './createApp';
import errorApp     from './errorApp';

const paquete = require('../package.json');
const program = new Command(paquete.name);

program
    .version(paquete.version, '-v, --version')
    .arguments('<project-directory>')
    .option('-t, --target <target>', 'Target optional: react, react-ts. For default webpack only', /^(react|react-ts)$/i, 'only')
    .usage(`${chalk.green('<project-directory>')} ${chalk.magenta('-t')} ${chalk.green('<target:react|react-ts>')}`)
    .action(createApp.bind(program))
    .parse(process.argv);

if(!program.args[1])
    errorApp(program.name());