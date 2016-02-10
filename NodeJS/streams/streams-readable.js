"use strict";

var fs = require("fs"),
    data = '';

var fireRead = fs.createReadStream("hworld");
var fireWrite = fs.createWriteStream("hworld1");

fireRead.on('data', function(chunk) {
	fireRead.pause();
	console.log(fireRead.isPaused());
	if(fireRead.isPaused()) {
		fireRead.resume()
	}
    data += chunk;
});

fireRead.on('end', function(){
	console.log(data);
})

fireRead.pipe(fireWrite);
