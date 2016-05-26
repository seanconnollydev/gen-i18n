#! /usr/bin/env node

var fs = require('fs');
var glob = require('glob');

var args = process.argv.slice(2);
var keyFile = args[0];
var inputGlob = args[1];

var keyedStrings = JSON.parse(fs.readFileSync(keyFile, 'utf8'));
var keys = Object.keys(keyedStrings);

glob(inputGlob, {}, function(er, files) {
  files.forEach(function(file) {
    fs.readFile(file, 'utf8', function(err, contents) {

      keys.forEach(function(key) {

        /*
          <p>Some text</p>
          <h3>Some text</h3>
          <md-button class="blah">Some text</md-button>
          <h5> Remember leading and trailing spaces </h5>
        */
        contents = contents.replace(
          new RegExp("(<.+>\\s*)" + keyedStrings[key] + "(\\s*<\/.+>)"),
          "$1{{ '" + key + "' | translate }}$2");
      });

      fs.writeFile(file, contents, function() {
        console.log(file);
      });
    });
  });
});