var fs = require('fs');
var glob = require('glob');

module.exports = function(options) {
  
  var keyFile = options.keys;
  var inputGlob = options.path;

  console.log("Reading keys from " + keyFile);
  var sourceKeys = JSON.parse(fs.readFileSync(keyFile, 'utf8'));

  var used = {};

  glob(inputGlob, {}, function(er, files) {
    files.forEach(function(file) {
      var contents = fs.readFileSync(file, 'utf8');

      for(var key in sourceKeys) {
        if(!used[key] && contents.includes(key)) {
          used[key] = sourceKeys[key];
        }
      }
    });

    fs.writeFileSync(keyFile, JSON.stringify(used, null, 2), 'utf8');
    console.log("Written to " + keyFile);
  });
}