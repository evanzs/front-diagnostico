import { UserApp } from './../models/userApp';
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { ProjectService } from '../project.service';
import { Principle } from '../models/principle';
import { Project } from '../models/project';
import { Observable, map, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})


export class QuestionsComponent implements OnInit{

  user!:UserApp;
  id!:string;


  constructor(private readonly _authService:AuthService,
    private readonly _projectService:ProjectService,
    private readonly _route:ActivatedRoute,
    private readonly _router:Router){}
    project!:Project;
    indexPrinciple:number = 0;
    exist = true;


  ngOnInit(): void {
    this._authService.getEmitirUserApp().subscribe( (user) => {this.user = user})
    this._route.params 
    .subscribe({
      next:(params) =>{
        this.exist = false;
  
        this.project = this._projectService.getEnvProject()
        if(!this.project)
          this._router.navigate(['/home'])

          
        this._projectService.setProject( this.project)   
        this.findIndexPrinciple(params['id'])     
        this.exist = true;
      }
    })
 
  }
  panelOpenState = false;

  findIndexPrinciple(id:string){
    const result = this.project.principles.findIndex( p => p._id === id)


    if(result || result === 0){
   
      this.indexPrinciple =result
    }
         
  }

  nextPrinciple(indexPrinciple:number){

    if(indexPrinciple >= this.project.principles.length )
        return;
    let id = this.project.principles[indexPrinciple]._id

    if(!id){
      this.project.principles[0]._id
    }  
    this._router.navigate(['questions/'+id])
  }
}
