import { Component, OnInit, ElementRef } from '@angular/core';
import {Router} from "@angular/router";
import { MediaService } from '../services/media.service';

@Component({
  selector: 'app-auto-complete-search',
  templateUrl: './auto-complete-search.component.html',
  styleUrls: [
    './auto-complete-search.component.scss',
    '../css/bootstrap.mincbed.css',
    '../css/font-awesome.mincbed.css',
    '../css/googleCss.css',
    '../css/megamenucbed.css',
    '../css/owl.carouselcbed.css',
    '../css/pgwslider.mincbed.css',
    '../css/style.mincbed.css'
  ],
  host: {
    '(document:click)': 'closeAutocompleteDiv($event)',
  }
})
export class AutoCompleteSearchComponent implements OnInit {

  videoList: any[];
  searchTerm: string = '';
  filteredResult: any[] = [];
  public _el;
  selectedLiValue = -1;
  MAX_RESUTLS_TO_SHOW = 7;

  constructor(el: ElementRef, private router: Router, private mediaService: MediaService) {
    this._el = el;

    if (!this.videoList || this.videoList.length === 0 ) {
      this.mediaService.videoList.subscribe(videoList => 
        this.videoList = videoList
      );

      this.mediaService.httpGetMedia().subscribe(data => {
        this.mediaService.setVideoList(data);
       });
    }
  }

  ngOnInit() {}

  filterVideoList() {
    if (this.searchTerm && this.searchTerm !== '') {
        let term = this.searchTerm.toLowerCase();
        this.filteredResult = this.videoList.filter(function (el: any) {
            return el.title.toLowerCase().indexOf(term) > -1;
        });
    } else {
        this.filteredResult = [];
    }
    if (this.filteredResult.length > 7) {
      this.filteredResult = this.filteredResult.slice(0,this.MAX_RESUTLS_TO_SHOW);
    }
  }

  selectVideo(video) {
    this.searchTerm = video.title;
    this.navigateToSearchResultScreen();    
  }
  
  closeAutocompleteDiv(event) {
    let _event = event.target;
    let _in = false;

    do {
        if (_event === this._el.nativeElement) {
            _in = true;
        }
        _event = _event.parentNode;
    }
    while (_event);
    if (!_in) {
        this.filteredResult = [];
    }
  }

  onInputChange(searchValue : string) {  
    this.selectedLiValue = -1;
  }

  handleKeyEvent(event, key) {
    if (key === 'ArrowUp' &&  this.selectedLiValue > 0 && this.filteredResult.length > 0) {
      this.selectedLiValue--;
    } else if (key === 'ArrowDown' &&  this.selectedLiValue < this.videoList.length - 1 && this.filteredResult.length >0) {
      this.selectedLiValue++;
    } else if (key === 'Enter') {
      if ( this.selectedLiValue !== -1 ) {
        this.selectVideo(this.filteredResult[this.selectedLiValue]);        
      } else {
        this.navigateToSearchResultScreen();        
      }        
    }    
  }

  searchButtonClick() {    
    this.navigateToSearchResultScreen();
  }

  navigateToSearchResultScreen() {
    if (this.searchTerm && this.searchTerm.trim().length > 0 ) {
      this.router.navigate(['searchResutls', this.searchTerm]);
      this.filteredResult = [];
      this.searchTerm = "";
    }    
  }

}
