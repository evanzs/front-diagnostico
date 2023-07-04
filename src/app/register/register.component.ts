import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../login/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private _snackBar: MatSnackBar,private router:Router,  private formBuilder: FormBuilder,private _loginService:LoginService) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      reason: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {

      this._loginService.createUser(this.registerForm.value).subscribe({
      next:()=>{
        this.router.navigate(['login']);
      },
      error:()=>{
        this._snackBar.open("Não foi possivel realizar o registro.", 'fechar');
      }
    })
      // Aqui você pode adicionar a  para enviar os dados do formulário para o servidor
    }
  }
}
