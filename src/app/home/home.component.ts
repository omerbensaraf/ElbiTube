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
  userEmail : String;
  homeLoading:boolean=false;

  // All Home Page Categories Lists
  popularVideos_list: Array<IMedia>;
  air_list: Array<IMedia>;
  land_list: Array<IMedia>;
  sea_list: Array<IMedia>;
  ted_list: Array<IMedia>;  
  top3_list: Array<IMedia>;
  new_list: Array<IMedia>;
  tech_list: Array<IMedia>;
  entertaiment_list: Array<IMedia>;

  constructor(private router:Router,private mediaService: MediaService, private http: HttpClient, private userService:UsersService) {
  }

  ngOnInit() {
  
    this.userEmail = this.userService.getUserEmail();

    this.mediaService.httpGetMedia().subscribe(data => { 
      this.sortVideos = this.sort(data);
      this.mostPopularVideo = this.sortVideos[0];
      this.mediaService.setVideoList(data);
      //Init categories lists
      this.top3_list = this.getTop3List(data);      

      this.popularVideos_list = this.mediaService.getPopularVideosList(data);
      this.air_list = this.mediaService.getAirList(data);
      this.land_list = this.mediaService.getLandList(data);
      this.sea_list = this.mediaService.getSeaList(data);
      this.ted_list = this.mediaService.getTedList(data);
      this.tech_list = this.mediaService.getTechnologyList(data);
      this.entertaiment_list = this.mediaService.getEntertaimentList(data);
      //this.new_list = this.getNewList(data);
      this.new_list = this.mediaService.getNewListByDate(data);
      this.homeLoading=true;
    });    
  }
  
  imgClick(item:IMedia){
    this.router.navigate(['/watch', item._id]);
  }


  sort(data : IMedia[]){
    return data.sort((a, b)=>{return b.likeUsers.length - a.likeUsers.length});
  }

  getTop3List(data:Array<IMedia>): Array<IMedia> {
    return this.sortVideos.slice(1,4);
  }

  goToCategory(categoryName,items) {
    //this.mediaService.changeCategory(items);
    this.router.navigate(['/categories',categoryName]);
  }
}

