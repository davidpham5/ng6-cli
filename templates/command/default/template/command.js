var fs = require('fs');
var path = require('path');
var Command = require('ng6-cli').Command;
//var chalk = require('chalk');

module.exports = Command.extend({

  init: function() {
    this._super.apply(this, arguments);

    this.description = 'The <%= name %> description has not yet been defined.';
    this.options = '';
    this.order = 100;
    
  },

  run: function() {

    console.log("This command will be available shortly.");
    console.log("");

  }
});