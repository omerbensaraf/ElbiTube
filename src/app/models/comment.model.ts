export interface Comment {
    parent : String,
    user : String,
    time : number,
    content : String,
    videoId : String,
    likeUsers : String[];
    disLikeUsers : String[];
    counter : number;
  }


export enum ReplayStatus{
  VR = "View replies",
  HR = "Hide replies"
}