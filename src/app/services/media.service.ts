import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable, BehaviorSubject } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { IMedia } from '../models/imadia.model';

@Injectable()
export class MediaService {
    
    //playList: Array<IMedia> = [];
    playList: Array<IMedia> = [
        {
            _id : "",
            title: 'Pale Blue Dot',
            src: 'http://static.videogular.com/assets/videos/videogular.mp4',
            type: 'video/mp4',
            imageSrc : "./assets/images/banner-1.jpg",
            likeCouner : 0,
            unLikeCouner : 0,
            likeUsers : [],
            unLikeUsers : [],
            viewes: 0,
            uploadedBy: 'Alon Yeshurun'
        },
        {
            _id : "",
            title: 'Big Buck Bunny',
            src: 'http://static.videogular.com/assets/videos/big_buck_bunny_720p_h264.mov',
            type: 'video/mp4',
            imageSrc : "./assets/images/banner-2.jpg",
            likeCouner : 0,
            unLikeCouner : 0,
            likeUsers : [],
            unLikeUsers : [],
            viewes: 0,
            uploadedBy: 'Alon Yeshurun'
        },
        {
            _id : "",
            title: 'Elephants Dream',
            src: 'http://static.videogular.com/assets/videos/elephants-dream.mp4',
            type: 'video/mp4',
            imageSrc : "./assets/images/banner-3.jpg",
            likeCouner : 0,
            unLikeCouner : 0,
            likeUsers : [],
            unLikeUsers : [],
            viewes: 0,
            uploadedBy: 'Alon Yeshurun'
        }
    ];
    private mediaSource = new BehaviorSubject<any>({});
    currentVideoProperty = this.mediaSource.asObservable();

    private videosSource =  <BehaviorSubject<IMedia[]>>new BehaviorSubject([]);
    videoList = this.videosSource.asObservable();


    constructor(private http : HttpClient) {   
    }


    httpGetMedia(): Observable<Array<IMedia>>{
    // httpGetMedia():  Array<IMedia>{
        const requestUrl = 'http://11.0.73.2:3000/videos';
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

    searchVideos(searchVal: String) {
        if (searchVal && searchVal.length > 0 ) {
            return this.http.get<Array<IMedia>>('http://11.0.73.2:3000/searchVideos/' + searchVal);
        }        
    }

    changeVideoProperties(item: IMedia) {
        this.mediaSource.next(item);
    }

    setVideoList(videoList: IMedia[]) {
        this.videosSource.next(videoList);
    }

}
