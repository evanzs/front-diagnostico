import { EventEmitter, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserApp } from './models/userApp';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'jwt_token';
  private userKey = 'user';

  emitirUserApp = new EventEmitter<UserApp>();
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

  getUser() {
    const genericUser ={email:'decodedToken.email',id:'decodedToken.id',projects:['projectIds'],userName:'username'}
    const token = this.getToken();

    if(!token)
      return  this.emitirUserApp.emit(genericUser);

    const decodedToken = this.jwtHelper.decodeToken(token)

    if(decodedToken)
      return  this.emitirUserApp.emit(genericUser);
      
    return this.emitirUserApp.emit({email:decodedToken.email,id:decodedToken.id,projects:decodedToken.projectIds,userName:decodedToken.username});
  }

  setUser(user: any): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  removeUser(): void {
    localStorage.removeItem(this.userKey);
  }
}
