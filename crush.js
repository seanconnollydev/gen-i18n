#! /usr/bin/env node

var fs = require('fs');
var argv = require('yargs').argv;

var sourceFile = argv._[0];
var destinationFile = argv._[1];
var newString = argv.with || '_';

console.log("Reading keys from " + sourceFile);
var sourceKeys = JSON.parse(fs.readFileSync(sourceFile, 'utf8'));

var crushedKeys = {};
for(var key in sourceKeys) {
  crushedKeys[key] = sourceKeys[key].replace(/\S/g, newString)
}

console.log("Writing crushed keys to " + destinationFile);
fs.writeFileSync(destinationFile, JSON.stringify(crushedKeys, null, 2), 'utf8');