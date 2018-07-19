import { Component, OnInit } from '@angular/core';
import { MediaService } from '../services/media.service';
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
  
  constructor(private mediaService: MediaService, private http: HttpClient) {

  }

  onVideoEnded() {
    debugger;
    this.currentIndex++;
    if (this.currentIndex === this.playList.length) {
      this.currentIndex = 0;
    }
    this.currentItem = this.playList[this.currentIndex];
  }
  ngOnInit() {
    /*this.playList = this.mediaService.httpGetMedia();
    this.currentIndex = 0;
    this.currentItem = this.playList[ this.currentIndex];*/
    
    this.mediaService.httpGetMedia().subscribe(data => { 
      debugger;
        this.playList = data.filter(item => item.likeCouner > 0);
        this.currentIndex = 0;
        this.currentItem = this.playList[ this.currentIndex ];

        // Initiate video properties with the selected video
        this.mediaService.changeVideoProperties(this.currentItem);
      });
  }

  onClickPlaylistItem(item: IMedia, index: number) {
    
    this.currentIndex = index;
    this.currentItem = item;
    // Raise flag on the subscribed field that video has changed and need to update properties
    this.mediaService.changeVideoProperties(item);
  }

}

