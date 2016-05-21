var fs = require('fs');

var args = process.argv.slice(2);
var sourceFile = args[0];

console.log(sourceFile);

fs.readFile(sourceFile, 'utf8', function(err, data) {
  console.log(typeof data);
});