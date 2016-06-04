var fs = require('fs');

module.exports = function(options) {
  
  var keyFile = options.keys;
  var destinationFile = options.dest;
  var newString = options.with || '_';

  console.log("Reading keys from " + keyFile);
  var sourceKeys = JSON.parse(fs.readFileSync(keyFile, 'utf8'));

  var crushedKeys = {};
  for(var key in sourceKeys) {
    crushedKeys[key] = sourceKeys[key].replace(/\S/g, newString)
  }

  console.log("Writing crushed keys to " + destinationFile);
  fs.writeFileSync(destinationFile, JSON.stringify(crushedKeys, null, 2), 'utf8');
}