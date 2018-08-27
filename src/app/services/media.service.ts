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
    
    private mediaSource = new BehaviorSubject<any>({});
    currentVideoProperty = this.mediaSource.asObservable();

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
        debugger;
        const requestUrl = 'http://11.0.73.2:3000/updateNumberOfViews';
        var body = JSON.stringify({id: video._id});
        var headerOptions = new Headers({ 'Content-Type': 'text/plain' });
        var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    
        this.http.put(requestUrl,body, this.httpOptions);


        const headers = new HttpHeaders().set('Content-Type', 'text/plain');
        this.http.put(requestUrl,{"id": video._id.toString()}, {headers} );
    }

    likeSocket(update : Updates, id :String, userEmail :String ){
        this.socket.emit(update, id, userEmail);
    }
    
    changeVideoProperties(item: IMedia) {
        this.mediaSource.next(item);
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
}
