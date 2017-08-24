[create-react-app]: https://github.com/facebookincubator/create-react-app

# Create Webpack App

:rocket: Easily create a basic webpack application.

## Getting Started

### Installation

Install globall.y

```bash
npm install -g create-webpack-app
```

### Create app

```bash
create-webpack-app my-app
cd my-app
```

Create a directory called my-app with the initial structure of the project.

Will also install its dependencies.

```
my-app
├── node_modules
├── package.json
├── public
│   └── index.html
└── src
    └── entry.js
```

### Scripts

```bash
npm start
```
Then open http://localhost:3000/ to see your app.

```bash
npm build
```

Transpile and watch.

Inspired by [create-react-app] :heart: