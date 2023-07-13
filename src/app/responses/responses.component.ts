import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../auth.service';
import { Project } from '../models/project';
import { ProjectService } from '../project.service';
import { ResponseQuestion } from '../models/response-question';

@Component({
  selector: 'app-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.css']
})
export class ResponsesComponent implements OnInit {

  id!:string;
  responseQuestion!:ResponseQuestion[]

  constructor(private readonly _authService:AuthService,
    private readonly _projectService:ProjectService,
    private readonly _route:ActivatedRoute,
    private readonly _router:Router){}
    project!:Project;
    indexPrinciple:number = 0;

  displayedColumns: string[] = ['email', 'createdAt','completed','acoes'];
  data =[
   { email:"evandro@com.br",completed:true,createdAt:"2022-02-05"},
   { email:"evandro@com.br",completed:true,createdAt:"2022-02-15"},
   { email:"evandro@com.br",completed:true,createdAt:"2022-02-08"},
   { email:"Resposta Anonima",completed:true,createdAt:"2022-02-08"},
  ]
  ngOnInit(): void {
    this.project = this._projectService.getEnvProject();
    this.getResponseByProjectId();
    
  }


  getResponseByProjectId(){
    if(!this.project)
    return;

   this._projectService.getResponsesByProjectId(this.project._id).subscribe({
    next:(res) => {
      this.responseQuestion = res;
    },
    error:() =>{
      this._router.navigate(['home'])
    }
   })
  
  }
  
  deleteResponse(project:Project):void{}
  editResponse(project:Project):void {

  }

}
