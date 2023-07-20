import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthHomeGuard {

 constructor(
  private readonly router:Router,
  private readonly _authService:AuthService
  ) { }

  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean | Promise<boolean> | Observable<boolean>{
     const isTokenExpired  = this._authService.isTokenExpired();

     if(isTokenExpired){
        this.router.navigate(['login'])      
        return false;
     }
   
    this._authService.enableMenu()
     return true;       
  }
  
}
