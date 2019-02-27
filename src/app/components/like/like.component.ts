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
  @Input() item : any;
  //@Input() userEmail : String;
  private  userEmail : String;
  updates : Updates;
  likeExists:boolean=false;
  likeClass:string="fa fa-thumbs-up like-unselected";
  disLikeClass:string="fa fa-thumbs-down dislike-unselected";

  constructor(private mediaService : MediaService, private usersService: UsersService) { }
  

  ngOnInit() {
    this.userEmail = this.usersService.getUserEmail();
    this.initLikeStatus();
    this.likeExists=true; 
      
    this.mediaService.getLikeUpdates().subscribe((item: any) => {
      debugger;
        if(this.item._id === item._id){
          this.item.likeUsers = item.likeUsers;
          this.item.disLikeUsers = item.disLikeUsers;
          this.initLikeStatus();
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
      this.mediaService.likeSocket(this.updates,this.item._id,this.userEmail,this.item.sname);
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

    this.mediaService.likeSocket(this.updates,this.item._id,this.userEmail,this.item.sname);
  }

  initLikeStatus(){
    if(this.item.likeUsers.includes(this.userEmail)){
      this.likeSelected = true;
      this.likeClass="fa fa-thumbs-up like-selected";
    }
    else{
      this.likeSelected = false;
      this.likeClass="fa fa-thumbs-up like-unselected";
    }

    if(this.item.disLikeUsers.includes(this.userEmail)){
      this.disLikeSelected = true;
      this.disLikeClass="fa fa-thumbs-down dislike-selected";
    }
    else{
      this.disLikeSelected = false;
      this.disLikeClass="fa fa-thumbs-down dislike-unselected";
    }
  } 

}

