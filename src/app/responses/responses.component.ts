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

  displayedColumns: string[] = ['email', 'createdAt','acoes'];
  data =[
   { email:"evandro@com.br",createdAt:"2022-02-05"},
   { email:"evandro@com.br",createdAt:"2022-02-15"},
   { email:"evandro@com.br",createdAt:"2022-02-08"},
   { email:"Resposta Anonima",createdAt:"2022-02-08"},
  ]
  ngOnInit(): void {

    
  }
  
  deleteResponse(project:Project):void{}
  editResponse(project:Project):void {

  }

}
