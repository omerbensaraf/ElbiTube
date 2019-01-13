import { MediaService } from './../../services/media.service';
import { Component, Input, AfterViewInit, HostListener, ElementRef, SimpleChanges } from '@angular/core';
import { IMedia } from '../../models/imadia.model';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';

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
export class VideoPropertiesComponent implements AfterViewInit {
  @Input() currentItem : IMedia;
  downloadMessage = '';
  isOpen = false;
  labels: string[] = [];
  newLabel: string = "";
  constructor(private http: HttpClient, private mediaService:MediaService, private eRef: ElementRef){}

  ngAfterViewInit() {
    this.labels = this.currentItem.tags;
  }
  
  
  getUrl() {
    const url = `${window.location.origin}/watch/${this.currentItem._id}`;
    const ltrUrl = encodeURIComponent(`\u200e${url}`);
    return ltrUrl;
  }
  getVideoUrl() {    
    return `I am sharing this video - ${this.currentItem.title}%0A${this.getUrl()}%0Awith you.`;
  }
  saveData(data, fileName) {
    const a = document.createElement("a");
    document.body.appendChild(a);
    //a.style = "display: none";
    const blob = new Blob([data], {type: "video\/mp4"}),
    url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    // close downloading message
    this.downloadMessage = '';
    window.URL.revokeObjectURL(url);
  }
  downloadVideo(event) {
    event.preventDefault();
    // show downloading message
    this.downloadMessage = 'Downloading video...';
    this.http.get('http://11.0.73.2:3000/videos/' + this.currentItem._id, {responseType: 'arraybuffer'})
      .subscribe((res) => this.saveData(res, this.currentItem.title + '.mp4') );
  }
  isShowDownloadMessage() {
    let myStyles: Object = {};
    if (this.downloadMessage) {
      myStyles['display'] = 'block';
    } else {
      myStyles['display'] = 'none';
    }
    return myStyles;
  }    

  displayTagInput() {
    this.isOpen = !this.isOpen;
  }
  
  // @HostListener('document:click', ['$event'])
  // clickout(event) {
  //   if (event.target && (!event.target.name || event.target.name !== 'label') && !event.target.className.includes('fa-tag')) {
  //     if (this.isOpen) {
  //       this.isOpen = !this.isOpen;
  //     }
  //   }
  // }

  addLabel(input: HTMLInputElement) {
    if (this.labels.length < 4) {
      if (!this.labels.includes(input.value)) {
        this.labels.push(input.value);
        this.currentItem.tags = this.labels;
        this.mediaService.updateTags(this.currentItem);
      }      
    } 
    else {
      // raise alert that video can have only 4 tags
      swal('Yaiksss!', 'Video can have up to 4 tags!','warning');
    }
    
    this.newLabel = "";    
    
  }

  removeLabel(event: HTMLInputElement){
    let index = this.labels.indexOf(event.parentElement.innerText.trim());
    this.labels.splice(index,1)
    this.currentItem.tags = this.labels;
    this.mediaService.updateTags(this.currentItem);
  }
}
