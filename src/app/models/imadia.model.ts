export interface IMedia {
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