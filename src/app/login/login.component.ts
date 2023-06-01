import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router) { }

  formLogin = new FormGroup({
    password: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required,Validators.email])
  })


  submitLogin(){
 
    if(this.formLogin.invalid)
      return;

    this.router.navigate(['/questions'])
  }

  register(){
    this.router.navigate(['/register'])
  }
}
