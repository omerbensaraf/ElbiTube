import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {BehaviorSubject} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UsersService {

  private userSource = new BehaviorSubject<string>('');
  loggedInUser = this.userSource.asObservable();

  constructor(private http: HttpClient) { }

  signIn(email: string, password: string) {
    const request = {
      email: email,
      password: password
    };
    return this.http.post('/signin', request);
  }

  signUp(email: string, password: string) {
    const request = {
      email: email,
      password: password
    };
    return this.http.post('/signup', request);
  }

  logout() {
    return this.http.get('/logout');    
  }

  changeloggedInUser(email: string) {
    this.userSource.next(email);
  }
}

