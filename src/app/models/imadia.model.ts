export interface IMedia {
  title: string;
  src: string;
  type: string;
  imageSrc : String;
  uploadedBy : String;
  likeCounter : number;
  unLikeCounter : number;
  likeUsers : String[];
  unLikeUsers : String[];
  viewedUsers : String[];
  viewedUsersCounter : number;
}


export enum Updates{
  AddLike = 1,
  RemoveLike,
  AddUnLike,
  RemoveUnLike,
  AddLikeRemoveUnLike,
  AddUnLikeRemoveLike
}