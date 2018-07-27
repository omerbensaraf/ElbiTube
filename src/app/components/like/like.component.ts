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
  disLikeSelected : boolean;
  disLikeImg : String;
  specificItem : IMedia; 
  @Input() item : IMedia;
  @Input() userEmail : String;
  updates : Updates;
  likeExists:boolean=false;

  constructor(private mediaService : MediaService, private usersService: UsersService) { }
  

  ngOnInit() {
    this.updateLikeSelected();
    this.likeExists=true; 
      
    this.mediaService.getLikeUpdates().subscribe((item: IMedia) => {
        if(this.item._id === item._id){
          this.item.likeUsers = item.likeUsers;
          this.item.disLikeUsers = item.disLikeUsers;
          this.updateLikeSelected();
        }
      }); 
  
  }

  onLike(){
      this.specificItem = this.item;
      if(this.likeSelected){
        this.updates = Updates.RemoveLike;
      }
      else{
        this.updates = Updates.AddLike;
        if(this.disLikeSelected){
          this.updates = Updates.AddLikeRemoveDisLike;      
        }
      }
      this.updateItem(this.updates);
  }

  
  onDisLike(){
      this.specificItem = this.item;
  if(this.disLikeSelected){
      this.updates = Updates.RemoveDisLike;
    }
    else{
      this.updates = Updates.AddDisLike;
      if(this.likeSelected){
      this.updates = Updates.AddDisLikeRemoveLike;
      }
    }
    this.updateItem(this.updates);
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
      case Updates.AddDisLike:{
        this.specificItem.disLikeUsers.push(this.userEmail);
        break;
      }
      case Updates.RemoveDisLike:{
        var index = this.specificItem.disLikeUsers.indexOf(this.userEmail, 0);
        if(index > -1){
        this.specificItem.disLikeUsers.splice(index,1);  
        }
        break;
      }
      case Updates.AddLikeRemoveDisLike:{
        this.specificItem.likeUsers.push(this.userEmail);
        var index = this.specificItem.disLikeUsers.indexOf(this.userEmail, 0);
        if(index > -1){
        this.specificItem.disLikeUsers.splice(index,1);
        }
        break;
      }
      case Updates.AddDisLikeRemoveLike:{
        this.specificItem.disLikeUsers.push(this.userEmail);  
        var index = this.specificItem.likeUsers.indexOf(this.userEmail, 0);
        if(index > -1){
        this.specificItem.likeUsers.splice(index,1);
        }
        break;    
      }
    }
    debugger;
    this.mediaService.likeSocket(this.specificItem);
  }


  updateLikeSelected(){
    if(this.item.likeUsers.includes(this.userEmail)){
      this.likeSelected = true;
      this.likeImg = "./assets/images/like-selected.png";
    }
    else{
      this.likeSelected = false;
      this.likeImg = "./assets/images/like.png";
    }

    if(this.item.disLikeUsers.includes(this.userEmail)){
      this.disLikeSelected = true;
      this.disLikeImg = "./assets/images/unlike-selected.png";
    }
    else{
      this.disLikeSelected = false;
      this.disLikeImg = "./assets/images/unlike.png";
    }
  } 

}
