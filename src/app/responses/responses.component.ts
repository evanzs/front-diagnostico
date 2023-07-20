import { ResponsesService } from './responses.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../auth.service';
import { Project } from '../models/project';
import { ProjectService } from '../project.service';
import { ResponseQuestion } from '../models/response-question';
import { MatDialog } from '@angular/material/dialog';
import { ResultComponent } from '../result/result.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private readonly _responsesServices:ResponsesService,
    private readonly _router:Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar){}
    project!:Project;
    indexPrinciple:number = 0;



  displayedColumns: string[] = ['email', 'createdAt','completed','acoes'];

  ngOnInit(): void {
    this.project = this._projectService.getEnvProject();
    this.getResponseByProjectId();
    
  }


  getResponseByProjectId(){
    if(!this.project)
    return;

   this._responsesServices.getResponsesByProjectId(this.project._id).subscribe({
    next:(res) => {
      this.responseQuestion = res;
    },
    error:() =>{
      this._router.navigate(['home'])
    }
   })
  
  }
  
  deleteResponse(response:ResponseQuestion):void{
    const id = response._id
    if(!id)
        return ;
    const data = {
      text: "Deseja deletar esse projeto?",
      title:"Deletar",
      btnText:"Deletar",
      btnVisible:true
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{data})

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this._responsesServices.delete(id).subscribe((res)=>{
          this.getResponseByProjectId();
        })
        this._snackBar.open("Projeto deletado!","fechar",{duration:10000})

      }
      return;
    });
  }
  editResponse(project:ResponseQuestion):void {
    const data = project
    this.dialog.open(ResultComponent,{data})
  }

}
