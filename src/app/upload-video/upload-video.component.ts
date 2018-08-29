import { Component, OnInit } from '@angular/core';
import { MediaService } from '../services/media.service';


@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.scss'],
  providers: [MediaService]
})
export class UploadVideoComponent implements OnInit {
  filePath: string='';
  videoTitle : string='Alon';
  videoDescription: string='';

  fileToUpload: File = null;
  constructor(private mediaService : MediaService) { }

  ngOnInit() {
  }

  getFileExtension(filename) {
    var ext = filename.slice((filename.lastIndexOf(".")));
    return ext;
  }

  onUpload(){
    var mimetype : string = this.getFileExtension(this.filePath);
    this.mediaService.httpUploadVideo(this.filePath, this.videoTitle, this.videoDescription, mimetype);
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
}

uploadFileToActivity() {
  debugger;
  var fileType;
  if(this.videoTitle !== ''){
    fileType = this.fileToUpload.name.slice(this.fileToUpload.name.lastIndexOf(".") , this.fileToUpload.name.length);
  }
  else{
    fileType = this.fileToUpload.name;
  }
  

  this.mediaService.postFile(this.fileToUpload, this.videoTitle + fileType);
}



}
