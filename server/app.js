const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
mongoose.set('debug', true);
const bodyParser = require('body-parser');
// const User = require('./models/users');
const Video = require('./models/videos');
const Comment = require('./models/comment');
const cors = require('cors');
const config = require('./config');
const getDuration = require('get-video-duration');
const socketIO = require('socket.io');
// Get and Set ffmpeg library for frame generation
const path = require('path');
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);
const fuzzysort = require('./fuzzysort');
var fs = require('fs');
var dateTime = require('node-datetime');
const userRoutes = require('./routes/users');
const commentsRoutes = require('./routes/comments');


// Define Storage Engine as Disk Storage
const storage = multer.diskStorage({
    destination: './videos/',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});



// Init Multer and Storage
const upload = multer({
    storage: storage
}).single("myFiles");

/*const upload = multer({
    dest: 'videos/' // this saves your file into a directory called "uploads"
  });*/


// Define the app
const app = express();
let http = require('http');
let server = http.Server(app);



let io = socketIO(server);
io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('newComment', function (comment) {
        addComment(comment);
    });

    socket.on('AddLike', function (id, userEmail,model) {
        console.log("MMMMMM " + model);
        addLike(id, userEmail,model);
    });

    socket.on('AddLikeRemoveDisLike', function (id, userEmail,model) {
        console.log("MMMMMM " + model);
        addLikeRemoveDisLike(id, userEmail,model);
    });

    socket.on('RemoveLike', function (id, userEmail,model) {
        console.log("MMMMMM " + model);
        removeLike(id, userEmail,model);
    });

    socket.on('AddDisLike', function (id, userEmail,model) {
        console.log("MMMMMM " + model);
        addDisLike(id, userEmail,model);
    });
    socket.on('RemoveDisLike', function (id, userEmail,model) {
        console.log("MMMMMM " + model);
        removeDisLike(id, userEmail,model);
    });
    socket.on('AddDisLikeRemoveLike', function (id, userEmail,model) {
        console.log("MMMMMM " + model);
        addDisLikeRemoveLike(id, userEmail,model);
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
app.use(express.static('./views'));

// Expose Images Public Folder
app.use(express.static('./videos/frames'));

// Define Cross Origin Resource Sharing
var corsOptions = { origin: 'http://10.173.3.13:4200' };//optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204}

app.use(cors());
app.use("/user", userRoutes); //all the will rest call's start with user prefix will get to here
app.use("/comment", commentsRoutes);

// Define MongoDB
mongoose.connect('mongodb://localhost/db');
var db = mongoose.connection;
// if error occurred
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("We're connected to db!");
});



// Get videos page - display videos json from db
app.get('/videos', function (req, res) {
    mongoose.model('Video').find(function (err, videos) {
        res.send(videos);
    })
});

function addComment(comment) {
    Comment.create(comment).then((result) => {
        console.log("ppppppppppppppp");
        console.log(comment.parent);
        updateParentsCounter(comment.parent).then((res)=>{
            let comments = {
                parent: comment.parent
            }
            mongoose.model('Comment').find(comments, function (err, comments) {
                console.log("emitttttttt");
                io.emit("update-comment", comments);
            })
        });
    });
}

async function updateParentsCounter(parent) {
    console.log(parent);
    var currParent = parent;
    var x = 1;
    //while (x < 3) {
    while (currParent !== null) {
        //console.log("kkkkkkk");
        let query = { _id: currParent};
        let options = { new: true }; 
        //console.log("id " +currParent);
        console.log("netanel");
         await mongoose.model('Comment').findOneAndUpdate(query,  { $inc: { counter: 1 } },options,
         //await mongoose.model('Comment').findOneAndUpdate(query, { counter: counter + 1 } ,options,   
         (err, doc)=>
        
            {
                console.log("x" + x++);
                console.log(doc);
                currParent = doc.parent;
                console.log(currParent);
                //console.log(doc);
                if (err) {
                    //return res.status(500).json(err);
                }
                else {
                    
                }
            });
            
    }
}


function addLike(id, userEmail,model) {
    var query = { _id: id };
    var options = { new: true };
    mongoose.model(model).findOneAndUpdate(query, { $push: { likeUsers: userEmail } },
        options, function (err, doc) {
            io.emit("update-like-counter", doc);
        })
}

function addLikeRemoveDisLike(id, userEmail,model) {
    var query = { _id: id };
    var options = { new: true };
    mongoose.model(model).findOneAndUpdate(query, {
        $push: { likeUsers: userEmail },
        $pull: { disLikeUsers: userEmail }
    },
        options, function (err, doc) {
            io.emit("update-like-counter", doc);
        })
}


function removeLike(id, userEmail,model) {
    var query = { _id: id };
    var options = { new: true };
    mongoose.model(model).findOneAndUpdate(query, { $pull: { likeUsers: userEmail } },
        options, function (err, doc) {
            io.emit("update-like-counter", doc);
        })
}

function addDisLike(id, userEmail,model) {
    var query = { _id: id };
    var options = { new: true };
    mongoose.model(model).findOneAndUpdate(query, { $push: { disLikeUsers: userEmail } },
        options, function (err, doc) {
            io.emit("update-like-counter", doc);
        })
}

