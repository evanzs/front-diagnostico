import { ResponseQuestion } from './../models/response-question';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserApp } from '../models/userApp';
import { ProjectService } from '../project.service';
import { LoginService } from '../login/login.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { Project } from '../models/project';
import { Principle } from '../models/principle';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-key-dailog',
  templateUrl: './key-dailog.component.html',
  styleUrls: ['./key-dailog.component.css']
})
export class KeyDailogComponent implements OnInit {
  meetupForm!: FormGroup;
  userApp!:UserApp
  loading = false;
  constructor(
    private _loginService:LoginService,
    private readonly _projectService:ProjectService,
    private _router:Router,
    private _snackBar: MatSnackBar,
    private readonly _authService:AuthService,
    public dialogRef: MatDialogRef<KeyDailogComponent>,
    public dialog: MatDialog
    ){}


  ngOnInit(): void {
    this.meetupForm = new FormGroup({
      key: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  confirmSubmit(){
    if(this.meetupForm.valid){
      this.loading = true
      this._loginService.loginResponse(this.meetupForm.value).subscribe({
        next:(res) => {
          this._authService.setToken(res.access_token)      
          this._authService.getUserToken()      

          if(this.meetupForm.valid){
            const {key,password} = this.meetupForm.value;
            if(key)
              return this.newLogin(key);
            
            return this.getResponse(password);
          } 
 
        },
        error: ({error}) =>{
          this.loading = false;

          const data = {
            text: error?.message,
            title:"Ah, não!",
            btnText:"",
            btnVisible:false
          }
          const dialogRef = this.dialog.open(ConfirmDialogComponent,{data})        }
      })
    }
  }

  newLogin(key:string){     
    this._projectService.getProjectById(key).subscribe({
      next: (project)=>{
        this.loading = true 
        this.builderResponse('',key,project.principles,[''])          
      },
      error:({error}) =>{
        this.loading = false;
        const data = {
          text: error?.message,
          title:"Ah, não!",
          btnText:"",
          btnVisible:false
        }
        const dialogRef = this.dialog.open(ConfirmDialogComponent,{data})       
      }
    });    
  }

  getResponse(password:string){
    this._projectService.getResponseById(password).subscribe({
      next: (res)=>{
        this.loading = true 
        this.builderResponse(res._id,res?.projectId,res.principles,res.tagFilter)         
      },
      error:({error}) =>{
        this.loading = false;
        const data = {
          text: error?.message,
          title:"Ah, não!",
          btnText:"",
          btnVisible:false
        }
        const dialogRef = this.dialog.open(ConfirmDialogComponent,{data})        
      }
    });  
  }

  builderResponse(responseId:string = '',projectId:string,principles:Principle[],tagFilter:string[]):void{  
    if(!responseId){
      principles = principles.map( principle =>{
        principle.guidelines.map(guideline => {
          guideline.questions.map(question => {
            question.rate = ""
          })
        })
        return principle
      })     
    }
    const response = {
      projectId:projectId,
      completed:false,
      principles:principles,
      _id:responseId,
      tagFilter:tagFilter
    }
    this._loginService.enableMenuBar()  
    this._loginService.disableMenuNav();   
    this._loginService.enableMenuResponser();  
    this._projectService.loadResponse(response)

    const id =principles[0]?._id

    if(id){
      this._router.navigate(['response/questions/'+id])
      this.dialogRef.close();   
    }

  }
}
