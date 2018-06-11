"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var fs_1 = require("fs");
var child_process_1 = require("child_process");
var chalk_1 = require("chalk");
var configTargets_1 = require("./configTargets");
var errorApp_1 = require("./errorApp");
function createApp(_a) {
    var name = _a.name, target = _a.target;
    if (!name) {
        errorApp_1.errorApp(name);
    }
    var root = path_1.resolve(name);
    var appName = path_1.basename(root);
    validationAppName(appName);
    var _b = configTargets_1.configTargets[target], templateDir = _b.templateDir, dependencies = _b.dependencies;
    mkdir(root);
    process.chdir(root);
    copyDir(templateDir, root);
    copyPackage(appName, templateDir, root);
    installPackages(name, dependencies);
}
exports.createApp = createApp;
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
