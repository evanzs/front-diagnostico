import { UserApp } from './../models/userApp';
import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectService } from '../project.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';
import { Project } from '../models/project';
import { City } from '../models/city';
import { STATES_BR } from '../models/state-options';

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
  states = STATES_BR;

  meetupForm!: FormGroup;
  userApp!:UserApp
  cities:Array<City> = []
  enableManualCity = false;
  

  selectedState: string = '';
  selectedCity: string = '';
  

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

  onStateChange(state:string) {
    console.log("teste",state,"ee",this.selectedState)
    if(state === this.selectedState)
        return;
    
    this.selectedState = state;
    this.selectedCity = ""
    this.meetupForm.get('city')?.setValue("");
    this.cities = []
    if (state) {
      this.getCities(state);
    }
  }

  onCityChange(name:string){
    if(name  === this.selectedCity)
        return;
    
    this.selectedCity = name;
    this.meetupForm.get('city')?.setValue(this.selectedCity);
  }

  updateForm(){    
    const {project} = this.data
    this.meetupForm = new FormGroup({
      name: new FormControl(project.name, Validators.required),
      description: new FormControl(project.description,Validators.required),
      reason: new FormControl(project.reason,Validators.required),
      city: new FormControl(project.city,Validators.required)
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

  getCities(uf:string){
    this._projectService.getCitiesByState(uf).subscribe({
      next:(res) =>{
          this.cities = res;
      
      },
      error:() => {
        this.enableManualCity = true;
      }
    })
  }
}
