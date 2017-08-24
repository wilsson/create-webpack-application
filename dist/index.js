#!/usr/bin/env node
var commander = require('commander');
var packageJson = require('../package.json');
var validateProjectName = require('validate-npm-package-name');
var spawn = require('child_process').spawn;
var chalk = require('chalk');
var path = require('path');
var fs = require('fs');
var projectName;
var program = new commander.Command(packageJson.name)
    .version('0.1.0')
    .arguments('<project-directory>')
    .usage("" + chalk.green('<project-directory>'))
    .action(function (name) {
    projectName = name;
})
    .parse(process.argv);
if (typeof projectName === 'undefined') {
    console.error('Please specify the project directory:');
    console.log("  " + chalk.cyan(program.name()) + " " + chalk.green('<project-directory>'));
    console.log();
    console.log('For example:');
    console.log("  " + chalk.cyan(program.name()) + " " + chalk.green('my-webpack-app'));
    process.exit(1);
}
createApp(projectName);
function createApp(name) {
    var root = path.resolve(name);
    var public = path.resolve(root, 'public');
    var src = path.resolve(root, 'src');
    var appName = path.basename(root);
    validationAppName(appName);
    var packageJson = {
        name: appName,
        version: '0.1.0',
        scripts: {
            start: 'webpack-dev-server',
            build: 'webpack'
        }
    };
    fs.mkdirSync(root);
    fs.mkdirSync(public);
    fs.mkdirSync(src);
    fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify(packageJson, null, 2));
    var pathConfig = path.resolve(__dirname, '../templates/config/webpack.config.js');
    var pathHtml = path.resolve(__dirname, '../templates/public/index.html');
    var pathEntry = path.resolve(__dirname, '../templates/src/entry.js');
    var entry = fs.readFileSync(pathEntry, 'utf-8');
    fs.writeFileSync(src + '/entry.js', entry);
    var webpackconfig = fs.readFileSync(pathConfig, 'utf-8');
    fs.writeFileSync(root + '/webpack.config.js', webpackconfig);
    var html = fs.readFileSync(pathHtml, 'utf-8');
    fs.writeFileSync(public + '/index.html', html);
    process.chdir(root);
    var dependency = ['webpack', 'webpack-dev-server'];
    installPackages(dependency);
}
function installPackages(dependency) {
    var command = 'npm';
    var args = [
        'install',
        '--save-dev'
    ].concat(dependency);
    var config = {
        stdio: 'inherit',
        shell: true
    };
    console.log();
    console.log('Installing packages for your application');
    var child = spawn(command, args, config);
    child.on('close', function () {
        console.log();
        console.log("Project " + chalk.green(projectName) + " created!");
        console.log("    use: cd " + chalk.green(projectName) + " and " + chalk.green('npm start'));
        console.log("    Then open browser view in then " + chalk.cyan('http://localhost:8080/'));
    });
}
function validationAppName(appName) {
    var results = validateProjectName(appName);
    var dependency = ['webpack', 'webpack-dev-server'];
    if (!results.validForNewPackages) {
        console.error("Could not create project named: " + chalk.red(appName));
        console.log('please correct:');
        results.errors.forEach(function (error) {
            console.log("    " + chalk.red('*') + " " + error);
        });
        process.exit(1);
    }
    if (dependency.indexOf(appName) !== -1) {
        console.error("Could not create project named " + chalk.red(appName) + ".");
        console.error('Please change the name of the application, a dependency has the same name.');
        process.exit(1);
    }
}
