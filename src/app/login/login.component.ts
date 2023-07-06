import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateProjectComponent } from '../create-project/create-project.component';
import { KeyDailogComponent } from '../key-dailog/key-dailog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router,
    private readonly _service:LoginService, 
    private readonly _authService:AuthService,
    public dialog: MatDialog) { }

  formLogin = new FormGroup({
    password: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required,Validators.email])
  })


  submitLogin(){
 
    if(this.formLogin.invalid)
      return;
    const {email,password} =this.formLogin.value;
      this._service.logIn({email,password}).subscribe({ next: (res)=>{  
      this._authService.setToken(res.access_token)      
      this._authService.getUserToken()      

      this._service.enableMenuNav()
      this._service.enableMenuBar()
      this.router.navigate(['/home'])
    }})
  

  }

  register(){
    this.router.navigate(['/register'])
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(KeyDailogComponent);
  }
}
