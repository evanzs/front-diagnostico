import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../login/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private _snackBar: MatSnackBar,
    private router:Router,  
    private formBuilder: FormBuilder,
    private _loginService:LoginService,
    public dialogRef: MatDialogRef<RegisterComponent>,

    ) {
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
      const isValid = this.checkPassword();
      if(isValid){
        this._loginService.createUser(this.registerForm.value).subscribe({
          next:()=>{
            this._snackBar.open("Usuário registrado com sucesso.", 'fechar',{duration:10000,panelClass: 'snackbar-success'});
            this.dialogRef.close();
            this.router.navigate(['login']);
          },
          error:()=>{
            this._snackBar.open("Não foi possivel realizar o registro.", 'fechar',{duration:10000});
          }
        })
      }else{
        this._snackBar.open("As senhas não coincidem.", 'fechar',{duration:10000});

      }
    }
  }

  checkPassword(){
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;
  
    if (password !== confirmPassword) {
      this.registerForm.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return false;
    } else {
      this.registerForm.get('confirmPassword')?.setErrors(null);
      return true;
    }
  }
}
