var fs = require('fs');
var glob = require('glob');

module.exports = function(options) {

  var args = process.argv.slice(2);
  var keyFile = options.keys;
  var inputGlob = options.path;

  var keyedStrings = JSON.parse(fs.readFileSync(keyFile, 'utf8'));
  var keys = Object.keys(keyedStrings);

  glob(inputGlob, {}, function(er, files) {
    files.forEach(function(file) {
      var contents = fs.readFileSync(file, 'utf8');
      keys.forEach(function(key) {
        
        contents = contents.replace(
            new RegExp("(<.+>\\s*)" + keyedStrings[key] + "(\\s*<\/.+>)", "g"),
            "$1<span translate>" + key + "</span>$2");
            // "$1{{ '" + key + "' | translate }}$2");
      });

      fs.writeFileSync(file, contents);
      console.log(file);
    });
  });
};

/*
  <p>Some text</p>
  <h3>Some text</h3>
  <md-button class="blah">Some text</md-button>
  <h5> Remember leading and trailing spaces </h5>
*/