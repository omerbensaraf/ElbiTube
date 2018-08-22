const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/users');
const Video = require('./models/videos');
const cors = require('cors');
const config = require('./config');
const getDuration = require('get-video-duration');
const socketIO = require('socket.io');
// Get and Set ffmpeg library for frame generation
const path = require('path');
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
const fuzzysort = require('./fuzzysort');
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);




// Define Storage Engine as Disk Storage
const storage = multer.diskStorage({
    destination: './videos/',
    filename: function(req, file, cb){
        cb(null,file.originalname);
    }
});

// Init Multer and Storage
const upload = multer({
    storage: storage
}).single('myFiles');

// Define the app
const app = express();
let http = require('http');
let server = http.Server(app);



let io = socketIO(server);
io.on('connection', (socket) => {
    console.log('user connected');


    socket.on('AddLike', function(id,userEmail) {
        addLike(id,userEmail);
      });

    socket.on('AddLikeRemoveDisLike', function(id,userEmail) {
        addLikeRemoveDisLike(id,userEmail);
        });

    socket.on('RemoveLike', function(id,userEmail) {
        removeLike(id,userEmail);
        });

    socket.on('AddDisLike', function(id,userEmail) {
        addDisLike(id,userEmail);
        });
    socket.on('RemoveDisLike', function(id,userEmail) {
        removeDisLike(id,userEmail);
        });
    socket.on('AddDisLikeRemoveLike', function(id,userEmail) {
        addDisLikeRemoveLike(id,userEmail);
        });



});
/*const connections = [];
io.sockets.on('connection',(socket) => {
    connections.push(socket);
    console.log(' %s sockets is connected', connections.length);
 
    socket.on('disconnect', () => {
       connections.splice(connections.indexOf(socket), 1);
    });
 });*/


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

// Define Cross Origin Resource Sharing
/*var corsOptions = { origin: 'http://localhost:4200' //optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204}*/
app.use(cors());

// Define MongoDB
mongoose.connect('mongodb://localhost/db');
var db = mongoose.connection;
// if error occurred
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("We're connected to db!");
});


// Get home page
app.get("/", function (req,res) {
    res.sendFile(__dirname+"/views/index.html");
})

// Get videos page - display videos json from db
app.get('/videos', function (req,res) {
    mongoose.model('Video').find(function (err,videos) {
        res.send(videos);
    })
});

function addLike (id,userEmail) {
    var query = {_id: id};
    var options = { new: true }; 
    mongoose.model('Video').findOneAndUpdate(query, {$push: {likeUsers: userEmail}},
        options, function(err, doc){
        io.emit("update-like-counter",doc);
    })
}

function addLikeRemoveDisLike (id,userEmail) {
    var query = {_id: id};
    var options = { new: true }; 
    mongoose.model('Video').findOneAndUpdate(query,{
        $push: {likeUsers: userEmail},
        $pull: {disLikeUsers: userEmail}
        },
        options, function(err, doc){
        io.emit("update-like-counter",doc);
    })
}


function removeLike (id,userEmail) {
    var query = {_id: id};
    var options = { new: true }; 
    mongoose.model('Video').findOneAndUpdate(query, {$pull: {likeUsers: userEmail}},
        options, function(err, doc){
        io.emit("update-like-counter",doc);
    })
}

function addDisLike (id,userEmail) {
    var query = {_id: id};
    var options = { new: true }; 
    mongoose.model('Video').findOneAndUpdate(query, {$push: {disLikeUsers: userEmail}},
        options, function(err, doc){
        io.emit("update-like-counter",doc);
    })
}

function removeDisLike (id,userEmail) {
    var query = {_id: id};
    var options = { new: true }; 
    mongoose.model('Video').findOneAndUpdate(query, {$pull: {disLikeUsers: userEmail}},
        options, function(err, doc){
        io.emit("update-like-counter",doc);
    })
}

function addDisLikeRemoveLike (id,userEmail) {
    var query = {_id: id};
    var options = { new: true }; 
    mongoose.model('Video').findOneAndUpdate(query,{
        $push: {disLikeUsers: userEmail},
        $pull: {likeUsers: userEmail}
        },
        options, function(err, doc){
        io.emit("update-like-counter",doc);
    })
}

//app.get('/videoRecord/:videoId', function(req,res){
app.get('/getVideoProperties/:videoId', function(req,res){
    mongoose.model('Video').findOne({_id : req.params.videoId } ,function (err,video) {
        res.send(video);
        // video.views+=1;
        // video.save();
    })
});


// Update Number of views
app.put('/updateNumberOfViews/:videoId', function(req,res){
    mongoose.model('Video').findOne({_id : req.params.videoId } ,function (err,video) {
        video.views+=1;
        video.save();
    })
});

