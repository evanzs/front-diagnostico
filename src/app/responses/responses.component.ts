import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Project } from '../models/project';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.css']
})
export class ResponsesComponent implements OnInit {

  id!:string;

  constructor(private readonly _authService:AuthService,
    private readonly _projectService:ProjectService,
    private readonly _route:ActivatedRoute,
    private readonly _router:Router){}
    project!:Project;
    indexPrinciple:number = 0;

  displayedColumns: string[] = ['_id', 'data','acoes'];
  ngOnInit(): void {

    this._route.params 
    .subscribe({
      next:(params) =>{
        this.project = this._projectService.getEnvProject()

        if(!this.project)
          this._router.navigate(['/home'])
          
        this.findIndexPrinciple(params['principleId'])     
      }
    })
 
  }
  panelOpenState = false;

  findIndexPrinciple(id:string){

    const result = this.project.principles.findIndex( p => p._id === id)

    console.log("aaaaaaa",result)
    if(result)
      this.indexPrinciple =result      


  }

  deleteResponse(project:Project):void{}
  editResponse(project:Project):void {

  }

}
