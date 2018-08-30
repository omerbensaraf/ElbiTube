import { Component, OnInit, Input } from '@angular/core';
import { IMedia, Updates } from '../../../models/imadia.model';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-video-properties-min',
  templateUrl: './video-properties-min.component.html',
  styleUrls: ['./video-properties-min.component.scss',
              '../../../css/bootstrap.mincbed.css',
              '../../../css/font-awesome.mincbed.css',
              '../../../css/googleCss.css',
              '../../../css/megamenucbed.css',
              '../../../css/owl.carouselcbed.css',
              '../../../css/pgwslider.mincbed.css',
              '../../../css/style.mincbed.css'
              ]
})
export class VideoPropertiesMinComponent implements OnInit {
  private userEmail : String;
  @Input() currentItem : IMedia;
  

  constructor(private userService : UsersService) {}

  ngOnInit() {
    this.userEmail = this.userService.getUserEmail();
  }  

}
