import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Login } from './login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private _http: HttpClient
  ) { }

  _url = 'http://localhost:3000/users/login';
  isUserValid = true;


  login(loginData:any){
    console.log(loginData);

    this._http.post<any>(this._url, loginData)
      .subscribe(
        data =>
        data.username === loginData.username && data.password === loginData.password ? this.isUserValid = true : this.isUserValid = false ,


      )
  }

  ngOnInit(): void {
  }

}
