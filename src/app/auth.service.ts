import { ProjectService } from 'src/app/project.service';
import { EventEmitter, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserApp } from './models/userApp';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'jwt_token';
  private userKey = 'user';

  userApp!:UserApp;
  emitirUserApp = new Subject<UserApp>();
  constructor(private jwtHelper: JwtHelperService,
    private readonly _projectService:ProjectService,
    private readonly _router:Router,
    private readonly _loginService:LoginService,
    ){}
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
    const genericUser ={email:'decodedToken.email',id:'decodedToken.id',projects:['projectIds'],userName:'username',responser:false,admin:false}
    const token = this.getToken();
  
    if(!token)
      return  this.emitirUserApp.next(genericUser);

    const decodedToken = this.jwtHelper.decodeToken(token)
   
    if(!decodedToken)
      return  this.emitirUserApp.next(genericUser);
    
    const newUser = {email:decodedToken.email,id:decodedToken.id,projects:decodedToken.projectIds,userName:decodedToken.username,responser:decodedToken.responser,admin:decodedToken.admin};
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

  userSessionValidate(){
    const userApp = this.getUser();

    if(!userApp)
      this._router.navigate(['login'])

    if(userApp.responser){
      return this.responserValidate();
    }

    return this.creatorValidate();
  }

  responserValidate(){
    let response = this._projectService.getEnvResponse();

    if(!response){
      const  localResponse = this._projectService.getStorageResponseQuestion();
     if(localResponse){
       this.enableMenuResponser();          
       this._projectService.loadResponse(localResponse)
       return true;
     }        
    }   

   return true;
  }

  creatorValidate(){
     let project = this._projectService.getEnvProject();

     if(!project){
       const  localProject = this._projectService.getStorageProject();
      if(localProject){
        this.enableMenu();         
        this._projectService.loadProject(localProject)
      
        return true;
      }        
     }   

    return true;
  }

  removeUser(): void {
    localStorage.removeItem(this.userKey);
  }

  enableMenu(){
    this._loginService.enableMenuNav();
    this._loginService.enableMenuBar();
    this._loginService.disableMenuResponser();
  }

  enableMenuResponser(){
    this._loginService.enableMenuBar();
    this._loginService.disableMenuNav();
    this._loginService.enableMenuResponser();
  }


  getEmitirUserApp(){
    return this.emitirUserApp.asObservable();
  }
}
