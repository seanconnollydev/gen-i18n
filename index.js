#! /usr/bin/env node

var fs = require('fs');
var slug = require('slug');

var args = process.argv.slice(2);
var sourceFile = args[0];
var destinationFile = args[1];

console.log("Reading from " + sourceFile);

var strings = fs.readFileSync(sourceFile).toString().split("\n");

console.log("Generating keys for " + strings.length + " strings");

var keyedStrings = strings.map(function(line) {
  var obj = {};
  obj[slug(line, {lower: true, replacement: '_'}).substring(0, 25)] = line;
  return obj;
});

fs.writeFileSync(destinationFile, JSON.stringify(keyedStrings, null, 2), 'utf8');

console.log("Written to " + destinationFile);