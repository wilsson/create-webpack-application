#!/usr/bin/env node

import * as inquirer from 'inquirer';
import { App } from './app'
import { ErrorApp } from './errorApp'
import { PackageManager } from './packageManager'
import { configTargets, ConfigTarget } from './configTargets';

interface ResponseCLI {
  appName: string;
  target: string;
}

inquirer
  .prompt([
    {
      type: 'list',
      name: 'target',
      message: 'Which Webpack configuration?',
      choices: (configTargets as any).map(config => config.message)
    },
    {
      type: 'input',
      name: 'appName',
      message: 'Name your project'
    }
  ])
  .then((response: ResponseCLI) => {
    const { appName, target } = response
    const targetSelected: ConfigTarget = (configTargets as any).find(config => config.message === target)
    const packageManager = new PackageManager(appName)
    const error = new ErrorApp(appName)
    const app = new App(appName, targetSelected, packageManager, error)
    app.create()
  });
