import { resolve, basename, join } from 'path';
import { readdirSync, lstatSync, copyFileSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { spawn } from 'child_process';
import chalk from 'chalk';

export default function(name: string, cmd: any): void {
    const program   = this;
    const root      = resolve(name);
    const appName   = basename(root);
    let templateDir = null;
    let dependencies= [];
    validationAppName(appName);

    switch(cmd.target) {
        case 'react':
            templateDir = join(__dirname, '/../templates/webpack-react');
            dependencies = ['babel-loader', 'babel-core', 'babel-preset-env', 'babel-preset-react', 'webpack', 'webpack-cli', 'webpack-dev-server'];
        break;
        case 'react-ts':
            templateDir = join(__dirname, '/../templates/webpack-react-ts');
            console.log('react typescript in progress');
            process.exit();
        break;
        case 'vue':
            templateDir = join(__dirname, '/../templates/webpack-vue');
            console.log('vue in progress');
            process.exit();
        break;
        default:
            templateDir = join(__dirname, '/../templates/webpack-alone');
            dependencies = ['webpack', 'webpack-cli', 'webpack-dev-server'];
        break;
    }

    mkdir(root);
    process.chdir(root);
    copyDir(templateDir, root);
    copyPackage(appName, templateDir, root);
    installPackages(name, dependencies);
}

const installPackages = (name:string, dependency: string[]): void => {
    let command: string = 'npm';
    let args: string[] = [
        'install',
        '--save-dev'
    ].concat(dependency);

    let config = { 
        stdio: 'inherit',
        shell: true
    };

    console.log('');
    console.log('Installing packages for your application');
    const child = spawn(command, args, config);
    child.on('close', () => {
        console.log('');
        console.log(`Project ${chalk.green(name)} created!`);
        console.log(`use: cd ${chalk.green(name)} and ${chalk.green('npm start')}`);
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

const copyPackage = (name, templateDir, root) => {
    const templatepackage = join(templateDir, 'package.json');
    let packageJson = JSON.parse(readFileSync(templatepackage, 'utf-8'));
    packageJson.name = name;
    writeFileSync(join(root, 'package.json'), JSON.stringify(packageJson, null, 2));
    spawn("npm", ['install']);
}

const mkdir = (dir) => {
	try {
		mkdirSync(dir, 0o755);
	} catch(e) {
	}
};

const copyDir = (src, dest) => {
    mkdir(dest);
	var files = readdirSync(src);
	for(var i = 0; i < files.length; i++) {
		var current = lstatSync(join(src, files[i]));
		if(current.isDirectory()) {
			copyDir(join(src, files[i]), join(dest, files[i]));
		} else {
			copyFileSync(join(src, files[i]), join(dest, files[i]));
		}
	}
}