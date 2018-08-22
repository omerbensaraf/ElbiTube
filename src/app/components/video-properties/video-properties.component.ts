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
  @Input() currentItem : IMedia;
  
  constructor(){}

  ngOnInit() {}
  
}
