#! /usr/bin/env node

var fs = require('fs');
var argv = require('yargs').argv;
var glob = require('glob');

var inputGlob = argv._[0];
var destinationFile = argv._[1];

var htmlTextRegex = /<.+>(.+)<\/.+>/g; // <h3>Word</h3>
var iconRegex = /<i.*|md-icon.*>(.+)<\/i.*|md-icon.*>/; //but not <i class="material-icons">check</i> or <md-icon class="material-icons">check</md-icon>
var angularFilterRegex = /{{.+}}/; // {{angularMessage}}, {{ 'word' | translate }}
var strings = [];

glob(inputGlob, {}, function(er, files) {
  files.forEach(function(file) {
    
    var contents = fs.readFileSync(file, 'utf8');
    var match = htmlTextRegex.exec(contents);
    while (match != null) {
      if(!iconRegex.test(match[0]) && !angularFilterRegex.test(match[1]) && strings.indexOf(match[1]) === -1) {
        strings.push(match[1]);  
      }
      match = htmlTextRegex.exec(contents);
    }
  });

  var joinedStrings = strings.join('\n');

  fs.writeFileSync(destinationFile, joinedStrings, 'utf8');
  console.log("Written to " + destinationFile);
});