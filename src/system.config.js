System.config({
  babelOptions: {stage: 0},
  defaultJSExtensions: true,
  map: {
    'angular': 'node_modules/angular/angular.min.js',
    'angular/annotations': 'annotations/angular.js',
    'angular-animate': 'node_modules/angular-animate/angular-animate.min.js',
    'angular-aria': 'node_modules/angular-aria/angular-aria.min.js',
    'angular-material': 'node_modules/angular-material/angular-material.min.js',
    'angular-ui-router': 'node_modules/angular-ui-router/release/angular-ui-router.js',
    'babel': 'node_modules/babel/node_modules/babel-core/browser.js',
    'babel/polyfill': 'node_modules/babel/node_modules/babel-core/polyfill.js',
    'core-js': 'node_modules/babel/node_modules/babel-core/node_modules/core-js',
    'regenerator': 'node_modules/babel/node_modules/babel-core/node_modules/regenerator'
  },
  transpiler: 'babel'
});
