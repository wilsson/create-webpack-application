import chalk from 'chalk';

export class ErrorApp {
  public appName: string
  
  constructor(appName: string) {
    this.appName = appName;
  }

  public execute(): void {
    console.error('Please specify the project directory:');
    console.log(`  ${chalk.cyan(this.appName)} ${chalk.green('<project-directory>')} -t <target:react|react-ts>`);
    console.log('');
    console.log('For example:');
    console.log(`  ${chalk.cyan(this.appName)} ${chalk.green('my-webpack-app')}`);
    process.exit(1);
  }
}
