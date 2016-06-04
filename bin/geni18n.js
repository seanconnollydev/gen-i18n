#! /usr/bin/env node
var argv = require('yargs').argv;

var command = argv._[0] || 'gen';
switch(command) {
  case 'gen':
    _gen();
    break;
  case 'crush':
    _crush();
    break;
  case 'replace':
    _replace();
    break;
  case 'extract':
    _extract();
    break;
  default:
    throw Error("Unrecognized command: " + command);
}

function _gen() {
  var gen = require('../src/gen');
  gen(argv);
}

function _crush() {
  var crush = require('../src/crush');
  crush(argv);
}

function _replace() {
  var replace = require('../src/replace');
  replace(argv);
}

function _extract() {
  var extract = require('../src/extract');
  extract(argv);
}