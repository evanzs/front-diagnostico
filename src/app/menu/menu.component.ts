import { AuthService } from './../auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { UserApp } from '../models/userApp';
import { Project } from '../models/project';
import { ProjectService } from '../project.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{

  @Input() user!:UserApp;

  constructor(
    private readonly _projectService:ProjectService,
    private readonly _loginService:LoginService,
    private readonly _authService:AuthService,
    ){
    
  }

  project!:Project;
  isMenuOpen= false;
  enableMenuBar = false;
  enableMenuNav = false;
  ngOnInit(): void {
     this._projectService.emitEventoProject.subscribe( (project) => this.project = project)
     this._authService.emitirUserApp.subscribe( (user) => this.user = user)

     this._loginService.emitEventoEnableMenuBar.subscribe( (enableMenuBar) => this.enableMenuBar = enableMenuBar)
     this._projectService.emitEventoEnableMenuNav.subscribe( (enableMenuNav) => this.enableMenuNav = enableMenuNav)

  }



  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
