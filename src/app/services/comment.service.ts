import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {BehaviorSubject} from 'rxjs';
import { Comment,} from '../models/comment.model';

@Injectable()
export class CommentService {
  baseUrl = 'http://localhost:3000/comment';
  constructor(private http: HttpClient) { }

  getAllRootComments(videoId : string) : Observable<Array<Comment>> {
    debugger;
    const params = new HttpParams().set('videoId',videoId);
    return this.http.get<Array<Comment>>(this.baseUrl + '/getAllRootComments',{params});
  }

  getReplies(commentId : string) : Observable<Array<Comment>> {
    debugger;
    const params = new HttpParams().set('commentId',commentId);
    return this.http.get<Array<Comment>>(this.baseUrl + '/getReplies',{params});
  }

  postComment(comment : any){
    const request = {
      comment: comment
    };
    return this.http.post(this.baseUrl + '/postComment',request);
  }

}
