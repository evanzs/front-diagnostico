import { EventEmitter, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserApp } from './models/userApp';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'jwt_token';
  private userKey = 'user';

  userApp!:UserApp;
  emitirUserApp = new Subject<UserApp>();
  constructor(private jwtHelper: JwtHelperService){}
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isTokenExpired():boolean{
    const token = this.getToken();
    const isTokenExpired =  this.jwtHelper.isTokenExpired(token)
    return isTokenExpired
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
  
  getUserToken() {
    const genericUser ={email:'decodedToken.email',id:'decodedToken.id',projects:['projectIds'],userName:'username'}
    const token = this.getToken();
  
    if(!token)
      return  this.emitirUserApp.next(genericUser);

    const decodedToken = this.jwtHelper.decodeToken(token)
   
    if(!decodedToken)
      return  this.emitirUserApp.next(genericUser);
    
    const newUser = {email:decodedToken.email,id:decodedToken.id,projects:decodedToken.projectIds,userName:decodedToken.username};
    this.setUser(newUser)
    return this.emitirUserApp.next(newUser);
  }

  setUser(user: any): void {
    this.userApp = user;
  }

  getUser() {
    if(!this.userApp){
      this.getUserToken();    
    }
    return this.userApp;
  }


  removeUser(): void {
    localStorage.removeItem(this.userKey);
  }

  getEmitirUserApp(){
    return this.emitirUserApp.asObservable();
  }
}
