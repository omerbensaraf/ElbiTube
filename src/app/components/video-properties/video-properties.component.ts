import { Component, OnInit, Input } from '@angular/core';
import { IMedia, Updates } from '../../models/imadia.model';
import { MediaService } from '../../services/media.service';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../../services/users.service';

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
  
  private currentVideo: IMedia;
  private views : number;
  private uploadedBy : String;
  private videoTitle: String;
  private userEmail : String;
  @Input() private currentItem : IMedia;
  

  constructor(private mediaService: MediaService, private userService : UsersService){
  
  }

  ngOnInit() {
    debugger;
    this.userEmail = this.userService.getUserEmail();
    this.views = this.currentItem.views;
    this.uploadedBy = this.currentItem.uploadedBy;
    this.videoTitle = this.currentItem.title;
  }  
}
