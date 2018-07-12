export interface IMedia {
<<<<<<< HEAD
  _id: string,
=======
  _id : String;
>>>>>>> 4a2cfb8d932e3085643aa581e296ba2d7641f85a
  title: string;
  src: string;
  type: string;
  imageSrc : String;
  likeCouner : number;
  unLikeCouner : number;
  likeUsers : String[];
  unLikeUsers : String[];
}


export enum Updates{
  AddLike = 1,
  RemoveLike,
  AddUnLike,
  RemoveUnLike,
  AddLikeRemoveUnLike,
  AddUnLikeRemoveLike
}
