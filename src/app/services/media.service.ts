import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { IMedia, Updates } from '../models/imadia.model';
import * as io from 'socket.io-client';

@Injectable()
export class MediaService {
    private url = 'http://localhost:3000';
    private socket;
    playList: Array<IMedia> = [];
   
constructor(private http : HttpClient) {   
    this.socket = io(this.url);
}


httpGetMedia(): Observable<Array<IMedia>>{
    const requestUrl = 'http://localhost:3000/videos';
    return this.http.get<Array<IMedia>>(requestUrl);
}

httpGetSpecificItem(id : String): Observable<IMedia>{
    const requestUrl = 'http://localhost:3000/videoRecord/' + id;
    return this.http.get<IMedia>(requestUrl);
}

likeSocket(update : Updates, id :String, userEmail :String ){
    this.socket.emit(update, id, userEmail);
}

public getLikeUpdates = () => {
    return Observable.create((observer) => {
        this.socket.on('update-like-counter', (item) => {
            observer.next(item);
        });
    });
}
}
