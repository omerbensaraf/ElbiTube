export interface IMedia {

  _id: String;
  title: string;
  src: string;
  type: string;
  imageSrc : String;
  likeUsers : String[];
  disLikeUsers : String[];
  viewes: number;
    uploadedBy: String;

}

export enum Updates{

  AL = 'AddLike',
  RL = 'RemoveLike',
  ADL = 'AddDisLike',
  RDL = 'RemoveDisLike',
  ALRDL = 'AddLikeRemoveDisLike',
  ADLRL = 'AddDisLikeRemoveLike'
}

