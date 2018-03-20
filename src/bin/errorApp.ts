import chalk from 'chalk';

export default function errorApp(name) {
    console.error('Please specify the project directory:');
    console.log(`  ${chalk.cyan(name)} ${chalk.green('<project-directory>')}`);
    console.log('');
    console.log('For example:');
    console.log(`  ${chalk.cyan(name)} ${chalk.green('my-webpack-app')}`);
    process.exit(1);
}