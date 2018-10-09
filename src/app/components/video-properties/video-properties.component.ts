import { Component, OnInit, Input } from '@angular/core';
import { IMedia, Updates } from '../../models/imadia.model';
import { MediaService } from '../../services/media.service';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../../services/users.service';

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
export class VideoPropertiesComponent implements OnInit {
  @Input() currentItem : IMedia;
  downloadMessage = '';
  
  constructor(private http: HttpClient){}

  ngOnInit() {}
  
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
}
