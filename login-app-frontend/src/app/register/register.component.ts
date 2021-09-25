import { Component, OnInit } from '@angular/core';
import { User } from './user';
import {SendUserDataService} from './send-user-data.service'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private _sendUserDataService: SendUserDataService,
    private _http: HttpClient
  ) { }

  userModel = new User('', '', 0 ,'')
  _url = 'http://localhost:3000/users';


  onSubmit(){
    this._http.post<any>(this._url, this.userModel)
      .subscribe(
        data => console.log('Success', data),
        error => console.error('Error', error)
      )
  }

  ngOnInit(): void {
    // this.onSubmit()
  }

}

