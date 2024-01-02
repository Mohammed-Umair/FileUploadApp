var express = require('express')
const app = express()
app.use(express.json())
var cors = require('cors')
app.use(cors())
const server = require('http').createServer(app)
const multer  = require('multer')

app.use(express.json())
app.use(express.urlencoded({
  extended: true
  }));

var storage = multer.diskStorage({   
  destination: function(req, file, cb) { 
     cb(null, './uploads');    
  }, 
  filename: function (req, file, cb) { 
     cb(null ,file.originalname);   
  }
});

var upload = multer({ storage: storage }).array('filesList', 99999999999)

server.listen(5000, (req, res) => {
  console.log("Server started!")
})


app.post('/upload', function(req,res){

  upload(req,res,function(err) {
      if(err) {
        console.log('Error is ', err)
          return res.end("Error uploading file.");
      }
      let data = req.files
      console.log('Data is ', data)
      res.status(200).json({
        msg: data
      });

  });
});
