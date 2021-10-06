# Gamified Bar

A small version of gamifier bar

## Technology used

[![react](https://img.shields.io/badge/react-16.12.0-lightblue.svg)](https://reactjs.org/)
[![babylonJS](https://img.shields.io/badge/babylonJS-4.2.0-orange.svg)](https://www.babylonjs.com/)
[![babel/cli](https://img.shields.io/badge/babel-7.10.4-yellow.svg)](https://babeljs.io/)
[![eslint](https://img.shields.io/badge/eslint-7.4.0-blue.svg)](https://eslint.org/)
[![husky](https://img.shields.io/badge/husky-%5E6.0.0-blue.svg)](https://github.com/typicode/husky)
[![specification](https://img.shields.io/badge/ES8/ECMASCRIPT-2017-yellow.svg)](https://www.ecma-international.org/ecma-262/8.0/index.html)
[![lint-staged](https://img.shields.io/badge/lint--staged-%5E11.0.0-red.svg)](https://github.com/okonet/lint-staged)
[![code style](https://img.shields.io/badge/eslint--config--standard-%5E16.0.2-brightgreen.svg)](https://github.com/eslint/eslint)
![Dependencies](https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen.svg)

## Features

- [babylonJS](https://www.babylonjs.com/) for the gaming interactions and layout
- ES6,ES7,ES8 supported via [babel](https://github.com/babel/babel) with version ^7.*
- Code [linting](http://eslint.org) using [eslint](https://github.com/eslint/eslint), [prettierrc](https://github.com/sourcegraph/prettierrc) and prepare commit msg and pre commit git hooks using [husky](https://github.com/typicode/husky) with [lint-staged](https://github.com/okonet/lint-staged) for better commits, proper linting and for avoiding bad commits
- [nodemon](https://github.com/remy/nodemon) for auto restart of server


### Development
Clone the repository and run the following from the project root.
```sh
$ npm i
$ npm start
```
This will run the `webpack-dev-server` in `development` mode on `PORT:8080`. Configuration available in `webpack.config.js`. 

### Build From Source
```sh
$ npm i
$ npm run build
```
This runs `webpack` in `development` mode. Build generated in `<root>/dist`.

