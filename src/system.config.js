System.config({
  babelOptions: {stage: 0},
  defaultJSExtensions: true,
  map: {
    'babel': 'node_modules/babel/node_modules/babel-core/browser.js',
    'babel/polyfill': 'node_modules/babel/node_modules/babel-core/polyfill.js',
    'core-js': 'node_modules/babel/node_modules/babel-core/node_modules/core-js',
  },
  transpiler: 'babel'
});
