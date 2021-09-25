import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class SendUserDataService {

  _url = 'http://localhost:3000/users';
  constructor(private _http: HttpClient) { }

  enroll(user: User){
    console.log(user);
    return this._http.post<any>(this._url, user)

  }
}
