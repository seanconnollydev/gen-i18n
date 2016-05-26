#! /usr/bin/env node

var fs = require('fs');
var replace = require('replace');

var args = process.argv.slice(2);
var keyFile = args[0];
var targetPath = args[1];

console.log("Key file: " + keyFile);

var keyedStrings = JSON.parse(fs.readFileSync(keyFile, 'utf8'));
var keys = Object.keys(keyedStrings);

keys.forEach(function(key) {
  var str = keyedStrings[key];
  
  /*
    <p>Some text</p>
    <h3>Some text</h3>
    <md-button class="blah">Some text</md-button>
  */
  var regex = "(<.+>)" + str + "(<\/.+>)";
  
  replace({
    regex: regex,
    replacement: "$1{{'" + key + "' | translate}}$2", //{{'nav_profile' | translate}}
    paths: ['.'],
    include: targetPath,
    recursive: true,
    silent: false
  });
  
});

