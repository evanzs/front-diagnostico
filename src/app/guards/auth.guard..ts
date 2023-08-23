import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';
import { ProjectService } from '../project.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

 constructor(
  private readonly router:Router,
  private readonly _projectService:ProjectService,
  private readonly _loginService:LoginService,
  private readonly _authService:AuthService
  ) { }

  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean | Promise<boolean> | Observable<boolean>{
     const isTokenExpired  = this._authService.isTokenExpired();

     if(isTokenExpired){
         this._authService.removeToken();
         this._authService.removeUser();
         this._projectService.removeEnvProject();
         this._loginService.disableMenuNav();
         this._loginService.disableMenuBar();
         this._loginService.disableMenuResponser();
        this.router.navigate(['login'])

        return false;
     }
     return this._authService.userSessionValidate();       
       
  }  
}
