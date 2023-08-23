import { UserApp } from './../models/userApp';
import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectService } from '../project.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';
import { Project } from '../models/project';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit,AfterViewInit {
  constructor(
    public dialogRef: MatDialogRef<CreateProjectComponent>,
    private _snackBar: MatSnackBar,
    private _projectService:ProjectService,
    private readonly _authService:AuthService, 
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  mode = "Criar";


  meetupForm!: FormGroup;
  userApp!:UserApp

  ngOnInit(): void {
    this.meetupForm = new FormGroup({
      name: new FormControl('',Validators.required),
      description: new FormControl('',Validators.required),
      reason: new FormControl('',Validators.required),
      city: new FormControl('',Validators.required)
    });

    this.userApp = this._authService.getUser();
  }

  ngAfterViewInit(): void {
    const {project} = this.data
    if(project){

       this.mode = "Editar";
      this.updateForm();
    }
  }


  updateForm(){    
    const {project} = this.data
    this.meetupForm = new FormGroup({
      name: new FormControl(project.name, Validators.required),
      description: new FormControl(project.description),
      reason: new FormControl(project.reason),
      city: new FormControl(project.city)
    });
  }

  submitForm(){
    const {project} = this.data
    if(project){      
      return this.updateProject();
    }
        
    return this.createProject();
  }

  createProject(){
 
    const userId = this.userApp.id;
    this._projectService.createProject(userId,this.meetupForm.value).subscribe({
      next: () =>{
        this._snackBar.open("Projeto criado com sucesso!","fechar",{duration:10000})
        this.dialogRef.close(true);
      },
      error:()=>{
        this._snackBar.open("Não foi possivel criar o projeto.","fechar",{duration:10000})
      }
    })
  }

  updateProject(){
    const {project}  = this.data;

    this._projectService.updateProject(project._id,this.meetupForm.value).subscribe({
      next: () =>{
        this._snackBar.open("Projeto editado com sucesso!","fechar",{duration:10000})
        this.dialogRef.close(true);
      },
      error:()=>{
        this._snackBar.open("Não foi possivel editar o projeto.","fechar",{duration:10000})
      }
    })
  }
}
