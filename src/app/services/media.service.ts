import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { IMedia } from '../models/imadia.model';
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

/*httpUpdateSpecificItem(item : IMedia, id : String) : Observable<Object>{
    const requestUrl = 'http://localhost:3000/updateRecord/' + id;
    return this.http.put(requestUrl,item);
}*/

likeSocket(item : IMedia){
    this.socket.emit('new-like', item);
}

public getLikeUpdates = () => {
    return Observable.create((observer) => {
        this.socket.on('update-like-counter', (item) => {
            observer.next(item);
        });
    });
}
}
