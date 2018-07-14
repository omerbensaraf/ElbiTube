import { Component, OnInit, Input } from '@angular/core';
import { IMedia, Updates } from '../../models/imadia.model';
import {MediaService} from '../../services/media.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss']
})

export class LikeComponent implements OnInit {
  likeSelected : boolean;
  likeImg : String;
  unLikeSelected : boolean;
  unLikeImg : String;
  specificItem : IMedia; 
  @Input() item : IMedia;
  @Input() userEmail : String;
  updates : Updates;


  constructor(private mediaService : MediaService, private usersService: UsersService) { }
  

  ngOnInit() {
    debugger;
    this.mediaService.httpGetSpecificItem(this.item._id).subscribe(data => { 
      this.specificItem = data;
      debugger;
      this.updateLikeSelected();   
      });
   
  }

  onLike(){
    debugger;
    this.mediaService.httpGetSpecificItem(this.item._id).subscribe(data => { 
      debugger;
      this.specificItem = data;
      if(this.likeSelected){
        this.likeImg = "./assets/images/like.png";
        this.updates = Updates.RemoveLike;
      }
      else{
        this.likeImg = "./assets/images/like-selected.png";
        this.updates = Updates.AddLike;
        if(this.unLikeSelected){
          this.unLikeImg = "./assets/images/unlike.png";
          this.unLikeSelected = false; 
          this.updates = Updates.AddLikeRemoveUnLike;      
        }
      }
      this.likeSelected = !this.likeSelected;
      this.updateItem(this.updates);
      });
   
  }

  
  onUnLike(){
    this.mediaService.httpGetSpecificItem(this.item._id).subscribe(data => { 
      debugger;
      this.specificItem = data;
  if(this.unLikeSelected){
      this.unLikeImg = "./assets/images/unlike.png";
      this.updates = Updates.RemoveUnLike;
    }
    else{
      this.unLikeImg = "./assets/images/unlike-selected.png";
      this.updates = Updates.AddUnLike;
      if(this.likeSelected){
        this.likeImg = "./assets/images/like.png";
        this.likeSelected = false;
        this.updates = Updates.AddUnLikeRemoveLike;
      }
    }
   
    this.unLikeSelected = !this.unLikeSelected;
    this.updateItem(this.updates);
  });
  }

  updateItem(updates : Updates){
    switch(updates){
      case Updates.AddLike:{
        this.specificItem.likeUsers.push(this.userEmail);
        break;
      }
      case Updates.RemoveLike:{
        var index = this.specificItem.likeUsers.indexOf(this.userEmail, 0);
        if(index > -1){
        this.specificItem.likeUsers.splice(index,1);
        }    
        break;
      }
      case Updates.AddUnLike:{
        this.specificItem.unLikeUsers.push(this.userEmail);
        break;
      }
      case Updates.RemoveUnLike:{
        var index = this.specificItem.unLikeUsers.indexOf(this.userEmail, 0);
        if(index > -1){
        this.specificItem.unLikeUsers.splice(index,1);  
        }
        break;
      }
      case Updates.AddLikeRemoveUnLike:{
        this.specificItem.likeUsers.push(this.userEmail);
        var index = this.specificItem.unLikeUsers.indexOf(this.userEmail, 0);
        if(index > -1){
        this.specificItem.unLikeUsers.splice(index,1);
        }
        break;
      }
      case Updates.AddUnLikeRemoveLike:{
        this.specificItem.unLikeUsers.push(this.userEmail);  
        var index = this.specificItem.likeUsers.indexOf(this.userEmail, 0);
        if(index > -1){
        this.specificItem.likeUsers.splice(index,1);
        }
        break;    
      }
    }
    debugger;
    this.mediaService.httpUpdateSpecificItem(this.specificItem,this.item._id).subscribe(response =>{ 
      debugger;
      console.log(response) 
    });
    
  }


  updateLikeSelected(){
    if(this.specificItem.likeUsers.includes(this.userEmail)){
      this.likeSelected = true;
      this.likeImg = "./assets/images/like-selected.png";
    }
    else{
      this.likeSelected = false;
      this.likeImg = "./assets/images/like.png";
    }

    if(this.specificItem.unLikeUsers.includes(this.userEmail)){
      this.unLikeSelected = true;
      this.unLikeImg = "./assets/images/unlike-selected.png";
    }
    else{
      this.unLikeSelected = false;
      this.unLikeImg = "./assets/images/unlike.png";
    }
  } 

}
