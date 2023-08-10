import { Component, EventEmitter, Output} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateProjectComponent } from '../create-project/create-project.component';
import { KeyDailogComponent } from '../key-dailog/key-dailog.component';
import { RegisterComponent } from '../register/register.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loading =false

  constructor(private router: Router,
    private readonly _service:LoginService, 
    private readonly _authService:AuthService,
    public dialog: MatDialog) { }

  

  formLogin = new FormGroup({
    password: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required,Validators.email])
  })


  submitLogin(){
    this.loading =true
      if(this.formLogin.invalid) {
        this.loading = false;
        return;
      }

    const {email,password} =this.formLogin.value;
      this._service.logIn({email,password}).subscribe({ 
      next: (res)=>{  
        this._authService.setToken(res.access_token)  
        const user = this._authService.getUserToken()       

        if(user){  
          this._service.enableMenuNav()
          this._service.enableMenuBar()       
          this.router.navigate(['/home'])
        }

      },  
      error:({error}) =>{   
        this.loading = false
        const data = {
          text: error?.message,
          title:"Erro ao realizar login!",
          btnText:"",
          btnVisible:false
        }
        const dialogRef = this.dialog.open(ConfirmDialogComponent,{data})

      }
    })
  

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(KeyDailogComponent);
  }

  openDialogRegister(){
    this.dialog.open(RegisterComponent)
  }
}
