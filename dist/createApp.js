"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var fs_extra_1 = require("fs-extra");
var fs_1 = require("fs");
var child_process_1 = require("child_process");
var chalk_1 = require("chalk");
var configTargets_1 = require("./configTargets");
var errorApp_1 = require("./errorApp");
var hasYarn = function () {
    try {
        child_process_1.execSync('yarnpkg --version', { stdio: 'ignore' });
        return true;
    }
    catch (e) {
        return false;
    }
};
exports.createApp = function (_a) {
    var name = _a.name, target = _a.target;
    if (!name) {
        errorApp_1.errorApp(name);
    }
    var root = path_1.resolve(name);
    var appName = path_1.basename(root);
    validationAppName(appName);
    var _b = configTargets_1.configTargets[target], templateDir = _b.templateDir, dependencies = _b.dependencies;
    fs_extra_1.ensureDirSync(root);
    process.chdir(root);
    fs_extra_1.copySync(templateDir, root);
    copyPackage(appName, templateDir, root);
    installPackages(name, dependencies);
};
var installPackages = function (name, dependency) {
    var command = 'npm';
    var useYarn = hasYarn();
    if (useYarn) {
        command = 'yarn';
    }
    var config = {
        stdio: 'inherit',
        shell: true
    };
    console.log('');
    console.log('Installing packages for your application');
    var child = child_process_1.spawn(command, ['install'], config);
    child.on('close', function () {
        console.log('');
        console.log("Project " + chalk_1.default.green(name) + " created!");
        console.log("use: cd " + chalk_1.default.green(name) + " and " + (useYarn ? chalk_1.default.green('yarn dev') : chalk_1.default.green('npm run dev')));
        console.log('');
    });
};
var validationAppName = function (appName) {
    var validateProjectName = require('validate-npm-package-name');
    var results = validateProjectName(appName);
    var dependency = ['webpack', 'webpack-cli', 'webpack-dev-server'];
    if (!results.validForNewPackages) {
        console.error("Could not create project named: " + chalk_1.default.red(appName));
        console.log('please correct:');
        results.errors && results.errors.forEach(function (error) {
            console.log("    " + chalk_1.default.red('*') + " " + error);
        });
        results.warnings && results.warnings.forEach(function (error) {
            console.log("    " + chalk_1.default.red('*') + " " + error);
        });
        process.exit();
    }
    if (dependency.indexOf(appName) !== -1) {
        console.error("Could not create project named " + chalk_1.default.red(appName) + ".");
        console.error('Please change the name of the application, a dependency has the same name.');
        process.exit();
    }
};
var copyPackage = function (name, templateDir, root) {
    var templatepackage = path_1.join(templateDir, 'package.json');
    var packageJson = JSON.parse(fs_1.readFileSync(templatepackage, 'utf-8'));
    packageJson.name = name;
    fs_1.writeFileSync(path_1.join(root, 'package.json'), JSON.stringify(packageJson, null, 2));
};
