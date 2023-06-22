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
    private readonly _route:ActivatedRoute){}
    project!:Project;
    principle!:Principle;
  ngOnInit(): void {
    this._authService.emitirUserApp.subscribe( user => this.user = user)

    this._route.params 
    .subscribe(params => {
      this.project = this._projectService.getEnvProject()
      this.setPrinciple(params['id'])
     
    })
 
  }
  panelOpenState = false;
  teste(teste:any){
  
    this.panelOpenState = false;
  }

  setPrinciple(id:string){
    const result = this.project.principles.find( p => p._id === id)
    if(result)
      this.principle =result
      
  }
}
