import * as React from 'react';
import * as ReactDOM from 'react-dom';

const node = document.createElement('div');
document.body.appendChild(node);

const App = () => <h1>Hello React with Typescript</h1>;

ReactDOM.render(<App/>, node);