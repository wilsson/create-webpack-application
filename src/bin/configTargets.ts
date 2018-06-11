import { join } from 'path';

const commonDependencies = [
    'webpack',
    'webpack-cli',
    'webpack-dev-server',
    'html-webpack-plugin'
]

export const configTargets = {
    react: {
        message: 'React + Babel + Webpack',
        templateDir: join(__dirname, '../templates/webpack-react'),
        dependencies: [
            'react',
            'react-dom',
            'babel-loader',
            'babel-core',
            'babel-preset-env',
            'babel-preset-react',
            ...commonDependencies
        ]
    },
    'react-ts': {
        message: 'React + Typescript + Webpack',
        templateDir: join(__dirname, '/../templates/webpack-react-ts'),
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
    only: {
        message: 'Only Webpack',
        templateDir: join(__dirname, '/../templates/webpack-alone'),
        dependencies: [
            ...commonDependencies
        ]
    }
}