import { ResponseQuestion } from './../models/response-question';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginService } from '../login/login.service';
import { ProjectService } from '../project.service';
import { Project } from '../models/project';

@Component({
  selector: 'app-response-questions',
  templateUrl: './response-questions.component.html',
  styleUrls: ['./response-questions.component.css']
})
export class ResponseQuestionsComponent  implements OnInit{

  constructor(
    private _loginService:LoginService,
    private readonly _projectService:ProjectService,
    private _router:Router,
    private readonly _route:ActivatedRoute,
    private _snackBar: MatSnackBar,
    private readonly _authService:AuthService,
    ){}

  responseQuestion!:ResponseQuestion;
  indexPrinciple:number = 0;

  ngOnInit(): void {
    this._route.params 
    .subscribe({
      next:(params) =>{
        this.responseQuestion = this._projectService.getEnvResponse()
        this._projectService.loadResponse(this.responseQuestion)
        if(!this.responseQuestion)
          this._router.navigate(['/login'])
          
        this.findIndexPrinciple(params['id'])     
      }
    })
  }

  findIndexPrinciple(id:string){
    const result = this.responseQuestion.principles.findIndex( p => p._id === id)
    if(result)
      this.indexPrinciple =result     
  }

  nextPrinciple(indexPrinciple:number){
    let id = this.responseQuestion.principles[indexPrinciple]._id
 
    if(!id){
      this.responseQuestion.principles[0]._id
    }  
    this._router.navigate(['response/questions/'+id])
  }
}
