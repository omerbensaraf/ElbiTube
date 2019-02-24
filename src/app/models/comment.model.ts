export interface Comment {
    sname : String,
    _id : String,
    parent : String,
    user : String,
    time : number,
    content : String,
    videoId : String,
    likeUsers : String[];
    disLikeUsers : String[];
    counter : number;
  }


export enum ReplyStatus{
  VR = "View replies",
  HR = "Hide replies"
}