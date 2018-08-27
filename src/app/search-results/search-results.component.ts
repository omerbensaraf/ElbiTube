import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd} from "@angular/router";
import { MediaService } from '../services/media.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: [
    './search-results.component.scss',
    '../css/bootstrap.mincbed.css',
    '../css/font-awesome.mincbed.css',
    '../css/googleCss.css',
    '../css/megamenucbed.css',
    '../css/owl.carouselcbed.css',
    '../css/pgwslider.mincbed.css',
    '../css/style.mincbed.css'
  ]
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  
  searchTerm: string = '';
  navigationSubscription;
  searchResults = [];

  constructor(private route: ActivatedRoute, private router: Router,  private mediaService: MediaService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.route.params.subscribe( params => this.searchTerm = params.term);        
        this.initialiseInvites(this.searchTerm);
      }
    });
  }

  initialiseInvites(searchTerm: String) {
    if (searchTerm && searchTerm.length > 0) {
      this.mediaService.searchVideos(searchTerm).subscribe(
        (data) => {
          console.log(data);
          this.searchResults = data;
        },
        (error) => {
          console.log(error);
          this.searchResults = [];
        }
      );
    }
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.navigationSubscription) {  
       this.navigationSubscription.unsubscribe();
    }
  }

  selectVideo(event, video) {
    event.preventDefault();
    console.log(video);    
    this.router.navigate(['/watch', video._id]);
  }
}
