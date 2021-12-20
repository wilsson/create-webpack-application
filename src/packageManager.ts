import { spawn, execSync } from 'child_process';
import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';
import chalk from 'chalk';

export class PackageManager {
  appName: string;

  constructor(appName: string) {
    this.appName = appName;
  }

  public hasYarn(): boolean {
    try {
      execSync('yarnpkg --version', { stdio: 'ignore' });
      return true;
    } catch (e) {
      return false;
    }
  }

  public copyPackageJson(name: string, templateDir: string, root): void {
    const templatepackage = join(templateDir, 'package.json');
    let packageJson = JSON.parse(readFileSync(templatepackage, 'utf-8'));
    packageJson.name = name;
    writeFileSync(join(root, 'package.json'), JSON.stringify(packageJson, null, 2));
  }

  public installDependencies(name: string, dependencies: string[]): void {
    let command = 'npm';
    const useYarn = this.hasYarn();

    if (useYarn) {
      command = 'yarn';
    }

    let config = {
      stdio: 'inherit',
      shell: true
    };

    let args: string[] = [
      useYarn ? 'add' : 'install',
      ...dependencies
    ];

    console.log('');
    console.log('Installing packages for your application');
    const child = spawn(command, args, config as any);
    child.on('close', () => {
      console.log('');
      console.log(`Project ${chalk.green(name)} created!`);
      console.log(`use: cd ${chalk.green(name)} and ${useYarn ? chalk.green('yarn start') : chalk.green('npm start')}`);
      console.log('');
    });
  }

  public validatePackageName(): void {
    const validateProjectName = require('validate-npm-package-name');
    let results = validateProjectName(this.appName);
    let dependencies = ['webpack', 'webpack-cli', 'webpack-dev-server'];

    if (!results.validForNewPackages) {
      console.error(`Could not create project named: ${chalk.red(this.appName)}`);
      console.log('please correct:');

      results.errors && results.errors.forEach(error => {
        console.log(`    ${chalk.red('*')} ${error}`);
      });

      results.warnings && results.warnings.forEach(error => {
        console.log(`    ${chalk.red('*')} ${error}`);
      });
      process.exit();
    }

    if (dependencies.indexOf(this.appName) !== -1) {
      console.error(`Could not create project named ${chalk.red(this.appName)}.`);
      console.error('Please change the name of the application, a dependency has the same name.');
      process.exit();
    }
  }
}
