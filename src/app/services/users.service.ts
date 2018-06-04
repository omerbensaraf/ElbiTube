import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) { }

  signIn(email: string, password: string) {
    const request = {
      email: email,
      password: password
    };
    return this.http.post('/signIn', request);
  }

  signUp(email: string, password: string) {
    const request = {
      email: email,
      password: password
    };
    return this.http.post('/signUp', request);
  }
}
