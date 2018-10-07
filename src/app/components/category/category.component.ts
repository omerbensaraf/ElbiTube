import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd} from "@angular/router";
import { MediaService } from '../../services/media.service';
import { IMedia } from '../../models/imadia.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: [
    './category.component.scss',
    '../../css/bootstrap.mincbed.css',
    '../../css/font-awesome.mincbed.css',
    '../../css/googleCss.css',
    '../../css/megamenucbed.css',
    '../../css/owl.carouselcbed.css',
    '../../css/pgwslider.mincbed.css',
    '../../css/style.mincbed.css'
  ]
})
export class CategoryComponent implements OnInit {
  name: string;
  categories = [
      {
        name: 'New Uploads', 
        text: 'uploads from the current week',
        img: './assets/images/air.png'
      },
      {
        name: 'TED',
        text: 'ted...',
        img: './assets/images/ted.png'
      },
      {
        name: 'Technology',
        text: 'ted...',
        img: './assets/images/technology.png'
      },
      {
        name: 'Air', 
        text: 'videos related to air division',
        img: './assets/images/uav.png'
      },
      {  
        name: 'Land',
        text: 'videos related to land division',
        img: './assets/images/land.png'
      },
      {
        name: 'Sea', 
        text: 'videos related to sea division',
        img: './assets/images/sea.png'
      }
  ];
  videos: Array<IMedia>;
  //convertedNames: Map<string,string>('Most-Popular-Videos': 'Most Popular Videos');
  constructor(private route: ActivatedRoute, private router: Router,  private mediaService: MediaService) { }

  ngOnInit() {
    this.route.params
      .map(data => data = data['name'])  
      .subscribe(category => {this.name = category; console.log(name)});
    if (this.name == undefined) {
      this.router.navigate(['/categories']);
    }
    else {
      this.mediaService.httpGetMedia().subscribe(data => { 
        switch (this.name) {
          case 'air': 
            this.videos = this.mediaService.getAirList(data);
            break;
          case 'land':  
            this.videos = this.mediaService.getLandList(data);
            break;
          case 'sea':  
            this.videos = this.mediaService.getSeaList(data);
            break;
          case 'ted':  
            this.videos = this.mediaService.getTedList(data);
            break;  
            case 'technology':  
            this.videos = this.mediaService.getTechnologyList(data);
            break;  
          case 'new-uploads':  
            this.videos = this.mediaService.getNewListByDate(data);
            break; 
          case 'most-popular-videos':  
            this.videos = this.mediaService.getPopularVideosList(data);
            break;                                 
        }
      });    
      
      //this.mediaService.currentCategory.subscribe(data => this.videos = data);
    }    
  }
  
  goToVideo(item:IMedia){
    this.router.navigate(['/watch', item._id]);
  }

  goToCategory(item:string) {
    this.router.navigate(['/categories', item.split(' ').join('-').toLowerCase()]);
  }

  // selectVideo(event, video) {
  //   event.preventDefault();
  //   console.log(video);    
  //   this.router.navigate(['/category', name]);
  // }
}
