var fs = require('fs');
var glob = require('glob');

module.exports = function(options) {
  
  var keyFile = options.keys;
  var inputGlob = options.path;

  console.log("Reading keys from " + keyFile);
  var originalKeys = JSON.parse(fs.readFileSync(keyFile, 'utf8'));

  var used = {};

  glob(inputGlob, {}, function(er, files) {
    files.forEach(function(file) {
      var contents = fs.readFileSync(file, 'utf8');

      for(var key in originalKeys) {
        if(!used[key] && contents.includes(key)) {
          used[key] = originalKeys[key];
        }
      }
    });

    var newKeys = {}, count = 0;
    for (var key in originalKeys) {
      if(used[key]) {
        newKeys[key] = originalKeys[key];
      } else {
        console.log("Removing " + key);
        count++;
      }
    }

    console.log("Removed ".concat(count).concat(" keys"));
    fs.writeFileSync(keyFile, JSON.stringify(newKeys, null, 2), 'utf8');
    console.log("Written to " + keyFile);
  });
}