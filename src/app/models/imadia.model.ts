export interface IMedia {
  _id : String;
  title: string;
  src: string;
  type: string;
  imageSrc : string;
  likeUsers : String[];
  unLikeUsers : String[];
  views: number;
  uploadedBy: string;
}


export enum Updates{
  AddLike = 1,
  RemoveLike,
  AddUnLike,
  RemoveUnLike,
  AddLikeRemoveUnLike,
  AddUnLikeRemoveLike
}
