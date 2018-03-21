"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var fs_1 = require("fs");
var child_process_1 = require("child_process");
var chalk_1 = require("chalk");
function default_1(name, cmd) {
    var program = this;
    var root = path_1.resolve(name);
    var appName = path_1.basename(root);
    var templateDir = null;
    var dependencies = [];
    validationAppName(appName);
    switch (cmd.target) {
        case 'react':
            templateDir = path_1.join(__dirname, '/../templates/webpack-react');
            dependencies = ['babel-loader', 'babel-core', 'babel-preset-env', 'babel-preset-react', 'webpack', 'webpack-cli', 'webpack-dev-server'];
            break;
        case 'react-ts':
            templateDir = path_1.join(__dirname, '/../templates/webpack-react-ts');
            console.log('react typescript in progress');
            process.exit();
            break;
        case 'vue':
            templateDir = path_1.join(__dirname, '/../templates/webpack-vue');
            console.log('vue in progress');
            process.exit();
            break;
        default:
            templateDir = path_1.join(__dirname, '/../templates/webpack-alone');
            dependencies = ['webpack', 'webpack-cli', 'webpack-dev-server'];
            break;
    }
    mkdir(root);
    process.chdir(root);
    copyDir(templateDir, root);
    copyPackage(appName, templateDir, root);
    installPackages(name, dependencies);
}
exports.default = default_1;
var installPackages = function (name, dependency) {
    var command = 'npm';
    var args = [
        'install',
        '--save-dev'
    ].concat(dependency);
    var config = {
        stdio: 'inherit',
        shell: true
    };
    console.log('');
    console.log('Installing packages for your application');
    var child = child_process_1.spawn(command, args, config);
    child.on('close', function () {
        console.log('');
        console.log("Project " + chalk_1.default.green(name) + " created!");
        console.log("use: cd " + chalk_1.default.green(name) + " and " + chalk_1.default.green('npm start'));
        console.log('');
    });
};
var validationAppName = function (appName) {
    var validateProjectName = require('validate-npm-package-name');
    var results = validateProjectName(appName);
    var dependency = ['webpack', 'webpack-dev-server'];
    if (!results.validForNewPackages) {
        console.error("Could not create project named: " + chalk_1.default.red(appName));
        console.log('please correct:');
        results.errors.forEach(function (error) {
            console.log("    " + chalk_1.default.red('*') + " " + error);
        });
        process.exit(1);
    }
    if (dependency.indexOf(appName) !== -1) {
        console.error("Could not create project named " + chalk_1.default.red(appName) + ".");
        console.error('Please change the name of the application, a dependency has the same name.');
        process.exit(1);
    }
};
var copyPackage = function (name, templateDir, root) {
    var templatepackage = path_1.join(templateDir, 'package.json');
    var packageJson = JSON.parse(fs_1.readFileSync(templatepackage, 'utf-8'));
    packageJson.name = name;
    fs_1.writeFileSync(path_1.join(root, 'package.json'), JSON.stringify(packageJson, null, 2));
    child_process_1.spawn("npm", ['install']);
};
var mkdir = function (dir) {
    try {
        fs_1.mkdirSync(dir, 493);
    }
    catch (e) {
    }
};
var copyDir = function (src, dest) {
    mkdir(dest);
    var files = fs_1.readdirSync(src);
    for (var i = 0; i < files.length; i++) {
        var current = fs_1.lstatSync(path_1.join(src, files[i]));
        if (current.isDirectory()) {
            copyDir(path_1.join(src, files[i]), path_1.join(dest, files[i]));
        }
        else {
            fs_1.copyFileSync(path_1.join(src, files[i]), path_1.join(dest, files[i]));
        }
    }
};
