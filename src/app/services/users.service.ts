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
  baseUrl = 'http://11.0.73.2:3000';


  constructor(private http: HttpClient) { }

  getUserEmail(){
     return this.userSource.getValue();
    //return "omerBenSaraf@gmail.com";
  }

  signIn(email: string, password: string) {
    const request = {
      email: email,
      password: password
    };
    return this.http.post(this.baseUrl + '/signin', request);
  }

  signUp(email: string, password: string) {
    const request = {
      email: email,
      password: password
    };
    return this.http.post(this.baseUrl + '/signup', request);
  }

  logout() {
    return this.http.get(this.baseUrl + '/logout');    
  }

  changeloggedInUser(email: string) {
    this.userSource.next(email);
  }
}