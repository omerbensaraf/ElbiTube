import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable, BehaviorSubject } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { IMedia } from '../models/imadia.model';

@Injectable()
export class MediaService {
    //playList: Array<IMedia> = [];
    playList: Array<IMedia> = [];
    private mediaSource = new BehaviorSubject<any>({});
    currentVideoProperty = this.mediaSource.asObservable();

    constructor(private http : HttpClient) {   
    }


    httpGetMedia(): Observable<Array<IMedia>>{
    // httpGetMedia():  Array<IMedia>{
        const requestUrl = 'http://11.0.73.2:3000/videos';
        debugger;   
        //return this.http.get<Array<any>>(requestUrl);
        return this.http.get<Array<IMedia>>(requestUrl);
    // return this.playList;
    }

    httpGetSpecificItem(index : number){
        //httpGetMedia(): Observable<Array<IMedia>>{
            const requestUrl = 'https://newsapi.org/v2/top-headlines?sources=ynet&apiKey=82f0da9784344916a6b506196467c87c';
            //return this.http.get<Array<IMedia>>(requestUrl);
            return this.playList[index];
        }

    httpUpdateSpecificItem(item : IMedia, index : number){
        //httpGetMedia(): Observable<Array<IMedia>>{
            const requestUrl = 'https://newsapi.org/v2/top-headlines?sources=ynet&apiKey=82f0da9784344916a6b506196467c87c';
            //return this.http.get<Array<IMedia>>(requestUrl);
            this.playList[index] = item;
        }

    httpGetVideoProperties(video: IMedia) {
        const requestUrl = 'http://11.0.73.2:3000/getVideoProperties/'+video._id;
        debugger;   
        return this.http.get<IMedia>(requestUrl);
    }

    changeVideoProperties(item: IMedia) {
        this.mediaSource.next(item);
    }

}
