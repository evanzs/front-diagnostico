import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserApp } from './models/userApp';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'jwt_token';
  private userKey = 'user';

  userApp = new EventEmitter<UserApp>();
constructor(private jwtHelper: JwtHelperService){}
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getUser():UserApp {
    const token = this.getToken();
    if(!token)
    return {email:'decodedToken.email',id:'decodedToken.id',projects:['projectIds'],userName:'username'}

    const decodedToken = this.jwtHelper.decodeToken(token)

    if(decodedToken)
        return {email:decodedToken.email,id:decodedToken.id,projects:decodedToken.projectIds,userName:decodedToken.username}
    // const userJson = localStorage.getItem(this.userKey);
    // return userJson ? JSON.parse(userJson) : null;
    return {email:'decodedToken.email',id:'decodedToken.id',projects:['projectIds'],userName:'username'}

  }

  setUser(user: any): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  removeUser(): void {
    localStorage.removeItem(this.userKey);
  }
}
