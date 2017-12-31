var AdmZip = require('adm-zip');
var http = require('https');
var fs = require('fs');

var download = function(url, dest, cb) {
  var file = fs.createWriteStream(dest);
  var request = http.get(url, function(response) {
  	if (response.statusCode === 200) {
  		console.log('Downloading Gravit Designer...');
  	} else {
  		console.log('Error downloading Gravit Designer. Please check your connection and try again.');
  		return cb;
  	}
    response.pipe(file);
    file.on('finish', function() {
      	file.close();
    		var zip = new AdmZip(file.path);
    		zip.extractAllTo(__dirname + '/node_modules/gravit-designer', true);
        fs.unlink(file.path);
    });
  }).on('error', function(err) {
    fs.unlink(dest);
    if (cb) cb(err.message);
  });
};

download('https://designer.gravit.io/_downloads/mac/GravitDesignerPlugin.zip', __dirname + '/gravit-designer.zip', function(err) {
	if (err) throw err;
});
