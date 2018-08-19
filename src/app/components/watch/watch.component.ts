import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMedia } from '../../models/imadia.model';
import { MediaService } from '../../services/media.service';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: [
    './watch.component.scss',
    '../../css/bootstrap.mincbed.css',
    '../../css/font-awesome.mincbed.css',
    '../../css/googleCss.css',
    '../../css/megamenucbed.css',
    '../../css/owl.carouselcbed.css',
    '../../css/pgwslider.mincbed.css',
    '../../css/style.mincbed.css'
  ]
})
export class WatchComponent implements OnInit {

  constructor(private router:Router,private route: ActivatedRoute,private mediaService: MediaService, private userService:UsersService) { }
  sortVideos :  Array<IMedia>;
  playList: Array<IMedia>;
  currentItem: IMedia;
  videoId : String;
  userEmail : String;
//https://etube.themeix.com/

  public ngOnInit() {
    this.route.paramMap.subscribe(params => {
    this.videoId = params.get('_id');
    });
    this.userEmail = this.userService.getUserEmail();
    this.route.data
      .map((data) => data['videos'])
      .subscribe(
        (videos) => {
          this.sortVideos = this.sort(videos);
          this.currentItem = this.sortVideos.filter(video => video._id == this.videoId)[0];
          this.playList = this.sortVideos.filter(video => video._id !== this.videoId).slice(0,3);
          this.mediaService.changeVideoProperties(this.currentItem);
        }
      );
  }

  imgClick(item:IMedia){
      this.router.navigate(['/watch', item._id]);
  }

  sort(data : IMedia[]){
    return data.sort((a, b)=>{return b.likeUsers.length - a.likeUsers.length});
  }

}
