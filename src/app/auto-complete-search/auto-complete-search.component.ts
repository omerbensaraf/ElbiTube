import { Component, OnInit, ElementRef } from '@angular/core';

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

  constructor(el: ElementRef) {
    this._el = el;
    this.videoList = ['Lior', 'alon king', 'viodeoo5', 'video4', 'video3', 'video2', 'video1'];
  }

  ngOnInit() {
  }

  filterVideoList() {
    if (this.searchTerm && this.searchTerm !== '') {
        let term = this.searchTerm.toLowerCase();
        this.filteredResult = this.videoList.filter(function (el: any) {
            return el.toLowerCase().indexOf(term.toLowerCase()) > -1;
        });
    } else {
        this.filteredResult = [];
    }
  }

  selectVideo(video) {
    this.searchTerm = video;
    this.filteredResult = [];
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

  onInputChange(searchValue : string ) {  
    this.selectedLiValue = -1;
  }

  handleKeyEvent(event, key) {
    if (key === 'ArrowUp' &&  this.selectedLiValue > 0 && this.filteredResult.length > 0) {
      this.selectedLiValue--;
    } else if (key === 'ArrowDown' &&  this.selectedLiValue < this.videoList.length - 1 && this.filteredResult.length>0) {
      this.selectedLiValue++;
    } else if (key === 'Enter') {
      if ( this.selectedLiValue !== -1 ) {
        this.selectVideo(this.filteredResult[this.selectedLiValue]);        
      }
        alert('searched value ' +this.searchTerm);            
    }
  }

  searchButtonClick() {
    alert('searched value ' +this.searchTerm);
  }
}
