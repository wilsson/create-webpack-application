#!/usr/bin/env node

const commander = require('commander');
const packageJson = require('../package.json');
const validateProjectName = require('validate-npm-package-name');
const spawn = require('child_process').spawn;
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
let projectName;

const program = new commander.Command(packageJson.name)
    .version('0.1.0')
    .arguments('<project-directory>')
    .usage(`${chalk.green('<project-directory>')}`)
    .action(name => {
        projectName = name;
    })
    .parse(process.argv);

if (typeof projectName === 'undefined') {
  console.error('Please specify the project directory:');
  console.log(
    `  ${chalk.cyan(program.name())} ${chalk.green('<project-directory>')}`
  );
  console.log();
  console.log('For example:');
  console.log(`  ${chalk.cyan(program.name())} ${chalk.green('my-webpack-app')}`);
  process.exit(1);
}
createApp(projectName);
function createApp(name: string): void {
    const root = path.resolve(name);
    const public = path.resolve(root, 'public');
    const src = path.resolve(root, 'src');
    const appName = path.basename(root);
    validationAppName(appName);
    const packageJson = {
        name: appName,
        version: '0.1.0',
        scripts:{
            start: 'webpack-dev-server',
            build: 'webpack --mode development'
        }
    };

    fs.mkdirSync(root);
    fs.mkdirSync(public);
    fs.mkdirSync(src);

    fs.writeFileSync(
        path.join(root, 'package.json'),
        JSON.stringify(packageJson, null, 2)
    );

    let pathConfig = path.resolve(__dirname, '../templates/config/webpack.config.js');
    let pathConfigIngnore = path.resolve(__dirname, '../templates/config/git-ignore');
    let pathHtml = path.resolve(__dirname, '../templates/public/index.html');
    let pathEntry = path.resolve(__dirname, '../templates/src/entry.js');

    let entry = fs.readFileSync(pathEntry, 'utf-8');
    fs.writeFileSync(src + '/entry.js', entry);

    let webpackconfig = fs.readFileSync(pathConfig, 'utf-8');
    fs.writeFileSync(root + '/webpack.config.js', webpackconfig);

    let gitignore = fs.readFileSync(pathConfigIngnore, 'utf-8');
    fs.writeFileSync(root + '/.gitignore', gitignore);

    let html = fs.readFileSync(pathHtml, 'utf-8');
    fs.writeFileSync(public + '/index.html', html);

    process.chdir(root);
    let dependency = ['webpack','webpack-cli', 'webpack-dev-server'];
    installPackages(dependency);
}

function installPackages(dependency: string[]): void {
    let command: string = 'npm';
    let args: string[] = [
        'install',
        '--save-dev'
    ].concat(dependency);

    let config = { 
        stdio: 'inherit',
        shell: true
    };

    console.log();
    console.log('Installing packages for your application');
    let child = spawn(command, args, config);
    child.on('close', () => {
        console.log();
        console.log(`Project ${chalk.green(projectName)} created!`);
        console.log(`    use: cd ${chalk.green(projectName)} and ${chalk.green('npm start')}`);
        console.log(`    Then open browser view in then ${chalk.cyan('http://localhost:8080/')}`);
    });
}

function validationAppName(appName: string): void {
    let results = validateProjectName(appName);
    let dependency = ['webpack', 'webpack-dev-server'];
    if(!results.validForNewPackages){
        console.error(`Could not create project named: ${chalk.red(appName)}`);
        console.log('please correct:');
        results.errors.forEach(error => {
            console.log(`    ${chalk.red('*')} ${error}`);
        });
        process.exit(1);
    }
    if(dependency.indexOf(appName) !== -1){
        console.error(`Could not create project named ${chalk.red(appName)}.`);
        console.error('Please change the name of the application, a dependency has the same name.');
        process.exit(1);
    }
}