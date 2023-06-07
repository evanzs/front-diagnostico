import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly URL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  logIn(data:any):Observable<any>{
    return this.http.post<any>(this.URL+"/login",data)
  }

  user():Observable<any>{
    return this.http.get<any>(this.URL+"/login")
  }
}