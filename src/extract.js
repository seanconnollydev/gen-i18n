var fs = require('fs');
var argv = require('yargs').argv;
var glob = require('glob');

module.exports = function extract(options) {
  var inputGlob = options.path;
  var destinationFile = options.dest;
  var keyFile = options.keys;

  var htmlTextRegex = /<.+>(.+?)<\/.+>/g; // <h3>Word</h3>
  var iconRegex = /<i.*|md-icon.*>(.+)<\/i.*|md-icon.*>/; //but not <i class="material-icons">check</i> or <md-icon class="material-icons">check</md-icon>
  var angularExpressionRegex = /{{.+}}/; // {{angularMessage}}, {{ 'word' | translate }}
  var keys = Object.keys(JSON.parse(fs.readFileSync(keyFile, 'utf8')));
  var strings = [];

  glob(inputGlob, {}, function(er, files) {
    files.forEach(function(file) {
      
      var contents = fs.readFileSync(file, 'utf8');
      var match = htmlTextRegex.exec(contents);
      while (match != null) {
        var tagWithText = match[0]; // <span><span translate>i_am_a_phrase</span></span>
        var innerText = match[1]; // i_am_a_phrase</span>
        if(
          strings.indexOf(innerText) === -1 && // The string was not already added to the output
          keys.indexOf(innerText) === -1 && // The string does not already exist as a key in the key file
          !angularExpressionRegex.test(innerText) && // The string is not an Angular expression
          !iconRegex.test(tagWithText)) // The string is not wrapped in an icon tag
        {
          strings.push(innerText);
        }
        match = htmlTextRegex.exec(contents);
      }
    });

    var joinedStrings = strings.join('\n');

    fs.writeFileSync(destinationFile, joinedStrings, 'utf8');
    console.log("Written to " + destinationFile);
  });
};