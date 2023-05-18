import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  formLogin = new FormGroup({
    password: new FormControl('',Validators.required),
    user: new FormControl('',[Validators.required,Validators.email])
  })


  applyLogin(){
    if(this.formLogin.invalid)
      return;

    
  }
}
