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
  radio_list: Array<IMedia>;
  more_list: Array<IMedia>;  
  top3_list: Array<IMedia>;
  new_list: Array<IMedia>;

  constructor(private router:Router,private mediaService: MediaService, private http: HttpClient, private userService:UsersService) {
  }

  ngOnInit() {
  
    this.userEmail = this.userService.getUserEmail();

    this.mediaService.httpGetMedia().subscribe(data => { 
      this.sortVideos = this.sort(data);
      this.mostPopularVideo = this.sortVideos[0];;
      this.mediaService.setVideoList(data);
      //Init categories lists
      this.top3_list = this.getTop3List(data);      
      this.popularVideos_list = this.getPopularVideosList(data);
      this.air_list = this.getAirList(data);
      this.land_list = this.getLandList(data);
      this.more_list = this.getMoreList(data);
      //this.new_list = this.getNewList(data);
      this.new_list = this.getNewListByDate(data);
      this.homeLoading=true;
    });    
  }



  getNewListByDate(data:Array<IMedia>): Array<IMedia> {
    var returnArray = new Array<IMedia>();
    var now= Date.now();
    var filteredData = data.filter(item=>{
      debugger;
      var uploadDate = new Date(item.uploadedDate).getTime();
      return (now - uploadDate < (24 * 60 * 60 * 1000))});
  
    if (filteredData) {
      for (var i=0 ; i<filteredData.length ; i++) {
        returnArray.push(filteredData[i]);
      }
    }
    return returnArray;
  }

  imgClick(item:IMedia){
    this.router.navigate(['/watch', item._id]);
}


  sort(data : IMedia[]){
    return data.sort((a, b)=>{return b.likeUsers.length - a.likeUsers.length});
  }

  getPopularVideosList(data:Array<IMedia>): Array<IMedia> {
    var returnArray = new Array<IMedia>();
    //return data.slice(1,6);
    var filteredData = data.filter(item => item.views > 0);
    if (filteredData) {
      for (var i=0 ; i<filteredData.length ; i++) {
        returnArray.push(filteredData[i]);
      }
    }
    return returnArray;
  }

  getTop3List(data:Array<IMedia>): Array<IMedia> {
    return this.sortVideos.slice(1,4);
  }

  getAirList(data:Array<IMedia>): Array<IMedia> {
    var returnArray = new Array<IMedia>();
    //return data.slice(1,6);
    var filteredData = data.filter(item => item.category === 'UAV');
    if (filteredData) {
      for (var i=0 ; i<filteredData.length ; i++) {
        returnArray.push(filteredData[i]);
      }
    }
    return returnArray;
  }
  
  getLandList(data:Array<IMedia>): Array<IMedia> {
    var returnArray = new Array<IMedia>();
    //return data.slice(1,6);
    var filteredData = data.filter(item => item.category === 'Land');
    if (filteredData) {
      for (var i=0 ; i<filteredData.length ; i++) {
        returnArray.push(filteredData[i]);
      }
    }
    return returnArray;
  }

  getMoreList(data:Array<IMedia>): Array<IMedia> {
    var returnArray = new Array<IMedia>();
    //return data.slice(1,6);
    var filteredData = data.filter(item => !(this.land_list.includes(item) || this.air_list.includes(item) || this.top3_list.includes(item) || this.popularVideos_list.includes(item)) );
    if (filteredData) {
      for (var i=0 ; i<filteredData.length ; i++) {
        returnArray.push(filteredData[i]);
      }
    }
    return returnArray;
  }

  getNewList(data:Array<IMedia>): Array<IMedia> {
    var returnArray = new Array<IMedia>();
    //return data.slice(1,6);
    var filteredData = data.filter(item => item.category === 'New');
    if (filteredData) {
      for (var i=0 ; i<filteredData.length ; i++) {
        returnArray.push(filteredData[i]);
      }
    }
    return returnArray;
  }


}

