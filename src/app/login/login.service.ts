import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly URL = environment.apiUrl
  emitEventoEnableMenuBar = new EventEmitter<boolean>();
  emitEventoEnableMenuNav = new EventEmitter<boolean>();
  constructor(private http: HttpClient) { }

  logIn(data:any):Observable<any>{
    return this.http.post<any>(this.URL+"/login",data)
  }

  createUser(data:any):Observable<any>{
    return this.http.post<any>(this.URL+"/login/create",data)
  }

  user():Observable<any>{
    return this.http.get<any>(this.URL+"/login")
  }

  enableMenuBar(){
    this.emitEventoEnableMenuBar.emit(true)
  }
  enableMenuNav(){
    this.emitEventoEnableMenuNav.emit(true)
  }
}
