var express = require("express"),
    path = require('path'),
    app = express(),
    formidable = require('formidable'),
    util = require('util'),
    fs   = require('fs-extra'),
    qt   = require('quickthumb'),
    uuid = require('node-uuid');

// Use quickthumb
app.use(qt.static(__dirname + '/'));

app.post('/upload', function (req, res){
  var form = new formidable.IncomingForm();

  // form.parse(req, function(err, fields, files) {
  //   res.writeHead(200, {'content-type': 'text/plain'});
  //   res.write('received upload:\n\n');
  //   res.end({msg: 'success'})
  //   res.end(util.inspect({fields: fields, files: files}));
  // });
  form.parse(req);

  form.on('end', function(fields, files) {
    /* Temporary location of our uploaded file */
    var temp_path = this.openedFiles[0].path;
    /* The file name of the uploaded file */
    var file_name = this.openedFiles[0].name;
    /* Location where we want to copy the uploaded file */
    var new_location = 'uploads/';

    var idx = file_name.indexOf(".")
    if (idx < 0 || !/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(file_name)) {
        return res.send({err: '不是图片'});
    }

    var extention = file_name.slice(idx)

    var newFileName = uuid.v4();


    console.log(newFileName, file_name);

    fs.copy(temp_path, new_location + newFileName + extention, function(err) {
      if (err) {
        console.error(err);
      } else {
        res.send({src: newFileName + extention});
        console.log("success!")
      }
    });
  });
});

// Show the upload form
app.get('/', function (req, res){
  res.sendFile(path.join(__dirname + '/index.html'));
});
app.listen(8080);