import { Injectable } from '@angular/core';
import 'rxjs/Rx';

import { Observable, BehaviorSubject } from 'rxjs';

import {HttpClient} from '@angular/common/http';
import { IMedia, Updates } from '../models/imadia.model';
import * as io from 'socket.io-client';

@Injectable()
export class MediaService {

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
        const requestUrl = 'http://11.0.73.2:3000/updateNumberOfViews/'+video._id;
        video.views+=1;
        return this.http.put(requestUrl,video);
    }

    likeSocket(update : Updates, id :String, userEmail :String ){
        this.socket.emit(update, id, userEmail);
    }
    
    changeVideoProperties(item: IMedia) {
        this.mediaSource.next(item);
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
