import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { baseURL } from '../shared/config';
import { User } from '../shared/user';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    })
  };

  constructor(private http: HttpClient) { }

  addUser(form: any): Observable<any> {
    console.log(typeof (form));
    return this.http.post<any>(baseURL + 'users/register', form, this.httpOptions);

  }

  loginUser(form: any): Observable<any> {
    console.log(typeof (form));
    return this.http.post<any>(baseURL + 'users/login', form, this.httpOptions);

  }

  addLawn(form: any): Observable<any> {
    console.log(typeof (form));
    let token = localStorage.getItem('key');

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post<any>(baseURL + 'lawns/addlawn', form, httpOptions);
  }


  listUp(): Observable<any> {


    let token = localStorage.getItem('key');

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get<any>(baseURL + 'lawns/listup', httpOptions);
  }

  getTemp(): Observable<any> {

    console.log('Temp')
    return this.http.get<any>(baseURL + 'temps/tempchart', this.httpOptions);

  }

  getPrecip(): Observable<any> {
    console.log("Precip")
    return this.http.get<any>(baseURL + 'temps/precipchart', this.httpOptions);
  }

  deleteLawn(data): Observable<any> {
    console.log(data);
    let token = localStorage.getItem('key');

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    console.log(data._id,"sdddsdsd");
    return this.http.delete<any>(baseURL + 'lawns/deleteLawn/' + data._id, httpOptions);
  }

  isAuthenticated(): Boolean {
    if (localStorage.getItem('key')) {
      return true;
    }
    else {
      return false;
    }
  }


}
