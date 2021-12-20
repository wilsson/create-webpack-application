import { copySync, ensureDirSync } from 'fs-extra';
import { resolve, basename, join } from 'path';
import { PackageManager } from './packageManager';
import { ErrorApp } from './errorApp';
import { ConfigTarget } from './configTargets';

export class App {
  public name: string;
  public packageManager: PackageManager
  public error: ErrorApp;
  public config: ConfigTarget;

  constructor(name: string, target: ConfigTarget, packageManager: PackageManager, error: ErrorApp) {
    this.name = name;
    this.config = target;
    this.packageManager = packageManager;
    this.error = error;
  }

  public create(): void {
    if (!this.name) {
      this.error.execute();
    }

    const root = resolve(this.name);
    const appName = basename(root);
    this.packageManager.validatePackageName();
    let { templateDir, dependencies } = this.config;
    ensureDirSync(root);
    process.chdir(root);
    copySync(templateDir, root)
    this.packageManager.copyPackageJson(appName, templateDir, root);
    this.packageManager.installDependencies(this.name, dependencies);
  }
}
