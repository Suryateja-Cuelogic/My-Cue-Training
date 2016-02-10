"use strict";

var fs = require("fs");


/*fs.mkdir("test", function(err) {
    if (err) throw err;
    console.log("Directory created successfully");
});*/

var buf = new Buffer(1024);

console.log("Going to open an existing file");
fs.open('world', 'r+', function(err, fd) {
   if (err) {
       return console.error(err);
   }
   console.log("File opened successfully!");
   console.log("Going to read the file");
   fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
      if (err){
         console.log(err);
      }
      console.log(bytes + " bytes read");
      
      // Print only read bytes to avoid junk.
      if(bytes > 0){
         console.log(buf.slice(0, bytes).toString());
      }
   });
});

/*var file = fs.createReadStream("world", {
    start: 0
});
console.log(file);*/

/*fs.access("world", fs.W_OK, function(err) {
    if (err) throw err;
    console.log("Able to read / write the file");
})*/

/*try {

    fs.accessSync("world", fs.W_ok);
    console.log("Able to read / write the file");

} catch (err) {
    console.log(err);
}
*/

/*fs.chmod("world", fs.R_OK, function(err) {
    if (err) throw err;
    console.log("File Permission changed")
})
*/
