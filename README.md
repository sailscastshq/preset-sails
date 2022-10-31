# Sails preset

> Bundled with opinionated plugins and reporters

Instead of installing individual plugins, reporters and starting the Sails server, this preset bundles them within a single package and exposed setup Sails for you.


```sh
npm i preset-sails --save-dev
```


## Usage

Use the plugins as follows.

```js
const { presetSails, assert, runFailedTests, specReporter, apiClient } = require('preset-sails')

configure({
  plugins: [presetSails(), assert(), runFailedTests(), apiClient('http://localhost:3333')],
  reporters: [specReporter]
})
```
