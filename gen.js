#! /usr/bin/env node

var fs = require('fs');
var slug = require('slug');

var args = process.argv.slice(2);
var sourceFile = args[0];
var destinationFile = args[1];
var destinationFileFormat = destinationFile.substring(destinationFile.lastIndexOf('.') + 1);

console.log("Reading from " + sourceFile);

var strings = fs.readFileSync(sourceFile).toString().split("\n");

console.log("Generating keys for " + strings.length + " strings");

var keyedStrings = {};

strings.forEach(function(str) {
  if(!str.length) return;

  keyedStrings[slug(str, {lower: true, replacement: '_'}).substring(0, 100)] = str;
});

fs.writeFileSync(destinationFile, _formatKeys(keyedStrings), 'utf8');

console.log("Written to " + destinationFile);

function _formatKeys(keyedStrings) {
  switch(destinationFileFormat) {
    case 'json':
      return _formatJson(keyedStrings);
      break;
    case 'strings':
      return _formatiOSStrings(keyedStrings);
      break;
    default:
      throw new Error("Unrecognized destination file format: " + destinationFileFormat);
  }
}

function _formatJson(keyedStrings) {
  return JSON.stringify(keyedStrings, null, 2);
}

function _formatiOSStrings(keyedStrings) {
  var keys = Object.keys(keyedStrings);
  return keys.reduce(function(prev, curr, i) {
    if (i === 1) {
      prev = _formatLine(prev, keyedStrings[prev]);
    }
    // return prev + '\n' + _formatLine(curr, keyedStrings[curr]);
    return `${prev}\n${_formatLine(curr, keyedStrings[curr])}`;
  });

  function _formatLine(key, val) {
    return `"${key}": "${val}"`;
  }
}