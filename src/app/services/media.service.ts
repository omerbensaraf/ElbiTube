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

    constructor(private http : HttpClient) {   
        this.socket = io(this.url);
    }


    httpGetMedia(): Observable<Array<IMedia>>{
        const requestUrl = 'http://11.0.73.2:3000/videos';
        return this.http.get<Array<IMedia>>(requestUrl);
    }

    httpGetSpecificItem(id : String): Observable<IMedia>{
        const requestUrl = 'http://11.0.73.2:3000/videoRecord/' + id;
        return this.http.get<IMedia>(requestUrl);
    }

    httpGetVideoProperties(video: IMedia) {
        const requestUrl = 'http://11.0.73.2:3000/getVideoProperties/'+video._id;
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

    public getLikeUpdates = () => {
        return Observable.create((observer) => {
            this.socket.on('update-like-counter', (item) => {
                observer.next(item);
            });
        })
    };
}
