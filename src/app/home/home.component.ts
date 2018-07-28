import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
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

  ngOnInit() {
    this.mediaService.httpGetMedia().subscribe(data => { 
    debugger;
      //data = [data[0]];
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
    //this.mediaService.changeVideoProperties(this.currentItem);
  }

  // catch event from app-player and make request for the update current item from db and change properties
  onVideoLoaded() {
    debugger;
    this.mediaService.httpGetVideoProperties(this.currentItem).subscribe( data => {
      // set new value to the mediaSource observable
      this.mediaService.changeVideoProperties(data);
    })
  } 

  onVideoEnded() {
    debugger;
    // this.currentIndex++;
    // if (this.currentIndex === this.playList.length) {
    //   this.currentIndex = 0;
    // }
    // this.currentItem = this.playList[this.currentIndex];
  }

  

}

