import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

 constructor(private readonly _authService:AuthService,
  private readonly router:Router) { }

  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean | Promise<boolean> | Observable<boolean>{
     const isTokenExpired  = this._authService.isTokenExpired();

     if(isTokenExpired){
        this.router.navigate(['login'])
        return false;
     }

     return true;       
  }

  
}
