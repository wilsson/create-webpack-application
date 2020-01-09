import { resolve, basename, join } from 'path';
import { copySync, ensureDirSync } from 'fs-extra';
import { writeFileSync, readFileSync } from 'fs';
import { spawn, execSync } from 'child_process';
import chalk from 'chalk';
import { configTargets } from './configTargets';
import { errorApp } from './errorApp';

const hasYarn = (): boolean => {
  try {
    execSync('yarnpkg --version', { stdio: 'ignore' });
    return true;
  } catch(e) {
    return false;
  }
};

export const createApp = ({ name, target }): void => {
    if(!name) {
        errorApp(name);
    }
    const root      = resolve(name);
    const appName   = basename(root);
    validationAppName(appName);
    let { templateDir, dependencies } = configTargets[target];
    ensureDirSync(root);
    process.chdir(root);
    copySync(templateDir, root)
    copyPackage(appName, templateDir, root);
    installPackages(name, dependencies);
}

const installPackages = (name:string, dependency: string[]): void => {
    let command = 'npm';
    const useYarn = hasYarn();
  
    if(useYarn) {
      command = 'yarn';
    }
  
    let config = { 
      stdio: 'inherit',
      shell: true
    };

    console.log('');
    console.log('Installing packages for your application');
    const child = spawn(command, ['install'], config as any);
    child.on('close', () => {
        console.log('');
        console.log(`Project ${chalk.green(name)} created!`);
        console.log(`use: cd ${chalk.green(name)} and ${useYarn ? chalk.green('yarn dev'): chalk.green('npm run dev')}`);
        console.log('');
    });
}

const validationAppName = (appName: string): void => {
    const validateProjectName = require( 'validate-npm-package-name');
    let results = validateProjectName(appName);
    let dependency = ['webpack', 'webpack-dev-server'];

    if(!results.validForNewPackages){
      console.error(`Could not create project named: ${chalk.red(appName)}`);
      console.log('please correct:');
  
      results.errors && results.errors.forEach(error => {
        console.log(`    ${chalk.red('*')} ${error}`);
      });
  
      results.warnings && results.warnings.forEach(error => {
        console.log(`    ${chalk.red('*')} ${error}`);
      });
      process.exit();
    }

    if(dependency.indexOf(appName) !== -1){
        console.error(`Could not create project named ${chalk.red(appName)}.`);
        console.error('Please change the name of the application, a dependency has the same name.');
        process.exit();
    }
}

const copyPackage = (name: string, templateDir: string, root: string): void => {
    const templatepackage = join(templateDir, 'package.json');
    let packageJson = JSON.parse(readFileSync(templatepackage, 'utf-8'));
    packageJson.name = name;
    writeFileSync(join(root, 'package.json'), JSON.stringify(packageJson, null, 2));
}