// Get Specific Video - Play selected video
app.get('/videos/:videoId',  function (req,res) {
    
    var url = '';
    var videoSrc = '';
    //console.log(">>> Inside get --------> videoId "+ req.params.videoId);

    mongoose.model('Video').findOne({_id : req.params.videoId } ,function (err,selectedVideo) {
        //console.log(">>> Inside findOne  --------> videoId "+ JSON.stringify(selectedVideo));
        getDuration(selectedVideo).then((duration) => {
            console.log(">>> duration: " +duration);
        });
        url = config.url;
        videoSrc = selectedVideo.src;
        var position = videoSrc.indexOf("\\videos");
        if(position !== -1) {
            let filePath = videoSrc.substr(position,videoSrc.length); 
            let fileType = getFileExtensionAndValidation(selectedVideo.type);
            //console.log(">>>fileType: "+ fileType);
            if (fileType !== -1) {   
                res.sendFile(__dirname + filePath + fileType);
                // selectedVideo.views+=1;
                // selectedVideo.save();
                //console.log(">>> file name: "+ selectedVideo.title);
            }
            else {
                throw ("File type is not compatible");
            }   
        }
    })
});

// Get users page - display users from db
app.get('/users', function (req,res) {
    mongoose.model('User').find(function (err,users) {
        res.send(users);
    })
});

app.get('/searchVideos/:searchedValue', function (req,res) {
    const searchedVideoArr = [];
    if (req.params && req.params.searchedValue && req.params.searchedValue.trim().length > 0) {
        mongoose.model('Video').find(function (err,videos) {
            const results = fuzzysort.go(req.params.searchedValue, videos, {key:'title'});            
            results.map((vid) => {
                searchedVideoArr.push(vid.obj);
            });
            res.send(searchedVideoArr);
        })
    }
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
            // From a local path...
            getDuration(req.file).then((duration) => {
                console.log(">>> duration: " +duration);
            });
            // generate the frame from the video
            frame.screenshots({
                timestamps: ['1'],
                count: 1,
                filename: frameName,
                folder: frameDestinationPath,
                size: '320x240'
            });
            // gerenate schema object and save in DB
            let id = mongoose.Types.ObjectId();
            var video = new Video({ 
                _id : id,
                title: req.file.originalname, 
                 //src: req.file.path,
                 src: 'http:\\\\11.0.73.2:3000\\videos\\'+id,
                imageSrc: 'http:\\\\11.0.73.2:3000\\'+frameDestinationPath+frameName, 
                type: req.file.mimetype, 
                views: 0, 
                uploadedBy: 'Alon Yeshurun'
            });
            console.log(">>>  req.files.originalname: " +  req.file.originalname);
            video.save();
            /*
            var video1 = new Video({
                _id : mongoose.Types.ObjectId(),
                title: 'Pale Blue Dot',
                src: 'http://static.videogular.com/assets/videos/videogular.mp4',
                type: 'video/mp4',
                imageSrc : "./assets/images/banner-1.jpg",
                likeCouner : 0,
                unLikeCouner : 0,
                likeUsers : [],
                unLikeUsers : [],
                views: 0,
                uploadedBy: 'Alon Yeshurun'
            
            });
            var video2 = new Video({
                _id : mongoose.Types.ObjectId(),
                title: 'Big Buck Bunny',
                src: 'http://static.videogular.com/assets/videos/big_buck_bunny_720p_h264.mov',
                type: 'video/mp4',
                imageSrc : "./assets/images/banner-2.jpg",
                likeCouner : 0,
                unLikeCouner : 0,
                likeUsers : [],
                unLikeUsers : [],
                views: 0,
                uploadedBy: 'Alon Yeshurun'
            });
            var video3 = new Video({
                _id : mongoose.Types.ObjectId(),
                title: 'Elephants Dream',
                src: 'http://static.videogular.com/assets/videos/' + _id + ".mp4" ,
                type: 'video/mp4',
                imageSrc : "./assets/images/banner-3.jpg",
                likeCouner : 0,
                unLikeCouner : 0,
                likeUsers : [],
                unLikeUsers : [],
                views: 0,
                uploadedBy: 'Alon Yeshurun'
            });
            video1.save();
            video2.save();
            video3.save();
            */
        }
    });
});

const port = 3000;

function getFileExtensionAndValidation(filename) {
    var ext = filename.slice((filename.lastIndexOf("/") - 1 >>> 0) + 2);
    if (config.videosExt.includes(ext))  {
        //console.log(">>> in config");
        return "."+ext;
    }
    else return -1;
}

server.listen(port, () => console.log(`Server started on port ${port}`));