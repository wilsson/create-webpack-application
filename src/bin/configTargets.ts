import { join } from 'path';

const commonDependencies = [
    'webpack',
    'webpack-cli',
    'webpack-dev-server',
    'html-webpack-plugin'
]

export const configTargets = {
    react: {
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
        templateDir: join(__dirname, '/../templates/webpack-alone'),
        dependencies: [
            ...commonDependencies
        ]
    }
}