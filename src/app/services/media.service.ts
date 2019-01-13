import { Injectable } from '@angular/core';
import 'rxjs/Rx';

import { Observable, BehaviorSubject } from 'rxjs';

import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { IMedia, Updates } from '../models/imadia.model';
import * as io from 'socket.io-client';

@Injectable()
export class MediaService {

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'text/plain'
        })
      };
    private url = 'http://11.0.73.2:3000';
    private socket;
    playList: Array<IMedia> = [];
    

    private videosSource =  <BehaviorSubject<IMedia[]>>new BehaviorSubject([]);
    videoList = this.videosSource.asObservable();


    constructor(private http : HttpClient) {   
        this.socket = io(this.url);
    }


    httpGetMedia(): Observable<Array<IMedia>>{
        const requestUrl = 'http://11.0.73.2:3000/videos';
        return this.http.get<Array<IMedia>>(requestUrl);
    }

    searchVideos(searchVal: String) {
        if (searchVal && searchVal.length > 0 ) {
            return this.http.get<Array<IMedia>>('http://11.0.73.2:3000/searchVideos/' + searchVal);
        }        
    }
  
    httpGetSpecificItem(id : String): Observable<IMedia>{
        const requestUrl = 'http://11.0.73.2:3000/videoRecord/' + id;
        return this.http.get<IMedia>(requestUrl);
    }


    httpPutVideoViews(video: IMedia) {        
        const requestUrl = 'http://11.0.73.2:3000/updateNumberOfViews';
        this.http.put(requestUrl,video).subscribe(data => console.log(data));
    }

    likeSocket(update : Updates, id :String, userEmail :String ){
        this.socket.emit(update, id, userEmail);
    }
    

    httpUploadVideo(_filePath: string, _title: string, _description: string, _mimetype: string) {
        const requestUrl = 'http://11.0.73.2:3000/upload';
        const file = {
                path:_filePath,
                originalname: _title,
                description: _description,
                mimetype:_mimetype
            };
        return this.http.post(requestUrl,file);
    }
    
    setVideoList(videoList: IMedia[]) {
        this.videosSource.next(videoList);
    }

    public getLikeUpdates = () => {
        return Observable.create((observer) => {
            this.socket.on('update-like-counter', (item) => {
                observer.next(item);
            });
        })
    };

    postFile(fileToUpload: File , fileName : string ,selectedCategory : string) {
        const endpoint =  'http://11.0.73.2:3000/upload';
        const formData: FormData = new FormData();
        formData.append("myFiles", fileToUpload,fileName);
        formData.append("category",selectedCategory);
        return this.http
          .post(endpoint, formData, {responseType: 'text'})
          .map(() => { 
            return true;
        });
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
    
    getAirList(data:Array<IMedia>): Array<IMedia> {
      var returnArray = new Array<IMedia>();
      //return data.slice(1,6);
      var filteredData = data.filter(item => item.category === 'Air');
      if (filteredData) {
        for (var i=0 ; i<filteredData.length ; i++) {
          returnArray.push(filteredData[i]);
        }
      }
      return returnArray;
    }
    
    getSeaList(data: Array<IMedia>): Array<IMedia> {
      var returnArray = new Array<IMedia>();
      var filteredData = data.filter(item => item.category === 'Sea');
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
  
    getTedList(data:Array<IMedia>): Array<IMedia> {
      var returnArray = new Array<IMedia>();
      //return data.slice(1,6);
      var filteredData = data.filter(item => item.category === 'TED');
      if (filteredData) {
        for (var i=0 ; i<filteredData.length ; i++) {
          returnArray.push(filteredData[i]);
        }
      }
      return returnArray;
    }

    getEntertaimentList(data:Array<IMedia>): Array<IMedia> {
      var returnArray = new Array<IMedia>();
      //return data.slice(1,6);
      var filteredData = data.filter(item => item.category === 'Entertaiment');
      if (filteredData) {
        for (var i=0 ; i<filteredData.length ; i++) {
          returnArray.push(filteredData[i]);
        }
      }
      return returnArray;
    }

    getTechnologyList(data:Array<IMedia>): Array<IMedia> {
      var returnArray = new Array<IMedia>();
      //return data.slice(1,6);
      var filteredData = data.filter(item => item.category === 'Technology');
      if (filteredData) {
        for (var i=0 ; i<filteredData.length ; i++) {
          returnArray.push(filteredData[i]);
        }
      }
      return returnArray;
    }
  
    getNewListByDate(data:Array<IMedia>): Array<IMedia> {
      var returnArray = new Array<IMedia>();
      var now= Date.now();
      var filteredData = data.filter(item=>{
        var uploadDate = new Date(item.uploadedDate).getTime();
        return (now - uploadDate < (24 * 60 * 60 * 1000))});
    
      if (filteredData) {
        for (var i=0 ; i<filteredData.length ; i++) {
          returnArray.push(filteredData[i]);
        }
      }
      return returnArray;
    }

    updateTags(data: IMedia) {
      const requestUrl = 'http://11.0.73.2:3000/updateTags';
      this.http.put(requestUrl,data).subscribe(data => console.log(data));
    }
}
