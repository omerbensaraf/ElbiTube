import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {BehaviorSubject} from 'rxjs';
import { Comment,} from '../models/comment.model';

@Injectable()
export class CommentService {
  baseUrl = 'http://localhost:3000/comment';
  constructor(private http: HttpClient) { }

  getAllComments() : Observable<Array<Comment>> {
    debugger;
    return this.http.get<Array<Comment>>(this.baseUrl + '/getAllComments');
  }

}
