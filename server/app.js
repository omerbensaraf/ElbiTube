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
    destination: './videos/',
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

// Expose Videos Public Folder
app.use(express.static('./videos'));

// Expose Images Public Folder
app.use(express.static('./videos/frames'));

// Use Cross Origin Resource Sharing
/*var corsOptions = {
    origin: 'http://localhost:4200'
    //optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}*/
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

// Get videos page - display videos json from db
app.get('/videos', function (req,res) {
    mongoose.model('Video').find(function (err,videos) {
        res.send(videos);
    })
});

// Play selected video
app.get('/videos/:videoId',  function (req,res) {
    var url = '';
    var videoSrc = '';

    console.log(">>> videoId "+ req.params.videoId);
    mongoose.model('Video').findOne({_id : req.params.videoId } ,function (err,selectedVideo) {
        url =  "http:\\\\11.0.73.2:3000";
        videoSrc = selectedVideo.src;
        console.log(">>> videos: "+ JSON.stringify(selectedVideo));
        /*var position = videoSrc.indexOf("selectedVideo");
        if(position != -1)
        var filePath = videoSrc.substr(position,videoSrc.length);*/
        //res.sendFile(__dirname + filePath);
        let videoPath = videoSrc.substr(url.length,videoSrc.length);
        //videos.viewes+=1;
        //videos.save();
        res.sendFile(__dirname + videoPath + ".mp4");
        //res.sendFile(__dirname + "\\videos\\20161130_113247_001.mp4");
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
            var frameDestinationPath = 'videos\\frames\\';
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
            var video1 = new Video({
                _id : mongoose.Types.ObjectId(),
                title: 'Pale Blue Dot',
                src: 'http://static.videogular.com/assets/videos/videogular.mp4',
                type: 'video/mp4',
                imageSrc : "./assets/images/banner-1.jpg",
                likeUsers : [],
                unLikeUsers : []
            
            });
            var video2 = new Video({
                _id : mongoose.Types.ObjectId(),
                title: 'Big Buck Bunny',
                src: 'http://static.videogular.com/assets/videos/big_buck_bunny_720p_h264.mov',
                type: 'video/mp4',
                imageSrc : "./assets/images/banner-2.jpg",
                likeUsers : [],
                unLikeUsers : []
            });
            var video3 = new Video({
                _id : mongoose.Types.ObjectId(),
                title: 'Elephants Dream',
                src: 'http://static.videogular.com/assets/videos/' + _id + ".mp4" ,
                type: 'video/mp4',
                imageSrc : "./assets/images/banner-3.jpg",
                likeUsers : [],
                unLikeUsers : []
            });
            //var video = new Video({ title: req.file.originalname, src: req.file.path, imageSrc: frameDestinationPath+frameName, type: req.file.mimetype});
            console.log(">>>  req.files.originalname: " +  req.file.originalname);
            video1.save();
            video2.save();
            video3.save();
        }
    });
});


const port = 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));