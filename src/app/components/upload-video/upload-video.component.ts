import { Component, OnInit } from '@angular/core';
import { MediaService } from '../../services/media.service';
import { Observable } from 'rxjs';
import swal from 'sweetalert2';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.scss'],
  providers: [MediaService]
})
export class UploadVideoComponent implements OnInit {
  filePath: string='';
  videoTitle : string='';
  videoDescription: string='';
  buttonClicked : Boolean;
  fileToUpload: File = null;
  categories: String[] = ['Air','Land','Sea','TED','Technology','Entertaiment'];
  selectedCategory: string;
  isUploadSucceeded: boolean = false;
  timer: Observable<any>;
  constructor(private mediaService : MediaService) { }

  ngOnInit() {
    this.buttonClicked = false;
  }

  onClick(category) {
    if (this.selectedCategory === category) {
      this.selectedCategory = '';
    }
    else {
      this.selectedCategory = category;     
    }
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  uploadFileToActivity() {
    if(this.fileToUpload){
      this.buttonClicked = true;
      var fileType;
      if(this.videoTitle !== ''){
        fileType = this.fileToUpload.name.slice(this.fileToUpload.name.lastIndexOf(".") , this.fileToUpload.name.length);
      }
      else{
        fileType = this.fileToUpload.name;
      }
    
      this.mediaService.postFile(this.fileToUpload, this.videoTitle + fileType, this.selectedCategory).subscribe(data => {
          if(data){
            setTimeout(()=>{ 
              this.buttonClicked = false;
              
              // this.isUploadSucceeded = true;
              // this.timer = Observable.timer(10000);
              // this.timer.subscribe(() => this.isUploadSucceeded = false);
              swal('Wohoo!', 'You have just uploaded new movie','success');
              //this.fileToUpload = null;
              this.videoTitle = '';
            }, 1000);
          }
      });
    }
  }
}
