const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/users');
const Video = require('./models/videos');

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
        //console.log(file);
        cb(null,file.fieldname + '-' + file.originalname);
    }
});

// Init Upload
const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
    // fileFilter: function(req, file, cb){
    //     checkFileType(file, cb);
    // }
}).array('myFiles');

// Init app
const app = express();

// Define View Engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Define parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Public Folder
app.use(express.static('./public'));

// Connect to DB
mongoose.connect('mongodb://localhost/db');
var db = mongoose.connection;
// if error occurred
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("We're connected to db!");
});



// Gt home page
app.get("/", function (req,res) {
    res.sendFile(__dirname+"/views/index.html");
})


// Get videos page - display videos from db
app.get('/videos', function (req,res) {
    mongoose.model('Video').find(function (err,videos) {
        res.send(videos);
    })
});

// Get users page - display users from db
app.get('/users', function (req,res) {
    mongoose.model('User').find(function (err,users) {
        res.send(users);
    })
});

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if(err){
            res.render('index', {
                msg: err
            });
        } else {

            if(req.files === undefined){
                console.log(">>> undefined! ");
                res.render('index', {
                    msg: 'Error: No File Selected!'
                });
            } else {
                console.log(">>> log files: ");
                console.log(req.files);
                var video = new Video({ title: req.files[0].originalname, src: req.files[0].path, imageSrc: req.files[0].path, type: req.files[0].mimetype});
                console.log(">>>  req.files.originalname: " +  req.files[0].originalname);
                video.save();
                res.render('index', {
                    msg: 'File Uploaded!',
                    file: 'uploads/${req.file.filename}'
                });
            }
        }
    });
});

const port = 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));