function removeDisLike(id, userEmail,model) {
    var query = { _id: id };
    var options = { new: true };
    mongoose.model(model).findOneAndUpdate(query, { $pull: { disLikeUsers: userEmail } },
        options, function (err, doc) {
            io.emit("update-like-counter", doc);
        })
}

function addDisLikeRemoveLike(id, userEmail,model) {
    var query = { _id: id };
    var options = { new: true };
    mongoose.model(model).findOneAndUpdate(query, {
        $push: { disLikeUsers: userEmail },
        $pull: { likeUsers: userEmail }
    },
        options, function (err, doc) {
            io.emit("update-like-counter", doc);
        })
}

// Update Number of views
app.put('/updateNumberOfViews', (req, res) => {
    if (!req.body) {
        return res.status(500).json({
            message: 'Error While Update Views'
        });
    }
    else {
        let query = { _id: req.body._id };
        mongoose.model('Video').findOneAndUpdate(query, { $inc: { views: 1 } }, (err) => {
            if (err)
                return res.status(500).json(err);
            else {
                return res.status(200).json({
                    message: 'Update views succeeded'
                });
            }
        })
    }
});

// Get Specific Video - Play selected video
app.get('/videos/:videoId', function (req, res) {
    var url = '';
    var videoSrc = '';
    mongoose.model('Video').findOne({ _id: req.params.videoId }, function (err, selectedVideo) {
        url = config.url;
        if (selectedVideo && selectedVideo.src) {
            videoSrc = selectedVideo.src;
            var position = videoSrc.indexOf("\\videos");
            if (position !== -1) {
                let filePath = videoSrc.substr(position, videoSrc.length);
                //let fileType = getFileExtensionAndValidation(selectedVideo.type);
                //if (fileType !== -1) {   
                if (selectedVideo.type) {
                    res.sendFile(__dirname + filePath + selectedVideo.type);
                }
                else {
                    throw ("File type is not compatible");
                }
            }
        }

    })
});

// Get users page - display users from db
app.get('/users', function (req, res) {
    mongoose.model('User').find(function (err, users) {
        res.send(users);
    })
});

// Search value
app.get('/searchVideos/:searchedValue', function (req, res) {
    const searchedVideoArr = [];
    if (req.params && req.params.searchedValue && req.params.searchedValue.length > 0) {
        mongoose.model('Video').find(function (err, videos) {
            const results = fuzzysort.go(req.params.searchedValue, videos, { key: 'title' });
            results.map((vid) => {
                searchedVideoArr.push(vid.obj);
            });
            res.send(searchedVideoArr);
        })
    }
});


// Upload file
app.post('/upload', (req, res) => {

    upload(req, res, (err) => {
        if (req.body === undefined) {
            console.log(">>> undefined! in upload function");
        } else {

            console.log(">>> start upload the file! ");

            // define the destination folder which the frame will be saved
            var frameDestinationPath = __dirname + "\\" + 'videos\\frames\\';
            var videoName = path.parse(req.file.originalname).name;
            // define the name of the frame / image
            var frameName = videoName + '_frame.jpg';
            //var frame = ffmpeg(req.file.path); 
            console.log(req.file.path);

            console.log(">>> create a frame! ");
            // From a local path...
            getDuration(req.file.path).then((duration) => {
                console.log(">>> duration: " + duration);
            });

            var dt = dateTime.create();
            var formatted = dt.format('d n Y');
            console.log(formatted);

            let id = mongoose.Types.ObjectId();
            var videoType = req.file.originalname.slice(req.file.originalname.lastIndexOf("."), req.file.originalname.length)
            fs.rename(__dirname + "\\videos\\" + req.file.originalname, __dirname + "\\videos\\" + id + videoType, function (err) {
                if (err) console.log('ERROR: ' + err);
            });

            var frame = ffmpeg(__dirname + "\\videos\\" + id + videoType);
            // generate the frame from the video
            frame.screenshots({
                timestamps: ['1'],
                count: 1,
                filename: frameName,
                folder: frameDestinationPath,
                size: '320x240'
            });
            var category;
            if (req.body.category) category = req.body.category;
            var video = new Video({
                sname : "Video",
                _id: id,
                title: path.parse(req.file.originalname).name,
                //src: req.file.path,
                src: 'http:\\\\11.0.73.2:3000\\videos\\' + id,
                imageSrc: 'http:\\\\11.0.73.2:3000\\' + frameName,
                type: videoType,
                views: 0,
                uploadedBy: 'Alon Yeshurun',
                category: category,
                uploadedDate: formatted
            });
            console.log(">>>  req.body.originalname: " + req.file.originalname);
            video.save();
            console.log(__dirname + "\\videos\\" + req.file.originalname);
            console.log(__dirname + "\\vidoes\\" + id);

            res.send("OK");
        }

    });
});

const port = 3000;

function getFileExtensionAndValidation(filename) {
    var ext = filename.slice((filename.lastIndexOf("/") - 1 >>> 0) + 2);
    if (config.videosExt.includes(ext)) {
        //console.log(">>> in config");
        return "." + ext;
    }
    else return -1;
}


/*app.get('/removeAllVideos', (req, res, next) => {    
    Video.remove({})
    .exec()
    .then(() => {        
        return res.status(200).json({});
    })
    .catch((err) => {
        return res.status(500).json(err);
    });
});*/
// Get home page
app.get("*", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
})

server.listen(port, () => console.log(`Server started on port ${port}`));
