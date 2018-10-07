export interface Comment {
    _id: String;
    user : String,
    time : number,
    content : String,
    videoId : String,
    likeUsers : String[];
    disLikeUsers : String[];
  }