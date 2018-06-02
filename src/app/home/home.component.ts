import { Component, OnInit } from '@angular/core';
import { IMedia } from '../models/imadia.model';
import {MediaApiService} from '../services/media-api.services';



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
  playlist: Array<IMedia> = []
    
  currentIndex : number;
  currentItem : IMedia;

  ngOnInit() {
    debugger;
    //this.mediaService.httpGetMedia().subscribe((data) => { debugger; this.playlist = data});  
    this.playlist = this.mediaService.httpGetMedia();
    this.currentIndex = 0;
    this.currentItem = this.playlist[ this.currentIndex ];  
    }
      
  constructor(private mediaService : MediaApiService) { }

  onVideoEnded(){
    debugger;
    this.currentIndex++;
    if (this.currentIndex === this.playlist.length) {
        this.currentIndex = 0;
    }
    this.currentItem = this.playlist[ this.currentIndex ];
  }
  
  onClickPlaylistItem(item: IMedia, index : number) {
    debugger;
    this.currentIndex = index;
    this.currentItem = item;
}

}
