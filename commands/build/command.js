var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var webpack = require('webpack');
var merge = require('deepmerge');
var Command = require('../../lib/command');

module.exports = Command.extend({

  init: function() {

    this._super.apply(this, arguments);

    this.description = "Build the project with webpack.";
    this.options = '';
    this.order = 2;
  },

  run: function() {

  	var projectRoot = this.cli.reflect.projectRoot();

    if( !projectRoot || projectRoot != process.cwd() ) {
      console.log("");
      console.log(chalk.white("You must be in the project root in order to execute build!"));
      console.log("");
      process.exit(1);
    }

    var webpackConfig = false;

    var webpackRoot = path.resolve(projectRoot + '/webpack.config.js');
    var webpackProd = path.resolve(projectRoot + '/webpack.prod.config.js');

    if( fs.existsSync(webpackRoot) ) {
      webpackConfig = require(webpackRoot);
    }

    if( fs.existsSync(webpackProd) ) {
      if( !webpackConfig ) {
        webpackConfig = {};
      }
      
      webpackConfig = merge(webpackConfig, require(webpackProd));
    }

    if( !webpackConfig ) {
      console.log("");
      console.log(chalk.white("Could not find a webpack configuration in the current directory!"));
      console.log("");
      process.exit(1);
    }

    var bundler = webpack(webpackConfig);

    console.log(chalk.white("Building project with webpack..."));
    console.log("");

    bundler.run(function (err, stats) {
      console.log("");
      console.log(stats.toString({colors: true}));
    });



  }
});