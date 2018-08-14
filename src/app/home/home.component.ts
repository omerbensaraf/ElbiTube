import { Component, OnInit, OnChanges, DoCheck, Output, EventEmitter } from '@angular/core';
import { MediaService } from '../services/media.service';
import { UsersService } from '../services/users.service';
import { IMedia } from '../models/imadia.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { VideoPropertiesComponent } from '../components/video-properties/video-properties.component';
import { Router } from '@angular/router';

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
  sortVideos :  Array<IMedia>;
  mostPopularVideo : IMedia;
  playList: Array<IMedia>;
  mostPopularVideosList: Array<IMedia>;
  category_1_list: Array<IMedia>;
  homeTop3Videos: Array<IMedia>;
  userEmail : String;

  homeLoading:boolean=false;
  constructor(private router:Router,private mediaService: MediaService, private http: HttpClient, private userService:UsersService) {
  }

  ngOnInit() {
    
    this.userEmail = this.userService.getUserEmail();

    this.mediaService.httpGetMedia().subscribe(data => { 
      this.sortVideos = this.sort(data);
      this.mostPopularVideo = this.sortVideos[0];
      //this.playList = this.sortVideos.slice(1,4);
      this.homeTop3Videos = this.sortVideos.slice(1,4);
      this.playList = data;
      this.mostPopularVideosList = data.slice(1,6);
      this.category_1_list = data.slice(6,data.length);
      this.homeLoading=true;
    });
    debugger;
  }

imgClick(item:IMedia){
    this.router.navigate(['/watch', item._id]);
}


sort(data : IMedia[]){
  return data.sort((a, b)=>{return b.likeUsers.length - a.likeUsers.length});
}

}

