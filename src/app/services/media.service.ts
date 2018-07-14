import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { IMedia } from '../models/imadia.model';

@Injectable()
export class MediaService {
    playList: Array<IMedia> = [];
   
constructor(private http : HttpClient) {   
}


httpGetMedia(): Observable<Array<IMedia>>{
    const requestUrl = 'http://localhost:3000/videos';
    return this.http.get<Array<IMedia>>(requestUrl);
}

httpGetSpecificItem(id : String): Observable<IMedia>{
    const requestUrl = 'http://localhost:3000/videoRecord/' + id;
    return this.http.get<IMedia>(requestUrl);
}

httpUpdateSpecificItem(item : IMedia, id : String) : Observable<Object>{
    const requestUrl = 'http://localhost:3000/updateRecord/' + id;
    return this.http.put(requestUrl,item);
}

}
