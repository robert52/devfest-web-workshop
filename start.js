'use strict';

var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;
var config = require('./config');
var env = 'development';

for (var proj in config) {
  var proc = spawn('node', [path.resolve(__dirname, config[proj].path) + '/' +config[proj].main], {
    cwd: path.resolve(__dirname, config[proj].path),
    env: env
  });

  output(proj, proc);
}

function output(app, child) {
  child.on('error', function( err ){ throw err });

  child.stdout.on('data', function (data) {
    console.log(app + ' ' + data);
  });

  child.stderr.on('data', function (data) {
    console.log(app + ' ' + data);
  });
}
