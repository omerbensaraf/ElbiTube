import { Component, OnInit, OnChanges, DoCheck, Output, EventEmitter } from '@angular/core';
import { MediaService } from '../services/media.service';
import { UsersService } from '../services/users.service';
import { IMedia } from '../models/imadia.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { VideoPropertiesComponent } from '../components/video-properties/video-properties.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.scss',
    '../css/bootstrap.mincbed.css',
    '../css/font-awesome.mincbed.css',
    '../css/googleCss.css',
    '../css/megamenucbed.css',
    '../css/owl.carouselcbed.css',
    '../css/pgwslider.mincbed.css',
    '../css/style.mincbed.css'
  ]
})
export class HomeComponent implements OnInit {
  
  playList: Array<IMedia>;
  currentIndex: number;
  currentItem: IMedia;
  userEmail : String;
  homeLoading:boolean=false;
  @Output() clickimg:EventEmitter<string>=new EventEmitter<string>(); 
  constructor(private router:Router,private mediaService: MediaService, private http: HttpClient, private userService:UsersService) {
  }

  ngOnInit() {
    this.userEmail = this.userService.getUserEmail();

    this.mediaService.httpGetMedia().subscribe(data => { 
      this.playList = this.sort(data).slice(0,3);
       this.currentIndex = 0;
       this.currentItem = this.playList[ this.currentIndex ];
       this.homeLoading=true;
      // Initiate video properties with the selected video
      this.mediaService.changeVideoProperties(this.currentItem);
    });
  }

  imgClick(item:IMedia){
this.clickimg.emit('netanel');
this.router.navigate(['/watch', item._id]);
  }

  onClickPlaylistItem(item: IMedia, index: number) {
    this.currentIndex = index;
    this.currentItem = item;
    //this.mediaService.changeVideoProperties(this.currentItem);
  }

  // catch event from app-player and make request for the update current item from db and change properties
  onVideoLoaded() {
    this.mediaService.httpGetVideoProperties(this.currentItem).subscribe( data => {
      // set new value to the mediaSource observable
      this.mediaService.changeVideoProperties(data);
    });
    this.mediaService.httpPutVideoViews(this.currentItem).subscribe();
  } 

  onVideoEnded() {
    this.currentIndex++;
    if (this.currentIndex === this.playList.length) {
      this.currentIndex = 0;
    }
    this.currentItem = this.playList[this.currentIndex];
  }

  sort(data : IMedia[]){
    return data.sort((a, b)=>{return b.likeUsers.length - a.likeUsers.length});
  }

}

