import { Component, OnInit } from '@angular/core';
import { UserApp } from '../models/userApp';
import { AuthService } from '../auth.service';
import { ProjectService } from '../project.service';
import { Project } from '../models/project';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

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

  displayedColumns: string[] = ['name', 'description','acoes'];
  dataSource = []

  constructor(private readonly _authService:AuthService,
    private readonly _projectService:ProjectService,
    private router: Router){}
  ngOnInit(): void {
    this._authService.emitirUserApp.subscribe(
      user => this.user = user
    )
    this. getProjects()
  }

  createNewProject(): void {
    console.log('Criar novo projeto');
    // Lógica para criar um novo projeto
  }

  loadProjects(project:Project): void {
    this._projectService.loadProject(project)
    const id = project?.principles[0]?._id

    if(id)
      this.router.navigate(['/questions/'+id])
  }

  getProjects(){
    this.projects$ = this._projectService.getProjects()
    
  }

  deleteProject(id:string){

    // this._projectService.deleteProjectById(id)
  }

  shareProject(){
    
  }


}