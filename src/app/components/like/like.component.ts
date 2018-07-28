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
      if(this.likeSelected){
        this.updates = Updates.RL;
      }
      else{
        this.updates = Updates.AL;
        if(this.disLikeSelected){
          this.updates = Updates.ALRDL;      
        }
      }
      debugger;
      this.mediaService.likeSocket(this.updates,this.item._id,this.userEmail);
  }

  
  onDisLike(){
  if(this.disLikeSelected){
      this.updates = Updates.RDL;
    }
    else{
      this.updates = Updates.ADL;
      if(this.likeSelected){
      this.updates = Updates.ADLRL;
      }
    }
    this.mediaService.likeSocket(this.updates,this.item._id,this.userEmail);
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
