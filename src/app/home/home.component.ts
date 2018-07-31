import { Component, OnInit } from '@angular/core';
import { MediaService } from '../services/media.service';
import { UsersService } from '../services/users.service';
import { IMedia } from '../models/imadia.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { VideoPropertiesComponent } from '../components/video-properties/video-properties.component';

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
  constructor(private mediaService: MediaService, private http: HttpClient, private userService:UsersService) {
  }

  onVideoEnded() {
    this.currentIndex++;
    if (this.currentIndex === this.playList.length) {
      this.currentIndex = 0;
    }
    this.currentItem = this.playList[this.currentIndex];
  }
  ngOnInit() {
    this.userEmail = this.userService.getUserEmail();
    debugger;
   /* this.playList = this.mediaService.httpGetMedia();
    this.currentIndex = 0;
    this.currentItem = this.playList[ this.currentIndex];*/
    
    this.mediaService.httpGetMedia().subscribe(data => { 
      console.log(data);

      this.playList = this.sort(data).slice(0,3);
       this.currentIndex = 0;
       this.currentItem = this.playList[ this.currentIndex ];
       this.homeLoading=true;

      });
  }

  onClickPlaylistItem(item: IMedia, index: number) {
    this.currentIndex = index;
    this.currentItem = item;
    // Raise flag on the subscribed field that video has changed and need to update properties
    this.mediaService.changeVideoProperties(item);
  }

  sort(data : IMedia[]){
    return data.sort((a, b)=>{return b.likeUsers.length - a.likeUsers.length});
  }

}

