const webpackConfig = require('./webpack.test');

const puppeteer = require('puppeteer');
process.env.CHROME_BIN = puppeteer.executablePath();

module.exports = function(karma) {

  karma.set({
    files: [
      {
        pattern: 'tests.webpack.js',
        watched: true
      }
    ],
    autoWatch: true,
    logLevel: karma.LOG_INFO,
    basePath: '',
    singleRun: false,
    frameworks: [
      'jasmine',
      'webpack'
    ],
    preprocessors: {
      'tests.webpack.js': 'webpack'
    },
    browsers: ['ChromeHeadless'],
    colors: true,
    browserNoActivityTimeout: 100000,
    webpackMiddleware: {
      noInfo: true
    },
    webpack: webpackConfig,
    reporters: [ 'spec', 'coverage' ],
    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/',
      subdir: '.',
      includeAllSources: true
    },
    specReporter: {
      suppressSkipped: true
    }
  });

};
