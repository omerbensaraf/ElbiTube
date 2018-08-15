import { Component, OnInit } from '@angular/core';
import { MediaService } from '../services/media.service';


@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.scss'],
  providers: [MediaService]
})
export class UploadVideoComponent implements OnInit {
  filePath="";
  videoTitle="";
  videoDescription="";
  constructor(private mediaService : MediaService) { }

  ngOnInit() {
  }

  getFileExtension(filename) {
    var ext = filename.slice((filename.lastIndexOf("/") - 1 >>> 0) + 2);
    return "."+ext;
  }

  onSubmit(){
    var mimetype : string = this.getFileExtension(this.filePath);
    this.mediaService.httpUploadVideo(this.filePath, this.videoTitle, this.videoDescription, mimetype);
  }



}
