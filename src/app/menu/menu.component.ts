import { AuthService } from './../auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { UserApp } from '../models/userApp';
import { Project } from '../models/project';
import { ProjectService } from '../project.service';
import { LoginService } from '../login/login.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

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
    private readonly _router:Router,
    private readonly _route:ActivatedRoute
    ){
    
  }

  project$!:Observable<Project>;
  isMenuOpen= true;
  enableMenuBar = false;
  enableMenuNav = false;
  ngOnInit(): void {
     this.project$ = this._projectService.getSelectedProject();
     this._authService.emitirUserApp.subscribe( (user) => this.user = user)

     this._loginService.emitEventoEnableMenuBar.subscribe( (enableMenuBar) => this.enableMenuBar = enableMenuBar)
     this._loginService.emitEventoEnableMenuNav.subscribe( (enableMenuNav) => this.enableMenuNav = enableMenuNav)

  }



  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  openPrinciple(id:string){
    this._router.navigate(['/questions',id])
  }

  openResult(id:string){
    this._router.navigate(['/result'])

  }
}
