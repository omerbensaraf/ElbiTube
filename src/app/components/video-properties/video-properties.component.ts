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
  playList: Array<IMedia>;
  currentIndex: number;
  currentItem: IMedia;

  title: string;
  src: string;
  type: string;
  imageSrc : String;
  updatedBy : String;
  likeCounter : number = 10687;
  unLikeCounter : number = 168;
  likeUsers : String[];
  unLikeUsers : String[];
  viewedUsers : String[] = ['Alon','Yeshurun','The','King'];
  viewedUsersCounter : number = this.viewedUsers.length;
  uploadedBy : String = 'Alon Yeshurun';


  constructor() {
  }

  ngOnInit() {
  }
}
