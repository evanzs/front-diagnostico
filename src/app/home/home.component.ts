import { Component, OnInit } from '@angular/core';
import { UserApp } from '../models/userApp';
import { AuthService } from '../auth.service';
import { ProjectService } from '../project.service';
import { Project } from '../models/project';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit{
  
  user!:UserApp;
  panelOpenState = false;
  projects$!: Observable<Project[]>;


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

  loadProjects(project:any): void {
    this._projectService.loadProject(project)
    //this.router.navigate(['/questions'])
  }

  getProjects(){
    this.projects$ = this._projectService.getProjects()

  }
}
