import { Component, OnInit, Input } from '@angular/core';
import { IMedia, Updates } from '../../models/imadia.model';
import { MediaService } from '../../services/media.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-video-properties',
  templateUrl: './video-properties.component.html',
  styleUrls: ['./video-properties.component.scss',
              '../../css/bootstrap.mincbed.css',
              '../../css/font-awesome.mincbed.css',
              '../../css/googleCss.css',
              '../../css/megamenucbed.css',
              '../../css/owl.carouselcbed.css',
              '../../css/pgwslider.mincbed.css',
              '../../css/style.mincbed.css'
            ]
})
export class VideoPropertiesComponent implements OnInit {
  
  //@Input() currentVideo: IMedia;
  private currentVideo: IMedia;
  private likeCounter : number;
  private disLikeCounter : number;
  private views : number;
  private uploadedBy : String;
  private videoTitle: String;
  @Input() userEmail : String;
  

  constructor(private mediaService: MediaService){
  
  }

  ngOnInit() {
    // subsribe the changes in video properties
    this.mediaService.currentVideoProperty.subscribe( videoItem => {
      // check if the video object is not null and not undefined
      if (Object.keys(videoItem).length > 0) {
        this.currentVideo = videoItem;
        this.likeCounter = this.currentVideo.likeUsers.length;
        this.disLikeCounter = this.currentVideo.disLikeUsers.length;
        this.views = this.currentVideo.views;
        this.uploadedBy = this.currentVideo.uploadedBy;
        this.videoTitle = this.currentVideo.title;
      }
    }); 
  }

  
}
