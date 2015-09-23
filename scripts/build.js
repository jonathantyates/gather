import BrowserSync from 'browser-sync';
import nodeSass from 'node-sass';
import url from 'url';

// Create an instance of BrowserSync
const browserSync = BrowserSync.create();

// SCSS middleware
function scssMiddleware(request, response, next) {
  let parsedURL = url.parse(request.url);
  if (parsedURL.pathname.match(/\.scss$/)) {
    return nodeSass.render({
      file: `src/${parsedURL.pathname}`
    }, (error, result) => {
      response.setHeader('Content-Type', 'text/css');
      response.end(result.css);
    });
  }
  next();
}

browserSync.init({
  injectFileTypes: ['scss'],
  files: ['src/**/*'],
  server: {
    baseDir: ['src'],
    middleware: [scssMiddleware],
    routes: {
      '/node_modules': 'node_modules',
    }
  }
});
