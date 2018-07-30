import { Component, OnInit, Input } from '@angular/core';
import { IMedia, Updates } from '../../models/imadia.model';
import {MediaService} from '../../services/media.service';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss']
})

export class LikeComponent implements OnInit {
  likeSelected : boolean;
  likeImg : String;
  likeCounter : number;
  unLikeSelected : boolean;
  unLikeImg : String;
  unLikeCounter : number;
  specificItem : IMedia; 
  @Input() item : IMedia;
  @Input() userId : String;
  updates : Updates;


  constructor(private mediaService : MediaService) { 
    this.likeSelected = false;
    this.likeImg = "./assets/images/like.png";
    this.likeCounter = 0;

    this.unLikeSelected = false;
    this.unLikeImg = "./assets/images/unlike.png";
    this.unLikeCounter = 0;

    this.specificItem = this.mediaService.httpGetSpecificItem(1);
    this.likeCounter = this.specificItem.likeCouner;
    this.unLikeCounter = this.specificItem.unLikeCouner;
    this.updateLikeSelected();
  }

  ngOnInit() {
  }

  onLike(){
    this.specificItem = this.mediaService.httpGetSpecificItem(1);
    if(this.likeSelected){
      this.likeImg = "./assets/images/like.png";
      this.likeCounter -=1;
      this.updates = Updates.RemoveLike;
    }
    else{
      this.likeImg = "./assets/images/like-selected.png";
      this.likeCounter +=1;
      this.updates = Updates.AddLike;
      if(this.unLikeSelected){
        this.unLikeImg = "./assets/images/unlike.png";
        this.unLikeCounter -=1;
        this.unLikeSelected = false; 
        this.updates = Updates.AddLikeRemoveUnLike;      
      }
    }
    this.likeSelected = !this.likeSelected;
    //this.updateItem("onLike",!this.likeSelected,!this.unLikeSelected);
    this.updateItem(this.updates)
  }

  
  onUnLike(){
    if(this.unLikeSelected){
      this.unLikeImg = "./assets/images/unlike.png";
      this.unLikeCounter -=1;
      this.updates = Updates.RemoveUnLike;
    }
    else{
      this.unLikeImg = "./assets/images/unlike-selected.png";
      this.unLikeCounter +=1;
      this.updates = Updates.AddUnLike;
      if(this.likeSelected){
        this.likeImg = "./assets/images/like.png";
        this.likeCounter -=1;
        this.likeSelected = false;
        this.updates = Updates.AddUnLikeRemoveLike;
      }
    }
   
    this.unLikeSelected = !this.unLikeSelected;
    this.updateItem(this.updates);
  }

  updateItem(updates : Updates){
    this.specificItem.likeCouner = this.likeCounter;
    this.specificItem.unLikeCouner = this.unLikeCounter;
    switch(updates){
      case Updates.AddLike:{
        this.specificItem.likeUsers.push(this.userId);    
        break;
      }
      case Updates.RemoveLike:{
        var index = this.specificItem.likeUsers.indexOf(this.userId, 0);
        if(index > -1){
        this.specificItem.likeUsers.splice(index,1);
        }    
        break;
      }
      case Updates.AddUnLike:{
        this.specificItem.unLikeUsers.push(this.userId);    
        break;
      }
      case Updates.RemoveUnLike:{
        var index = this.specificItem.unLikeUsers.indexOf(this.userId, 0);
        if(index > -1){
        this.specificItem.unLikeUsers.splice(index,1);    
        }
        break;
      }
      case Updates.AddLikeRemoveUnLike:{
        this.specificItem.likeUsers.push(this.userId);
        var index = this.specificItem.unLikeUsers.indexOf(this.userId, 0);
        if(index > -1){
        this.specificItem.unLikeUsers.splice(index,1);
        }
        break;
      }
      case Updates.AddUnLikeRemoveLike:{
        this.specificItem.unLikeUsers.push(this.userId);  
        var index = this.specificItem.likeUsers.indexOf(this.userId, 0);
        if(index > -1){
        this.specificItem.likeUsers.splice(index,1);
        }
        break;    
      }
    }
    this.mediaService.httpUpdateSpecificItem(this.specificItem,1);
  }


  updateLikeSelected(){
    if(this.specificItem.likeUsers.includes(this.userId)){
      this.likeSelected = true;
    }
    else{
      this.likeSelected = false;
    }

    if(this.specificItem.unLikeUsers.includes(this.userId)){
      this.unLikeSelected = true;
    }
    else{
      this.unLikeSelected = false;
    }
  } 

}

