import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../login/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

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
    public dialog: MatDialog

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
          error:({error})=>{
            const data = {
              text: error?.message,
              title:"Erro ao realizar registro!",
              btnText:"",
              btnVisible:false
            }
            const dialogRef = this.dialog.open(ConfirmDialogComponent,{data})
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
