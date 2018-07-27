export interface IMedia {
  _id: String;
  title: string;
  src: string;
  type: string;
  imageSrc : String;
  likeUsers : String[];
  disLikeUsers : String[];
}


export enum Updates{
  AddLike = 1,
  RemoveLike,
  AddDisLike,
  RemoveDisLike,
  AddLikeRemoveDisLike,
  AddDisLikeRemoveLike
}