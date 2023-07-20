import { Component, OnInit } from '@angular/core';
import { UserApp } from '../models/userApp';
import { AuthService } from '../auth.service';
import { ProjectService } from '../project.service';
import { Project } from '../models/project';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CreateProjectComponent } from '../create-project/create-project.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit{
  
  user!:UserApp;
  panelOpenState = false;
  projects$!: Observable<Project[]>;

  displayedColumns: string[] = ['name', 'description','city','createdAt','updatedAt','acoes'];
  dataSource = []

  constructor(private readonly _authService:AuthService,
    private readonly _projectService:ProjectService,
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.user = this._authService.getUser();     
    this.getProjects(this.user.id)  
  }

  loadProjects(project:Project): void {
    this._projectService.loadProject(project)
    const id = project?.principles[0]?._id

    if(id)
      this.router.navigate(['/questions/'+id])
  }

  getProjects(userId:string):Observable<Project>{
   return this.projects$ = this._projectService.getProjects(userId)    
  }

  deleteProject(project:Project){
    const id = project?._id
    const data = {
      text: "Deseja deletar esse projeto?",
      title:"Deletar",
      btnText:"Deletar",
      btnVisible:true
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{data})
    dialogRef.afterClosed().subscribe(result => {
      if(result){

        this._projectService.deleteProject(id).subscribe((res)=>{
          this.getProjects(this.user.id) 
        })
        this._snackBar.open("Projeto deletado!","fechar",{duration:10000})

      }
      return;
    });
  }

  shareProject(project:Project){
    const data = {
      text: project._id,
      title:"Chave do Projeto",
      btnText:"",
      btnVisible:false
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{data})
  
  }

  openDialog(project:Project | null): void {
    const dialogRef = this.dialog.open(CreateProjectComponent,{
      data:{project}
    });
    dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.getProjects(this.user.id)
        }
    });
  }

}