const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/users');
const Video = require('./models/videos');
const cors = require('cors');

// Get and Set ffmpeg library for frame generation
const path = require('path');
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);


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
    storage: storage
}).single('myFiles');

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

// Use Cross Origin Resource Sharing
app.use(cors());

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
        if(req.file === undefined){
            console.log(">>> undefined! ");
        } else {
            // define the destination folder which the frame will be saved
            var frameDestinationPath = 'public\\uploads\\frames\\';
            var videoName = path.parse(req.file.originalname).name;
            // define the name of the frame / image
            var frameName = videoName+'_frame.jpg';
            var frame = ffmpeg(req.file.path);
            console.log(">>>  frame: " +  JSON.stringify(frame));   
            // generate the frame from the video
            frame.screenshots({
                timestamps: ['1'],
                count: 1,
                filename: frameName,
                folder: frameDestinationPath,
                size: '320x240'
            });
            // gerenate schema object and save in DB
            var video = new Video({ title: req.file.originalname, src: req.file.path, imageSrc: frameDestinationPath+frameName, type: req.file.mimetype});
            console.log(">>>  req.files.originalname: " +  req.file.originalname);
            video.save();
        }
    });
});

const port = 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));