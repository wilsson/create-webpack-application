import { join } from 'path';

export interface ConfigTarget {
  target: string;
  message: string;
  templateDir: string;
  dependencies: string[];
}

const commonDependencies = [
  'webpack',
  'webpack-cli',
  'webpack-dev-server',
  'html-webpack-plugin'
];

export const configTargets: ConfigTarget[] = [
  {
    target: 'react',
    message: 'React + Babel + Webpack',
    templateDir: join(__dirname, '../templates/webpack-react'),
    dependencies: [
      'react',
      'react-dom',
      'babel-loader',
      '@babel/core',
      '@babel/preset-env',
      '@babel/preset-react',
      ...commonDependencies
    ]
  },
  {
    target: 'react-ts',
    message: 'React + Typescript + Webpack',
    templateDir: join(__dirname, '../templates/webpack-react-ts'),
    dependencies: [
      'react',
      'react-dom',
      '@types/react',
      '@types/react-dom',
      'typescript',
      'ts-loader',
      ...commonDependencies
    ]
  },
  {
    target: 'only',
    message: 'Only Webpack',
    templateDir: join(__dirname, '../templates/webpack-alone'),
    dependencies: [
      ...commonDependencies
    ]
  },
  {
    target: 'babel',
    message: 'Webpack + Babel7',
    templateDir: join(__dirname, '../templates/webpack-babel'),
    dependencies: [
      'babel-loader',
      '@babel/core',
      '@babel/preset-env',
      ...commonDependencies
    ]
  }
];
