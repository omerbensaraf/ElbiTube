import { Component, OnInit } from '@angular/core';

export interface IMedia {
  title: string;
  src: string;
  type: string;
  imageSrc : String;
  
}

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
  playlist: Array<IMedia> = [
    {
        title: 'Pale Blue Dot',
        src: 'http://static.videogular.com/assets/videos/videogular.mp4',
        type: 'video/mp4',
        imageSrc : "./assets/images/banner-1.jpg"
    },
    {
        title: 'Big Buck Bunny',
        src: 'http://static.videogular.com/assets/videos/big_buck_bunny_720p_h264.mov',
        type: 'video/mp4',
        imageSrc : "./assets/images/banner-2.jpg"
    },
    {
        title: 'Elephants Dream',
        src: 'http://static.videogular.com/assets/videos/elephants-dream.mp4',
        type: 'video/mp4',
        imageSrc : "./assets/images/banner-3.jpg"
    }
];

  currentIndex = 0;
  currentItem: IMedia = this.playlist[ this.currentIndex ];
  
  constructor() { }

  onVideoEnded(){
    debugger;
    this.currentIndex++;
    if (this.currentIndex === this.playlist.length) {
        this.currentIndex = 0;
    }
    this.currentItem = this.playlist[ this.currentIndex ];
  }
  ngOnInit() {
  }

  onClickPlaylistItem(item: IMedia, index : number) {
    debugger;
    this.currentIndex = index;
    this.currentItem = item;
}

}
