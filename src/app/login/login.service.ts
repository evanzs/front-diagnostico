import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly URL = 'aaa';
  constructor(private http: HttpClient) { }

  logIn(data:any):Observable<any>{
    return this.http.post<any>(this.URL,data)
  }
}
