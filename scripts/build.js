import BrowserSync from 'browser-sync';

// Create an instance of BrowserSync
const browserSync = BrowserSync.create();

browserSync.init({
  injectFileTypes: ['scss'],
  files: ['src/**/*'],
  server: {
    baseDir: ['src'],
    middleware: [],
    routes: {
      '/node_modules': 'node_modules',
    }
  }
});
